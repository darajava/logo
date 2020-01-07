import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL, instance } from '../../constants';

import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Input from '../../common/Input/Input';
import Logo from '../../common/Logo/Logo';
import Loading from '../../common/Loading/Loading';
import Button from '../../common/Button/Button';
import Modal from '../../common/Modal/Modal';
import { HashRouter as Router, Route, withRouter } from "react-router-dom";
import Crop from './Crop';
import 'cropperjs/dist/cropper.css';

import moment from 'moment';
import profanity from './profanity.json';
import { Prompt } from "react-router"
import jwt_decode from "jwt-decode";

let usernameTimeout, emailTimeout;
const Register = ({history, location}) => {

  const cropper = useRef();

  const [loading, setLoading] = useState(false);
  
  // DEBUG
  const [username, setUsername] = useState('aa');
  const [email, setEmail] = useState('email@asd.asd');
  const [password, setPassword] = useState('aaaaaa');
  const [confirmPassword, setConfirmPassword] = useState('aaaaaa');

  // const [username, setUsername] = useState('');
  // const [groupCode, setGroupCode] = useState('');
  // const [email, setEmail] = useState('');
  // const [dob, setDob] = useState();
  // const [instagramLink, setInstagramLink] = useState('');
  // const [male, setMale] = useState(undefined);
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');


  const [usernameError, setUsernameError] = useState('');
  const [usernameInfo, setUsernameInfo] = useState('');
  const [usernameWarning, setUsernameWarning] = useState('');
  const [groupCodeError, setGroupCodeError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailInfo, setEmailInfo] = useState('');
  const [dobError, setDobError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [imageError, setImageError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  const [photoModalOpen, setPhotoModalOpen] = useState(false);
  const [photo, setPhoto] = useState('');
  const [cropped, setCropped] = useState('');

  const submit = () => {
    setGroupCodeError('');
    setUsernameError('');
    setEmailError('');
    setDobError('');
    setPasswordError('');
    setConfirmPasswordError('');

    let errored = false
    if (!username) {
      setUsernameError('Please enter username'); errored = true;
    }

    if (! /(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
      setEmailError('Please enter a valid email address'); errored = true;
    }

    if (!email) {
      setEmailError('Please enter an email address'); errored = true;
    }

    if (!password) {
      setPasswordError('Please enter your password'); errored = true;
    }

    if (password && password.length < 6) {
      setPasswordError('Please provide a longer password'); errored = true;
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please re-enter your password'); errored = true;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match'); errored = true;
    }

    if (errored) {
      return;
    }

    setLoading(true);
    const json = {
      email,
      username,
      password,
    };


    // We need to fetch our cropped data in state 
    // before submitting so we can set this in the body of the request
    // fetch(cropped)
    // .then(res => res.blob())
    // .then(blob => {
      alert(API_URL);
      // const bodyFormData = new FormData();

      // bodyFormData.set('user', JSON.stringify(json));
      // bodyFormData.append('file', blob);

      // Posting to an endpoint accepting multipart form data
      // Expecting a response with the auth token so app can continue 
      axios.post(`${API_URL}api/register`, json)
      .then(response => {
        setTimeout(() => {
          localStorage.setItem('token', response.data);
          
          history.push('/');
        }, 1000);
      })
      .catch(error => {
        setGeneralError('You need to wire up the API');

        setLoading(false);
      });
    // });
  }

  const checkUsername = (name) => {
    setUsername(name);

    setUsernameWarning('');
    setUsernameInfo('');
    clearTimeout(usernameTimeout);
    setUsernameError('');

    for (let i = 0; i < profanity.length; i++) {
      if (name.indexOf(profanity[i]) !== -1) {
        setUsernameError('Ah here, can\'t be having that now.');
        return;
      }
    }
  };


  const minDate = new Date();
  minDate.setFullYear( minDate.getFullYear() - 80 );
  const maxDate = new Date();
  maxDate.setFullYear( maxDate.getFullYear() - 18 );
  const openToDate = new Date();
  openToDate.setFullYear( openToDate.getFullYear() - 30 );

  return (
    <div styleName="container">
      <Prompt
        when={!loading && !photoModalOpen}
        message="Going back will abandon registration"
      />
      <Logo/>
      <div>Register</div>

      {
        photoModalOpen && 
        <div styleName="crop-holder">
          <Crop photo={photo} setPhoto={setPhoto} setCropped={setCropped} close={() => setPhotoModalOpen(false)}/>
        </div>
      }

      {
        cropped ? (
          <img src={cropped} styleName="cropped" onClick={() => setPhotoModalOpen(true)} />
        ) : (
          <Button error={imageError} label="Profile Photo" onClick={() => setPhotoModalOpen(true)} />        
        )
      }

      <Input
        placeholder="Username"
        value={username}
        onChange={checkUsername}
        info={usernameInfo}
        warning={usernameWarning}
        error={usernameError}
      />

      <Input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e)}
        error={emailError}
        info={emailInfo}
      />

      <Input
        placeholder="Password"
        value={password}
        onChange={setPassword}
        type="password"
        name="random"
        error={passwordError}
      />

      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={setConfirmPassword}
        type="password"
        name="random"
        error={confirmPasswordError}
      />

      <Button
        error={generalError}
        onClick={submit}
        label={<>Sign Up {loading && <Loading />}</>}
      />

      <div styleName="hint">
        Already have an account? <a href="/login">Sign in!</a>
      </div>

    </div>
  );
}

export default withRouter(CSSModules(Register, styles));
