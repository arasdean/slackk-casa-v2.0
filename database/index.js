const { Client } = require('pg');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client
  .connect()
  .then()
  .catch(err => console.error('error connecting to postgres db, ', err.stack));

// create tables needed by server
const initializeDB = () => {
  // initialize tables by reading schema files and running as query
  const schemas = ['/schema/users.sql', '/schema/workspaces.sql'];
  return Promise.all(schemas.map(schema =>
    new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, schema),
        'utf8',
        (err, data) => (err ? reject(err) : resolve(data)),
      );
    }).then(data => client.query(data))));
};

// post message to database
const postMessage = (message, username, workspaceId) =>
  // pull workspace messages table name using workspaceId
  client
    .query('SELECT db_name FROM workspaces WHERE id = $1', [workspaceId])
    // post new message into workspace's messages table
    .then(data =>
      client.query(
        'INSERT INTO messages (text, username, workspace_id) VALUES ($1, $2, $3) RETURNING *',
        [message, username, data.rows[0].db_name],
      ));

// get messages for workspace from database
const getMessages = workspaceId =>
  // pull workspace messages table name using workspaceId
  client
    .query('SELECT db_name FROM workspaces WHERE id = $1', [workspaceId])
    // pull messages from workspace's messages table
    .then(data => client.query('SELECT * FROM messages where workspace_id = $1;', [data.rows[0].db_name]))
    .then(data => data.rows);

// post new user to users table in database
const createUser = (username, passhash, email, passhint) =>
  client.query(
    'INSERT INTO users (username, password, email, password_hint) VALUES ($1, $2, $3, $4) RETURNING *',
    [username, passhash, email, passhint],
  ).then(data => data.rows[0]);

// pull user info from users table in database
const getUser = username =>
  client
    .query('SELECT * FROM users WHERE username = ($1)', [username])
    .then(data => data.rows[0]);

// pull user password hint from users table in database
const getPasswordHint = username =>
  client
    .query('SELECT password_hint FROM users WHERE username = ($1)', [username])
    .then(data => data.rows[0]);

// creates a new workspace
const createWorkspace = (name, dbName = `ws_${name[0]}${Date.now()}`) =>
  // add a new entry into workspaces table
  client.query('INSERT INTO workspaces (name, db_name) VALUES ($1, $2) RETURNING *', [name, dbName])
    .then(() =>
    // read messages schema and insert workspace table name
      new Promise((resolve, reject) => {
        fs.readFile(
          path.join(__dirname, '/schema/messages.sql'),
          'utf8',
          (err, data) => (err ? reject(err) : resolve(data)),
        );
      }))
    // run query to create messages table for workspace
    .then(data => client.query(data.replace('$1', dbName).replace('$1_pk', `${dbName}_pk`)));

// pull list of workspaces from database
const getWorkspaces = () => client.query('SELECT * FROM workspaces').then(data => data.rows);

// pull all emails from users table
const getEmails = () => client.query('SELECT email FROM USERS')
  .then(data => data.rows);

// create necessary tables if environment flag INITIALIZEDB is set to true


const joinWorkspace = (user, workspace, action) => {
  if (action === 'add') {
    client.query(`INSERT INTO workspacemembers (username, workspace_id) VALUES ('${user}', ${workspace});`)
      .then()
      .catch(err => console.error('error adding user to workspaceMembers, ', err.stack));
  } else if (action === 'drop') {
    client.query(`DELETE FROM workspacemembers
      WHERE username = '${user}' AND workspace_id = ${workspace};`)
      .then()
      .catch(err => console.error('error removing user from workspaceMembers, ', err.stack));
  } else {
    throw new Error('Invalid action');
  }
};

const isInWorkspace = (user, workspace) => {
  return client.query(`select workspace_id from workspacemembers
    WHERE username = '${user}' AND workspace_id = ${workspace};`)
    .then(x => x.rows.length > 0)
    .catch(err => console.err(err.stack));
}

if (process.env.INITIALIZEDB) {
  initializeDB()
    .then()
    .catch(err => console.error('error creating database tables, ', err.stack));
}

module.exports = {
  client,
  initializeDB,
  postMessage,
  getMessages,
  createUser,
  getUser,
  createWorkspace,
  getWorkspaces,
  getEmails,
  getPasswordHint,
  joinWorkspace,
  isInWorkspace,
};
