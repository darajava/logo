import React, { useState, useEffect, useRef } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

import { ErrorText, InfoText, WarningText } from '../Text/Text';

function Input(props) {
  const input = useRef();

  // When there is an error, scroll the errored element (this) into view 
  useEffect(() => {
    if (props.error) {
      input.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [props.error]);

  return (
    <div>
      <input
        ref={input}
        {...props}
        onChange={(e) => props.onChange(e.target.value)}
        styleName={`input ${props.dark ? 'dark' : ''} ${props.error ? 'error-field' : ''}`}
      />
      <ErrorText>{props.error}</ErrorText>
      <WarningText>{props.warning}</WarningText>
      <InfoText>{props.info}</InfoText>
    </div>
  );
}

export default CSSModules(Input, styles, {allowMultiple: true});
