import React, {useState, useEffect} from 'react';
// We need HashRouter for the router to work in app form with Cordova.
// Change this to BrowserRouter if you need web only.
import {HashRouter as Router, Route, withRouter} from "react-router-dom";

import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';

import AuthRoute from './common/AuthRoute/AuthRoute';
import Header from './common/Header/Header';
import Sidebar from './common/Sidebar/Sidebar';
import SplashScreen from './common/SplashScreen/SplashScreen';

import styles from './styles.module.css';

function App(props) {
  const [error, setError]  = useState();
  const [splashScreenOpen, setSplashScreenOpen]  = useState(true);

  // Scroll to top on new page
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location.pathname]);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main">
      {/* Remove to disable splash screen */}
      {!splashScreenOpen && <SplashScreen close={() => {setSplashScreenOpen(false)}} />}

      <Header route={props.location.pathname} setMenuOpen={setMenuOpen} />

      <div className="content">
        <Sidebar open={menuOpen} setMenuOpen={setMenuOpen} />

        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        <AuthRoute path="/profile/:username?" component={Profile} />
        <AuthRoute path="/" exact component={Home} />
      </div>
    </div>
  );
}

export default withRouter(App);