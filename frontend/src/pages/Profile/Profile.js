import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import moment from 'moment';
import { FaInstagram, FaVenus, FaMars, FaEnvelope, FaRunning } from 'react-icons/fa';

import { instance, parseJwt } from '../../constants';
import nophoto from '../../images/nophoto.png';

import { withRouter } from 'react-router-dom';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Loading from '../../common/Loading/Loading';

function Profile ({match}) {

  useEffect(() => {
    setLoading(true);
    setError();

    let username;
    if (match && match.params && match.params.username) {
      username = match.params.username;
    } else {
      username = parseJwt(localStorage.getItem('token')).sub;
    }
    
    instance().get(`/profile/${username}`).then((res) => {
      setCompetitor(res.data.competitorsResource);
      setCompetitorStats(res.data.profileScores);
      setWorkouts(res.data.profileScores.scores);
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
        <img styleName='image' ref={img} src={competitor.image} onError={() => img.current.src = nophoto}></img>
        <div styleName='user-info'>
          <div styleName="username">
            {competitor.username}
          </div>
          <div styleName="age">
            {competitor.age} years old
          </div>
          {competitor.instagramLink && 
            <div styleName="ig">
              <FaInstagram styleName="icon" /> 
              <a target="_blank" href={'https://instagram.com/' + competitor.instagramLink}>
                {competitor.instagramLink.replace('https://www.instagram.com/', '').replace('/', '')}
              </a>
            </div>
          }
          <div>
            {!competitor.male && <FaVenus styleName="icon female" />}
            {competitor.male && <FaMars styleName="icon male" />}
            {competitor.male ? 'Male' : 'Female'}
          </div>
          {/*<div>
            <FaRunning styleName='icon' />
            {competitor.gym}
          </div>*/}
        </div>
      </div>
      {competitorStats.averagePosition !== 'NaN' &&
        <div styleName='stats'>
          <div>
            Completed challenges: <b>{competitorStats.completedChallenges}</b>
          </div>
          <div>
            Average position: <b>#{competitorStats.averagePosition.toFixed(1)}</b>
          </div>
          <div>
            Highest position: <b>#{competitorStats.bestPosition}</b>
          </div>
        </div>
      }

      <div styleName='history'>
        <div styleName="history-header">{competitor.username}'s workouts:</div>
        {!workouts.length && <div styleName="stats">
          This competitor hasn't submitted any scores yet...
        </div>}

      </div>

    </div>
  );
}

export default withRouter(CSSModules(Profile, styles, {allowMultiple: true}));
