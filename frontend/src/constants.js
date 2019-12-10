import axios from 'axios';

// TODO we don't really need this, we can just reference directly
export const API_URL = process.env.REACT_APP_API_URL;

// Singleton pattern for getting axios instance
let oldToken, oldInstance;
export const instance = () => {
  if (oldToken === localStorage.getItem('token')) return oldInstance;

  oldToken = localStorage.getItem('token');
  oldInstance = axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    },
  });

  return oldInstance;
};

export const igUrl = 'https://api.instagram.com/oauth/authorize/?client_id=dbbf82603e4e41159b98d117d4e8d603&redirect_uri=http://localhost:3000&response_type=token';

export function parseJwt (token) {
  if (!token) return;
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};
