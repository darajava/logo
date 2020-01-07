import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { instance, parseJwt } from '../../constants';
import { Link } from 'react-router-dom';

import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import nophoto from '../../images/nophoto.png';

function Sidebar (props) {
  const [closing, setClosing] = useState(false);
  const [user, setUser] = useState(false);

  const items = [
    {
      link: '/',
      label: "Home",
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

    const username = parsed.username;
    console.log(parsed)
    
    instance().get(`/api/profile/${username}`).then((res) => {
      console.log(res);
      setUser(res.data);
    }).catch(() => {
      // :)
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
              <img styleName='image' ref={img} src={user.image || "Whack"} onError={() => img.current.src = nophoto}></img>
              <div styleName="username">
                &nbsp;{user.username}&nbsp;
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
