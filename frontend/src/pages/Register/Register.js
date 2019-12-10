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
  // const [username, setUsername] = useState('');
  // const [groupCode, setGroupCode] = useState('flyefit');
  // const [email, setEmail] = useState('email@asd.asd');
  // const [dob, setDob] = useState('');
  // const [instagramLink, setInstagramLink] = useState('dsfsdf');
  // const [male, setMale] = useState(false);
  // const [password, setPassword] = useState('aaaaaa');
  // const [confirmPassword, setConfirmPassword] = useState('aaaaaa');

  const [username, setUsername] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState();
  const [instagramLink, setInstagramLink] = useState('');
  const [male, setMale] = useState(undefined);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


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
    if (!groupCode) {
      setGroupCodeError('Please enter Gym code'); errored = true;
    }

    if (!username) {
      setUsernameError('Please enter username'); errored = true;
    }

    if (! /(.+)@(.+){2,}\.(.+){2,}/.test(email)) {
      setEmailError('Please enter a valid email address'); errored = true;
    }

    if (!email) {
      setEmailError('Please enter an email address'); errored = true;
    }

    if (!dob) {
      setDobError('Please enter your date of birth'); errored = true;
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

    if (!cropped) {
      setImageError('Please upload a profile photo'); errored = true;
    }

    if (errored) {
      return;
    }

    setLoading(true);
    const json = {
      "groupCode": { "groupId": groupCode },
      email,
      dob,
      username,
      instagramLink,
      male,
      password,
    };


    // we gotta get the cropped image first via fetch to get as blob ??
    // probably a better way to do this but it doesn't matter so much
    fetch(cropped)
    .then(res => res.blob())
    .then(blob => {
      const bodyFormData = new FormData();
      bodyFormData.set('user', JSON.stringify(json));
      bodyFormData.append('file', blob);

      console.log( JSON.stringify(json));

      axios({
        method: 'post',
        url: `${API_URL}/registration`,
        data: bodyFormData,
        config: {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        }
      })
      .then(response => {
        console.log(response, 'ss')
        setTimeout(() => {
          localStorage.setItem('token', response.data);
          localStorage.setItem('group', jwt_decode(response.data).rol.find(role => {
            return role.startsWith('GROUP_');
          }).substring('GROUP_'.length));
          history.push('/');
        }, 1000);
      })
      .catch(error => {
        //handle error
        if (error.response.data.message.indexOf('group code') !== -1) {
          setGroupCodeError('No group code found for ' + groupCode);
        } else {
          setGeneralError(error.response.data.message);
        }

        
        setLoading(false);
      });
    });
  }

  const checkUsername = (name) => {
    const thisName = name.replace(/[^a-zA-Z_\.]/, '').toLowerCase();
    setUsername(thisName);

    setUsernameWarning('');
    setUsernameInfo('');
    clearTimeout(usernameTimeout);
    setUsernameError('');

    for (let i = 0; i < profanity.length; i++) {
      if (thisName.indexOf(profanity[i]) !== -1) {
        setUsernameError('Ah here, can\'t be having that now.');
        return;
      }
    }

    if (!name) return;
    setUsernameWarning('Checking availability...');

    usernameTimeout = setTimeout(() => {
      instance().get(`/registration/exists/username/${name}`).then((res) => {
        setUsernameError('');
        setUsernameWarning('');
        if (res.data) {
          setUsernameError(`Sorry, that username is taken`);
        } else {
          setUsernameInfo(`Username available!`);
        }
      })
    }, 800);
  };

  const checkEmail = (email) => {
    setEmail(email);

    clearTimeout(emailTimeout);

    setEmailInfo('');
    setEmailError('');

    if (!email) return;

    usernameTimeout = setTimeout(() => {
      instance().get(`/registration/exists/email/${email}`).then((res) => {
        setEmailError('');
        if (res.data) {
          setEmailError(<div>Sorry, that email is taken. <a href='login'>Log in</a>?</div>);
        }
      })
    }, 800);
  };

  let modal;

  // Modals should be extracted since this file is long enough, probably even within folder
  if (termsModalOpen) {
     modal = <Modal title="Terms & Conditions" onClose={() => setTermsModalOpen(false)}>
      <div>
        We are absolutely not at fault for any injuries which may arise as a direct or indirect use of this app :)

        TODO: Get lawyered up
      </div>

      <span styleName="button-holder">
        <Button label="Okay" onClick={() => setTermsModalOpen(false)} />
      </span>
    </Modal>
  }

  if (privacyModalOpen) {
     modal = <Modal title="Privacy Policy" onClose={() => setPrivacyModalOpen(false)}>
      <div>
        Yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada yada
      </div>

      <span styleName="button-holder">
        <Button label="Okay" onClick={() => setPrivacyModalOpen(false)} />
      </span>
    </Modal>
  }

  const minDate = new Date();
  minDate.setFullYear( minDate.getFullYear() - 80 );
  const maxDate = new Date();
  maxDate.setFullYear( maxDate.getFullYear() - 18 );
  const openToDate = new Date();
  openToDate.setFullYear( openToDate.getFullYear() - 30 );

  return (
    <div styleName="container">
      <Prompt
        when={!loading && !photoModalOpen && !termsModalOpen && !privacyModalOpen}
        message="Going back will abandon registration"
      />
      <div>{modal}</div>

      <div styleName="logo"><Logo/></div>
      <div styleName="title">Register with WorkUp</div>
      <Input
        placeholder="Gym Code"
        value={groupCode}
        onChange={setGroupCode}
        error={groupCodeError}
      />
      <div styleName="hint">
        This is the sign up code you find on a flyer in a participating gym.
      </div>

      {photoModalOpen && 
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


      <div>

      </div>


      <Input
        placeholder="Email"
        value={email}
        onChange={checkEmail}
        error={emailError}
        info={emailInfo}
      />

      <Input
        placeholder="Instagram Username (optional)"
        value={instagramLink}
        onChange={setInstagramLink}
        autocomplete="off"
        name="random"
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

      <div styleName="submit">
        <Button error={generalError} info="kjhk" onClick={submit} label={!loading ? "Sign Up" : <Loading tiny secondary noDelay />}/>
        <div styleName="terms">
          By clicking Sign Up, you agree to our <a onClick={() => setTermsModalOpen(true)}>Terms & Conditions</a>.
          Learn how we use and your data in our <a onClick={() => setPrivacyModalOpen(true)}>Privacy Policy</a>.
        </div>
      </div>

      <div styleName="hint">
        Already have an account? <a href="/login">Sign in!</a>
      </div>

    </div>
  );
}

export default withRouter(CSSModules(Register, styles));
