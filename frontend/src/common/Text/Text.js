import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './styles.module.css';

const Text = CSSModules(({level, center, children, bold}) => {

  return (
    <div styleName='container'>
      <div styleName={`${bold ? 'bold' : ''} ${level ? level : ''} ${center ? 'center' : ''}`}>
        {children}
      </div>
    </div>
  );
}, styles, {allowMultiple: true});

export const ErrorText = CSSModules(({center, children}) => {
  return <Text center={center} level="error">{children}</Text>;
}, styles);

export const WarningText = CSSModules(({center, children}) => {
  return <Text center={center} level="warning">{children}</Text>;
}, styles);

export const InfoText = CSSModules(({center, children}) => {
  return <Text center={center} level="info">{children}</Text>;
}, styles);


export default Text;