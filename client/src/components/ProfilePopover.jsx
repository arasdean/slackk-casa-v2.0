import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';

class ProfilePopover extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
        <div>
          <Popover
            placement="top"
            isOpen={this.props.popoverOpen}
            target={this.propsuniquePopoverId}
            toggle={this.toggle}
            style={styles.popover}
          >
            <PopoverHeader style={styles.header}>  </PopoverHeader>
            <PopoverBody>
              <b> {message.username} </b>
              <br />
              <br />
              {/* <a href='#' onClick={(e) => { this.props.profileClick(e)}}> */}
              <button onClick={(e) => this.testhandler(e)} className="popover-option">
              View Profile
              </button>



            </PopoverBody>
          </Popover>
      </div>
    )
  }
}



export default ProfilePopover;
