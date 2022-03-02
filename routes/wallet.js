var express = require('express');
var request = require('request')
var router = express.Router();

function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next();
    else res.redirect('/login');
  })
}

async function drawPage(req, res) {
  var a_change_now, a_value_now, r_change_now, list_;
  let promise_info = new Promise((resolve, reject) => {
    request('http://194.67.121.113:8080/subscribe/profile/' + req.query.token, (err, response, body) => {
      if (err) { return console.log(err); }
      
      var p_body = JSON.parse(body);
      a_change_now = p_body.absolute_change_24h;
      a_value_now = p_body.assets_value;
      r_change_now = p_body.relative_change_24h;
      resolve();
    });
  });

  let promise_list = new Promise((resolve, reject) => {
    request('http://194.67.121.113:8080/subscribe/assets/' + req.query.token, (err, response, body) => {
      if (err) { return console.log(err); }
      
      var p_body = JSON.parse(body);
      list_ = p_body;
      resolve();
    });
  });
  let new_req = await promise_info;
  let new_req_list = await promise_list;
  res.render('wallet', {token: req.query.token, a_change: a_change_now, a_value: a_value_now, r_change: r_change_now, list: list_});
}

router.get('/', function(req, res, next) {
  /*if (req.user)
    res.render('wallet', {name: req.user.name});
  else
    res.render('wallet_without_auth');*/

  drawPage(req, res);
});

module.exports = router;
