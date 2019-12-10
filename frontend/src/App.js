import React, {useState, useEffect} from 'react';
import {HashRouter as Router, Route, withRouter} from "react-router-dom";
import Login from './pages/Login/Login';
import Header from './common/Header/Header';
import AuthRoute from './common/AuthRoute/AuthRoute';
import Sidebar from './common/Sidebar/Sidebar';
import SplashScreen from './common/SplashScreen/SplashScreen';
import Register from './pages/Register/Register';
import Profile from './pages/Profile/Profile';
import Home from './pages/Home/Home';

function App(props) {
  const [error, setError]  = useState();
  const [splashScreenOpen, setSplashScreenOpen]  = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [props.location.pathname]);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="main">
      <Header header={props.location.pathname} setMenuOpen={setMenuOpen}/>
      {splashScreenOpen && <SplashScreen close={() => {setSplashScreenOpen(false)}}/>}
      <div className="content">
        <Sidebar open={menuOpen} setMenuOpen={setMenuOpen}/>

        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>

        <AuthRoute path="/" exact component={Home}/>
        <AuthRoute path="/profile/:username?" component={Profile}/>
      </div>
    </div>
  );
}

export default withRouter(App);