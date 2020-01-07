import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';

import { instance, parseJwt } from '../../constants';
import nophoto from '../../images/nophoto.png';

import { withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Loading from '../../common/Loading/Loading';

function Profile ({match}) {

  console.log(nophoto)

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
      setCompetitor(res.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
      setError('Could not load profile, please try again later');
    })
  }, [match.params.username]);

  const [competitor, setCompetitor] = useState();
  const [competitorStats, setCompetitorStats] = useState();
  const [workouts, setWorkouts] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const img = useRef();

  console.log(competitorStats)

  if (error) {
    return <div styleName="error">{error}</div>;
  }

  if (loading || !competitor) {
    return <Loading />;
  }

  return (
    <div styleName="container">
      <div styleName='header'>
        <img styleName='image' ref={img} src={competitor.image || "whack"} onError={() => img.current.src = nophoto}></img>
        <div styleName='user-info'>
          <div styleName="username">
            {competitor.username}
          </div>
        </div>
      </div>


    </div>
  );
}

export default withRouter(CSSModules(Profile, styles, {allowMultiple: true}));
