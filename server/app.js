var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();
require('./server');

var newsRouter = require('./routes/news');
var eventsRouter = require('./routes/events');
var loginRouter = require('./routes/login');
var rolesRouter = require('./routes/roles');
var pueblosRouter = require('./routes/pueblos');

// view engine setup
/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug'); */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/news', newsRouter.router);
app.use('/login', loginRouter.router);
app.use('/roles', rolesRouter.router);
app.use('/events', eventsRouter.router);
app.use('/pueblos', pueblosRouter.router);


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
