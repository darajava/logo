import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import { FaTimes } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

function Modal(props) {

  const [closing, setClosing] = useState(false);

  // Important. On back button press, push current pathname onto history before going
  // back to cancel it. Then close the modal.
  useEffect(() => {
    window.onpopstate = (e) => {
      props.history.push(props.location.pathname);
      close();
    }

    // On modal unload, cancel popstate intercept
    return () => {
      window.onpopstate = () => {};
    }
  }, [])

  const close = () => {
    setTimeout(props.onClose, 170);
    setClosing(true)
  }

  return (
    <div styleName={`modal ${closing ? 'closing' : ''}`} key={closing}>
      <div styleName="header">
       
        <div styleName="middle">
          {props.title}
        </div>
        <div styleName="last" onClick={close}>
          <FaTimes/>
        </div>
      </div>
      <div styleName="content">
        {props.children}
      </div>
    </div>
  );
}

export default withRouter(CSSModules(Modal, styles, {allowMultiple: true,}));
