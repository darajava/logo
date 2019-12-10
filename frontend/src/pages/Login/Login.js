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

    setLoading(true);
    instance.post('api/authenticate', querystring.stringify({
        username,
        password,
    })).then((res) => {
      localStorage.setItem('token', res.data);
      localStorage.setItem('group', jwt_decode(res.data).rol.find(function(role) {
        return role.startsWith('GROUP_');
      }).substring('GROUP_'.length));

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
      <div styleName="content">
        <Logo/>

        {loading && <Loading/>}

          <span styleName="input-holder">
            <Input
              placeholder="Username or Email"
              value={username}
              onChange={setUsername}
              error={usernameError}
            />
          </span>
          <span styleName="input-holder">
            <Input
              type="Password"
              onChange={setPassword}
              value={password}
              placeholder="Password"
              error={passwordError}
            />
          </span>

          <div styleName="error">{error}</div>

          <span styleName="button-holder">
            <Button onClick={login} label="Sign in"/>
          </span>
          <span styleName="button-holder">
            <Button secondary onClick={() => history.push('/register')} label="Sign up"/>
          </span>
      </div>
    </div>
  );
}

export default withRouter(CSSModules(Login, styles));
