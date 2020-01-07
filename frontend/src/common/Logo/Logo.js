import React from 'react';

import CSSModules from 'react-css-modules';
import styles from './styles.module.css';

const Logo = () => {
  
  return (
    <div styleName="logo">
    	Logo
    </div>
  );
}

export default CSSModules(Logo, styles);
