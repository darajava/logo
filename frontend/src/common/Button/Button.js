import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

const Button = ({secondary, type, onClick, children, error}) => {

  return (
    <div>
      <button
        styleName={`button ${secondary ? 'secondary' : ''}`}
        type={type || "button"}
        onClick={onClick}
      >
        {children}
      </button>
      {error && <div styleName="error">{error}</div>}
    </div>
  );
}

export default CSSModules(Button, styles, {allowMultiple: true});
