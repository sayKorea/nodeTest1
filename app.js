var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var logger = require('morgan');
var favicon = require('serve-favicon');

//ROUTER
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user/users');
var nifiapiRouter = require('./routes/nifi/nifi-api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname,'public/images', 'favicon.ico')));


//ROUTER Mapping
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nifi-api', nifiapiRouter);

// catch 404 and forward to error handler
app.use(function (req, res) {
  //console.log("app.use(function (req, res) {");
  //console.log(req);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // console.log(req);
  // console.log(next);
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
