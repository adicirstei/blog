var express = require('express');
var auth = require('./auth.js');
var app = module.exports = express.createServer();

// Configuration


auth.setup();

app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyb0ard sat" }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  auth.middleware();
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  
});
app.dynamicHelpers({
  session: function(req, res){
    return req.session;
  }
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});
auth.helpExpress(app);
exports = app;