var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
var logger = require('morgan');

const session = require('express-session');
const flash = require('express-flash');
const basicAuth = require('express-basic-auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const { checkIfAuth } = require('./middleware/checkIfAuth');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views/pages'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret: 'this is secret', saveUninitialized: false, resave: false,cookie: { maxAge: 60000 }}));
app.use(flash());

// Middleware before accessing any routes to set the 
// value fir isLoggedIn
app.use(checkIfAuth);

app.use('/', indexRouter);
app.use('/login', indexRouter);
app.use('/users', usersRouter);

// app.get('/logout', function (req, res) {
//   res.status(401).send('Logged out')
//   //or res.status(401).end() if you don't want to send any message
// });

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
