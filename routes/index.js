var express = require('express');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
var router = express.Router();

/*function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next();
    else res.redirect('/login');
  })
}*/

router.get('/', function(req, res, next) {
  if (req.user) {
    res.render('index_with_profile', {name: req.user.name + ' ' + req.user.surname});
  }
  else
    res.render('index')
});

module.exports = router;
