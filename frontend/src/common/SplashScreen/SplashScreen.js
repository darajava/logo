import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { instance, parseJwt } from '../../constants';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Logo from '../Logo/Logo';

function SplashScreen ({close}) {

  useEffect(() => {
    setTimeout(close, 1700);
  })

  return (
    <div styleName='container'>
     <Logo />
     
    </div>
  );
}

export default CSSModules(SplashScreen, styles, {allowMultiple: true});
