import React, { useState, useEffect } from 'react';
import { instance } from '../../constants';
import { HashRouter as Router, Route, withRouter, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    localStorage.getItem('token') && localStorage.getItem('token').length
      ? <Component {...props} />
      : <Redirect to='/login' />
  )} />
);

export default AuthRoute;