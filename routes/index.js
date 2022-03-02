var express = require('express');
var router = express.Router();

function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next();
    else res.redirect('/login');
  })
}

router.get('/', function(req, res, next) {
  /*if (req.user) {
    res.render('index_with_profile', {name: req.user.name});
  }
  else
    res.render('index');*/
  res.render('index');
});

module.exports = router;
