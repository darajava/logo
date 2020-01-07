import React from 'react';
import { HashRouter as Router} from "react-router-dom";
import App from './App';

// This file is to hold the route so we can 
// put App into a HoC to access location for the header

// Sound confusing? It is! 
const Main = () => {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Main;
