import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

import { instance, parseJwt } from '../../constants';
import nophoto from '../../images/nophoto.png';

import { withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Loading from '../../common/Loading/Loading';

const Profile = ({match}) => {

  useEffect(() => {
    setLoading(true);
    setError();

    let username;
    if (match && match.params && match.params.username) {
      username = match.params.username;
    } else {
      username = parseJwt(localStorage.getItem('token')).username;
    }
    
    instance().get(`/api/profile/${username}`).then((res) => {
      setUser(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError('Could not load profile, please try again later');
    })
  }, [match.params.username]);

  const [user, setUser] = useState();
  const [UserStats, setUserStats] = useState();
  const [workouts, setWorkouts] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const img = useRef();

  console.log(UserStats)

  if (error) {
    return <div styleName="error">{error}</div>;
  }

  if (loading || !user) {
    return <Loading />;
  }

  return (
    <div styleName="container">
      <div styleName='header'>
        <img
          styleName='image'
          ref={img} src={`${process.env.REACT_APP_API_URL}/${user.username}.png`}
          onError={() => img.current.src = nophoto}
        ></img>
        <div styleName='user-info'>
          <div styleName="username">
            {user.username}
          </div>
          <div styleName="username">
            {user.email}
          </div>
        </div>
      </div>
        This is a very bare bones user profile
    </div>
  );
}

export default withRouter(CSSModules(Profile, styles, {allowMultiple: true}));
