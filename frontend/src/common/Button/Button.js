import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

function Button(props) {

  return (
    <div>
      <button
        styleName={`button ${props.secondary ? 'secondary' : ''}`}
        type={props.type || "button"}
        onClick={props.onClick}
      >
        {props.label}
      </button>
      {props.error && <div styleName="error">{props.error}</div>}
    </div>
  );
}

export default CSSModules(Button, styles, {allowMultiple: true});
