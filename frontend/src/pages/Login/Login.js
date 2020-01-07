import React, {useState} from 'react';
import axios from 'axios';
import CSSModules from 'react-css-modules';
import {HashRouter as Router, Route, withRouter} from "react-router-dom";

import styles from './styles.module.css';

import {API_URL} from '../../constants';
import Logo from '../../common/Logo/Logo';
import Loading from '../../common/Loading/Loading';
import Button from '../../common/Button/Button';
import Input from '../../common/Input/Input';
import { ErrorText } from '../../common/Text/Text';

import jwt_decode from 'jwt-decode';

var querystring = require('querystring');

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    'accept': 'application/json'
  }
});

const Login = ({history}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // We remove the token when user hits the login page, to log them out.
  localStorage.removeItem('token');

  let login = () => {
    setError('');
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Please enter something');
      return;
    }

    if (!password) {
      setPasswordError('Please enter something');
      return;
    }

    let payload = { password };
    if (/(.+)@(.+){2,}\.(.+){2,}/.test(username)) {
      payload.email = username;
    } else {
      payload.username = username;
    }

    setLoading(true);
    instance.post('api/authenticate', payload).then((res) => {
      localStorage.setItem('token', res.data.token);

      history.push('/');
    }).catch(function (error) {
      setTimeout(() => {
        setLoading(false);
        if (error.message.indexOf('403') !== -1) {
          setError('Wrong username or password');
        } else {
          setError('Something went wrong, please try again later');
        }
      }, 1000);
    });
  }

  return (
    <div styleName="container">
      {loading && <Loading/>}
      
      <div styleName="content">
        <Logo/>
        <div styleName="inputs">
          <Input
            placeholder="Username or Email"
            value={username}
            onChange={setUsername}
            error={usernameError}
          />
          <Input
            type="Password"
            onChange={setPassword}
            value={password}
            placeholder="Password"
            error={passwordError}
          />
        </div>

        <div styleName="error-text">
          <ErrorText center>{error}</ErrorText>
        </div>

        <div styleName="buttons">
          <Button onClick={login}>Sign In</Button>
          <Button secondary onClick={() => history.push('/register')}>Sign up</Button>
        </div>
      </div>
    </div>
  );
}

export default withRouter(CSSModules(Login, styles));
