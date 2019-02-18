// const bcrypt = require('bcrypt');
import serverConfig from '../config';
const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = {

  login: function loginUser(userlogin, password, callback) {
    User.findOne({
      username: userlogin,
    }, (err, user) => {
      if (err) {
        callback(err, null);
        return;
      }

      if (!user) {
        // User not found
        callback(err, null);
      } else {
        user.comparePassword(password, (errPass, isMatch) => {
          let authToken;
          if (errPass) {
            callback(errPass, null);
            return;
          }

          if (isMatch) {
            authToken = jwt.sign({
              username: user.username,
              _id: user._id,
            }, serverConfig.JWTSECRET);
            callback(null, authToken);
          } else {
            callback(err, null);
          }
        });
      }
    });
  },
  register: function registerUser(username, password, callback) {
    let authToken;
    const newUser = new User({
      username,
      password,
    });

    newUser.save((err, user) => {
      if (err) {
        callback(err, null);
        return;
      }

      authToken = jwt.sign({
        username: user.username,
        _id: user._id,
      }, process.env.JWTSECRET);
      callback(null, authToken);
    });
  },
};
