import React, { useState, useEffect } from 'react';
import { instance } from '../../constants';
import Loading from '../../common/Loading/Loading';
import CSSModules from 'react-css-modules';
import styles from './styles.module.css';
import Button from '../../common/Button/Button';
import { HashRouter as Router, Route, withRouter } from "react-router-dom";
import moment from "moment";

function Home({history}) {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  let content;

  if (error) {
    content = <div>{error}</div>;
  } else if (loading) {
    content = <Loading />;
  } else {
    content = (
      <React.Fragment>
        Home
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
