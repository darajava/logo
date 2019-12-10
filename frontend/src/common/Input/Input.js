import React, { useState, useEffect, useRef } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

function Input(props) {
  const component = useRef();

  useEffect(() => {
    if (props.error) {
      component.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.error]);

  return (
    <div ref={component}>
      <input
        {...props}
        onChange={(e) => props.onChange(e.target.value)}
        styleName={`input ${props.dark ? 'dark' : ''} ${props.error ? 'error-field' : ''}`}
      />
      {props.error && <div styleName="error">{props.error}</div>}
      {props.warning && <div styleName="warning">{props.warning}</div>}
      {props.info && <div styleName="info">{props.info}</div>}
    </div>
  );
}

export default CSSModules(Input, styles, {allowMultiple: true});
