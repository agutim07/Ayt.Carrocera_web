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

module.exports = app;
