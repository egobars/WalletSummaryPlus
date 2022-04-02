var express = require('express');
const User = require('../models/user')
var router = express.Router();

router.get('/', function(req, res, next) {
  User.find({}).exec(function (err, list_users) {
    res.render('database', {user_list: list_users})
  })
});

router.post('/', function(req, res, next) {
  User.findByIdAndRemove(req.body.userid, function deleteUser(err) {
  })
  res.redirect('/database')
})

module.exports = router;
