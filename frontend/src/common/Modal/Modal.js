import React, { useState, useEffect } from 'react';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import { FaTimes } from 'react-icons/fa';
import { withRouter } from 'react-router-dom';

const Modal = ({history, location, onClose, title, children}) => {

  const [closing, setClosing] = useState(false);

  // Important! On back button press, push current pathname onto history before going
  // back to cancel it. Then close the modal. This is done so that the back button works
  // as expected on android and browser.
  useEffect(() => {
    window.onpopstate = (e) => {
      history.push(location.pathname);
      close();
    }

    // On modal unload, cancel popstate intercept
    return () => {
      window.onpopstate = () => {};
    }
  }, [])

  const close = () => {
    setTimeout(onClose, 170);
    setClosing(true)
  }

  return (
    <div styleName={`modal ${closing ? 'closing' : ''}`} key={closing}>
      <div styleName="header">
        <div styleName="first"></div>
        <div styleName="middle">
          {title}
        </div>
        <div styleName="last" onClick={close}>
          <FaTimes/>
        </div>
      </div>
      <div styleName="content">
        {children}
      </div>
    </div>
  );
}

export default withRouter(CSSModules(Modal, styles, {allowMultiple: true,}));
