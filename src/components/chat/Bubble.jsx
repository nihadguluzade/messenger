import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Row } from 'antd';

function Bubble(props) {

  const { type, message } = props;

  return (
    <span className="bubble-component">
      <Row>
        <div className={`bubble-wrapper ${type.split('-')[0]}`}>
          <span className={type}>
            <span>{message}</span>
          </span>
        </div>
      </Row>
    </span>
  )
}

export default Bubble;
