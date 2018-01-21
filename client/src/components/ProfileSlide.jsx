import React from 'react';
import { Button, Popover, PopoverHeader, PopoverBody } from 'reactstrap';
import Slider from 'react-slide-out';
import 'react-slide-out/lib/index.css';

export default class ProfileSlide extends React.Component {
  constructor(props) {
    super(props);
  }



  render() {
    return (
        <div>
          <Slider
            title='test title'
            footer={
              <div style={{padding: '15px'}}>
                <a href='#' onClick={this.handleProfileClick}>Close Slider</a>
              </div>
            }
            isOpen={this.props.isOpen}
            onOutsideClick={this.handleProfileClick}>
            <div>...Some heavy scrollable content...</div>
          </Slider>
      </div>
    )
  }
}
