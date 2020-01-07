const jwt = require('jsonwebtoken');
const secret = "Shhhhhhhhhh!";

const withAuth = function(req, res, next) {

  console.log(req.header('Authorization'))
  const token =
    req.body.token ||
    req.query.token ||
    req.header('Authorization').replace('Bearer ', '') ||
    req.cookies.token;

  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
}

module.exports = { withAuth };
