import React from 'react';
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import MessageList from './MessageList.jsx';
import WorkSpaceList from './WorkSpaceList.jsx';
import PropTypes from 'prop-types';
import ProfileSlide from './ProfileSlide.jsx'
//container for other containers
export default class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false};
    this.handleProfileClick = this.handleProfileClick.bind(this);
  }

  handleProfileClick(event, value) {
    this.setState({ isOpen: !this.state.isOpen });
    console.log(arguments);
    event.preventDefault();
  }

  render() {
    let {
      workSpaces,
      messages,
      loadWorkSpaces,
      changeCurrentWorkSpace,
      currentWorkSpaceId,
      currentUser,
    } = this.props;
    return (
      <Container fluid>
        <Row>
          <Col className="side-bar-col" xs="2">
            <WorkSpaceList
              workSpaces={workSpaces}
              loadWorkSpaces={loadWorkSpaces}
              changeCurrentWorkSpace={changeCurrentWorkSpace}
              currentWorkSpaceId={currentWorkSpaceId}
              currentUser={currentUser}
            />
          </Col>
          <Col className="message-list-col" xs="10">
            <MessageList messages={messages} currentWorkSpaceId={currentWorkSpaceId}
            profileClick={this.handleProfileClick}
             />

          </Col>
          <Col>
            <ProfileSlide isOpen={this.state.isOpen} />
          </Col>
        </Row>


      </Container>
    );
  }
}

Body.propTypes = {
  messages: PropTypes.array,
  workspaces: PropTypes.array,
  currentWorkSpaceId: PropTypes.number,
}
