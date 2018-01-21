import React from 'react';
import { Container, Media } from 'reactstrap';
import { Input, Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';
import ProfilePopover from './ProfilePopover.jsx'
//Individual message container





export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      popoverOpen: false,
    };
  }
  render() {
    const { message } = this.props;
    //for the color changing avatars
    let color = () => {
      let colors = [
        '#346A85',
        '#AFE356',
        '#348569',
        '#F6a43D',
        '#AAD3E6',
        '#7F3485',
        '#992B41',
        '#3B94D9',
        '#E95F28',
        '#4A913C',
        '#FFAC33',
        '#8899A6',
        '#744EAA',
        '#BE1931',
      ];
      let index = Math.floor(Math.random() * colors.length);
      return colors[index];
    }
    //Styles for individual message component


    const styles = {
      body: {
        padding: '15px 0 15px 0',
      },
      timeStamp: {
        fontSize: '10px',
        color: '#bdbdbd',
        marginLeft: '10px',
      },
      username: {
        fontSize: '24',
        fontWeight: 'bold',
        display: 'block',
        paddingBottom: '5px',
      },
      message: {
        fontSize: '0.9em',
        overflowWrap: 'break-word',
        textAlign: 'left',
        display: 'fixed',
        left: '63.99',
      },
      egg: {
        backgroundColor: color(),
        float: 'left',
        marginRight: '7px',
      },
      img: {
        height: '200px',
      },
      popover: {
        height: '300px',
        width: '250px'
      },
      header: {
        height: '200px',
        background: 'url("https://s3-us-west-1.amazonaws.com/reslack/download.jpeg")',
      },
      // 'list:hover': {
      //   background: 'green',
      // },
    };


    const { counter } = this.props;
    const uniquePopoverId = "Popover" + counter;
    return (
      <div className="message-entry-container">
        <Container style={styles.body}>
          <Media left href="#">
            <img
              className="egg img-responsive"
              href="#"
              src="/images/twitter-egg.png"
              alt="profile-pic"
              style={styles.egg}
            />
          </Media>

          <span style={styles.username}> <a href='#' onClick={this.props.profileClick} value='hello'>
            {message.username}
          </a><span style={styles.timeStamp}>{new Date(message.createdAt).toLocaleTimeString()}</span>
          </span>
          {message.text.slice(0, 10) === "https://s3" ? (
            <div>
              <div><b> {message.text} </b> </div>
              <a href={message.text}>
              <img id="messageEntry" src={message.text}/>
              </a>
            </div>) : (<div> {message.text} </div> )}
        </Container>
      </div>
    );
  }
}



//
// <Popover
//   placement="top"
//   isOpen={this.state.popoverOpen}
//   target={uniquePopoverId}
//   toggle={this.toggle}
//   style={styles.popover}
// >
//   <PopoverHeader style={styles.header}>  </PopoverHeader>
//   <PopoverBody>
//     <b> {message.username} </b>
//     <br />
//     <br />
//     {/* <a href='#' onClick={(e) => { this.props.profileClick(e)}}> */}
//     <button onClick={(e) => this.testhandler(e)} className="popover-option">
//     View Profile
//     </button>
//
//
//
//   </PopoverBody>
// </Popover>

//onClick={this.handleProfileClick}
