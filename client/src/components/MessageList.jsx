import React from 'react';
import { Container, ListGroup } from 'reactstrap';
import MessageEntry from './MessageEntry.jsx';

//container for message components
let counter = 2;





export default ({ messages, currentWorkSpaceId, profileClick }) => (
  <div className="message-list-container">
    <Container>
      {messages.map((message) => {
        counter++
          return (<MessageEntry message={message} key={message.id} counter={counter} profileClick={profileClick} />)
        })}

    </Container>
  </div>
);
