import React, { useState, useEffect } from 'react';
import { instance } from '../../constants';
import Loading from '../../common/Loading/Loading';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Button from '../../common/Button/Button';
import { HashRouter as Router, Route, withRouter } from "react-router-dom";
import moment from "moment";

function Home({history}) {

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [loading, setLoading] = useState(true);
  const [video, setVideo] = useState();
  const [error, setError] = useState();
  useEffect(() => {
    setError();
    setLoading(true);
    instance().get(`/workout/${date}`).then((res) => {
      
      setName(res.data.title);
      setDesc(res.data.description);
      setVideo(res.data.video);
      setLoading(false);
    }).catch(() => {
      setError('No challenge found for that date');
    });
  }, [date]);

  let content;
  if (error) {
    content = <div>{error}</div>;
  } else if (loading) {
    content = <Loading />;
  } else {
    content = (
      <React.Fragment>
        <div styleName="workout fade-in">
          <div styleName="name">{name}</div>
          
          {video && (
            <div styleName="video">
            <iframe
                width="100%" 
                height="100%"
                src={`https://www.youtube.com/embed/${video}?modestbranding=1`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >
              </iframe>
            </div>
          )}

          <div styleName="desc">{desc}</div>
        </div>

        {date === moment().format('YYYY-MM-DD') && 
          <div styleName="button-holder">
            <Button label="Submit Score" onClick={() => history.push('/submit')} />
          </div>
        }
        <div styleName="button-holder">
          <Button label="Leaderboard" secondary onClick={() => history.push(`/leaderboard/${date}`)} />
        </div>
      </React.Fragment>
    );
  }

  return (
    <div styleName="container">
      {content}
    </div>
  );
}

export default withRouter(CSSModules(Home, styles, {allowMultiple: true}));
