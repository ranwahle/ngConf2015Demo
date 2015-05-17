var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var peopleInQueue = [],
   activeServiceStands = [],
    lastCustomerToEnter,
    customersCounter = 0;

io.on('connection', function(socket){


  socket.emit('personnel', activeServiceStands);
  if (lastCustomerToEnter)
    socket.emit('lastNumberToEnter', lastCustomerToEnter.turnNumber);
  socket.on('enqueue', function(person, callback)
  {
    if (!person)
      return;
    person.clientId = socket.client.id;

    peopleInQueue.push(person);
    customersCounter++;

    person.turnNumber = customersCounter;
    if (callback) {
      callback(person.turnNumber);
    }
    else {
      io.sockets.connected[socket.client.id].emit('yourNumber', person.turnNumber);
    }
   // socket.emit('yourNumber', person.turnNumber);
  });

  socket.on('assign', function(personnel)
  {
    var customer  = peopleInQueue[0];

    peopleInQueue.splice(0, 1);
    if (!customer)
    {
      return;
    }
    personnel.customer = customer;
    socket.emit('personnelAssigned', personnel);
    io.sockets.connected[customer.clientId].emit('yourNumber', ' They\'re calling you');
    lastCustomerToEnter = customer;
  });

  socket.on('addStand', function(servicePersonnel)
  {

    activeServiceStands.push(servicePersonnel);
    servicePersonnel.id =activeServiceStands.length;

        socket.emit('standAdded', servicePersonnel);
  });
});
//});
//var io = require('./turnsServer/turnsManager');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.get('/', function(req, res) {
  res.send("Hello World!");
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
//var server = http.createServer(app);
http.listen(3000, function(){
  console.log('listening on *:3000');
});
//var server = app.listen(3000, function () {
//
//  var host = server.address().address;
//  var port = server.address().port;
//
//  console.log('Example app listening at http://%s:%s', host, port);
//
//});

module.exports = app;
