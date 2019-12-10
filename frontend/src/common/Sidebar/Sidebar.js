import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { instance, parseJwt } from '../../constants';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import nophoto from '../../images/nophoto.png';

function Sidebar (props) {
  const [closing, setClosing] = useState(false);
  const [competitorStats, setCompetitorStats] = useState(false);
  const [competitor, setCompetitor] = useState(false);

  const items = [
    {
      link: '/',
      label: "Today's Workout",
    },
    {
      link: '/leaderboard',
      label: "Leaderboard",
    },
    {
      link: '/submit',
      label: "Submit Workout",
      bold: true,
    },
    {
      link: '/login',
      label: "Logout",
      last: true,
    },
  ]

  useEffect(() => {
    const parsed = parseJwt(localStorage.getItem('token'));
    if (!parsed) return;

    const username = parsed.sub;

    
    instance().get(`/profile/${username}`).then((res) => {
      setCompetitor(res.data.competitorsResource);
      localStorage.setItem('competitor', JSON.stringify(res.data.competitorsResource));
      setCompetitorStats(res.data.profileScores);
    }).catch(() => {
    })
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    setClosing(!props.open);
  }, [props.open]);

  const closeMenu = () => {
    props.setMenuOpen(false);
  }

  const img = useRef();

  return (
    <div styleName='container'>
      <div styleName={`background ${props.open ? 'open' : 'closed'}`} onClick={closeMenu}>
        <div styleName={`sidebar`} onClick={e => e.stopPropagation()}>

          <Link to="/profile" onClick={closeMenu} >
            <div styleName="profile-holder">
              <img styleName='image' ref={img} src={competitor.image} onError={() => img.current.src = nophoto}></img>
              <div styleName="username">
                &nbsp;{competitor.username}&nbsp;
              </div>
              <div styleName="age">
                &nbsp;{competitor.age} years old&nbsp;
              </div>
            </div>
          </Link>

          {
            items.map((item) => {
              return (
                <div key={item.link} styleName={(item.last ? 'bottom' : '') + ' ' + (item.bold ? 'bold' : '')}>
                  <Link to={item.link}>
                    <div styleName={`li`} onClick={closeMenu} >
                      {item.label}
                    </div>
                  </Link>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default CSSModules(Sidebar, styles, {allowMultiple: true});
