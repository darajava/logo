var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../schema/User.js');
const mongoose = require('mongoose');
const withAuth = require('../middleware').withAuth;

if (process.env.PRODUCTION) {
  mongoose.connect('mongodb://CHANGE_TO_PROD@localhost/logo?authSource=admin', {useNewUrlParser: true});
} else {
  mongoose.connect('mongodb://localhost/logo', {useNewUrlParser: true});
}

const secret = "Shhhhhhhhhh!";

// POST route to register a user
router.post('/register', function(req, res) {
  const userinfo = { email, password, username, image } = req.body;
  // TODO: First check if username/email exist already

  const user = new User(userinfo);

  // Saving the passed image, this is not a scalable solution (fine for a small app imo)
  if (image) {
    const base64Data = image.replace(/^data:image\/png;base64,/, "");

    require("fs").writeFile(`images/${username}.png`, base64Data, 'base64', function(err) {
      console.log(err);
    });
  }
  
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.error()
      res.status(500)
        .send("Error registering new user please try again.");
    } else {
      const payload = { email, username };
      const token = jwt.sign(payload, secret, {
        expiresIn: '10y', // Or however long you like
      });
      res.status(200).send({token: token});
    }
  });
});

router.post('/authenticate', function(req, res) {
  const { email, password } = req.body;

  console.log('EMAIL: ', email);

  User.findOne({ email }, function(err, user) {
    console.log('USER', user);
    if (err) {
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password.'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email, admin: user.admin, username: user.username };
          const token = jwt.sign(payload, secret, {
            expiresIn: '10y',
          });
          res.status(200).send({'token': token, 'admin': user.admin});
        }
      });
    }

    return;
  });
});

router.get('/profile/:username', withAuth, function(req, res) {
  console.log(req.params.username);


  User.findOne({ username: req.params.username }, function(err, user) {
    if (err) {
      res.status(500).send();
    }
    if (!user) {
      res.status(404).send();
    } else {
      res.status(200).send({email: user._doc.email, username: user._doc.username});
    }
  });
});

module.exports = router;
