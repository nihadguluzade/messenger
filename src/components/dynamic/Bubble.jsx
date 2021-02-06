import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

function Bubble(props) {  

  const { type, message } = props;

  return (
    <span id="BubbleComponent">
      <Row>
        { type == 'sender' ? 

          <div className="bubble-wrapper sender">
            <span className="bubble-sender">
              <span>{message}</span>
            </span>
          </div> 
          :
          <div className="bubble-wrapper receiver">
            <span className="bubble-receiver">
              <span>{message}</span>
            </span>
          </div> 
        }
      </Row>
    </span>
  )
}

Bubble.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
}

export default Bubble;