import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

function Loading(props) {
      
  const content = <div styleName={`spinner ${props.tiny ? 'tiny' : ''} ${props.secondary ? 'secondary' : ''}`}></div>

  const [show, setShow] = useState(props.noDelay);

  // Don't show the loader immediately in case the operation is < 300ms
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 300);
  }, []);

  if (!show) {
    return;
  }

  if (props.tiny) {
    return content;
  }
  return (
    <div styleName="container">
      {content}
    </div>
  );
}

export default CSSModules(Loading, styles, {allowMultiple: true});
