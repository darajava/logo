import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { FaBars } from 'react-icons/fa';

import styles from './styles.module.css';


const Login = (props) => {

  // Disable header on these routes.
  if (
    !props.route
    || props.route === '/login'
    || props.route === '/register'
    || props.route === '/register-confirm'
  ) return;

  return (
    <div>
      <div styleName="fixed">
        <div className={styles.first} onClick={() => props.setMenuOpen(true)} >
          <FaBars/>
        </div>
        <div styleName="middle">
          Logo
        </div>
        <div styleName="last">
          hi
        </div>
      </div>
      <div styleName="block">
        &nbsp;
      </div>
    </div>
  );
}

export default CSSModules(Login, styles);
