var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var profileRouter = require('./routes/profile');
var logoutRouter = require('./routes/logout');
var walletRouter = require('./routes/wallet');

var app = express();

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'you secret key' }))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new localStrategy((user, password, done) => {
    if (user !== 'test_user')
      return done(null, false, {
        message: 'User not found',
      })
    else if (password !== 'test_password')
      return done(null, false, {
        message: 'Wrong password',
      })

    return done(null, { id: 1, name: 'Test', age: 21 })
  })
)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/logout', logoutRouter);
app.use('/register', registerRouter);
app.use('/wallet', walletRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



module.exports = app;
