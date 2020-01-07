import React, { useState } from 'react';
import CSSModules from 'react-css-modules';
import { FaBars } from 'react-icons/fa';

import styles from './styles.module.css';


const Header = ({route, setMenuOpen}) => {

  // Disable header on these routes.
  if (
    !route
    || route === '/login'
    || route === '/register'
  ) return;

  return (
    <div>
      <div styleName="fixed">
        <div className={styles.first} onClick={() => setMenuOpen(true)} >
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

export default CSSModules(Header, styles);
