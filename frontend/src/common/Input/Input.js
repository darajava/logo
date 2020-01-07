import React, { useState, useEffect, useRef } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

import { ErrorText, InfoText, WarningText } from '../Text/Text';

const Input = ({error, warning, info, onChange, dark, ...rest}) => {
  const input = useRef();

  // When there is an error, scroll the errored element (this) into view 
  useEffect(() => {
    if (error) {
      input.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [error]);

  return (
    <div>
      <input
        ref={input}
        {...rest}
        onChange={(e) => onChange(e.target.value)}
        styleName={`input ${dark ? 'dark' : ''} ${error ? 'error-field' : ''}`}
      />
      <ErrorText>{error}</ErrorText>
      <WarningText>{warning}</WarningText>
      <InfoText>{info}</InfoText>
    </div>
  );
}

export default CSSModules(Input, styles, {allowMultiple: true});
