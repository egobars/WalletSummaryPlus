var express = require('express');
var passport = require('passport');
const User = require('../models/user')

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('register');
});

router.post('/', function(req, res, next) {
  var user = new User({ name: req.body.name, surname: req.body.surname, username: req.body.username, password: req.body.password});
  user.save(function(err) {
    return err
      ? next(err)
      : req.logIn(user, function(err) {
        return err
          ? next(err)
          : res.redirect('/');
      });
  });
});

module.exports = router;
