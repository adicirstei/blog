var express = require('express');
var routes = require('./routes');
var settings = require('./settings')
  , auth = require('./auth');
  
  
var app = express.createServer();
app.configure(function(){
  app.use(express.cookieParser());
  app.use(express.session({ secret: "keyb0ard sat" }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
//  mongooseAuth.middleware();
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  
});

console.log('debug', app);

//app.dynamicHelpers({
//  session: function(req, res){
//    return req.session;
//  }
//});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog');

auth.setup(mongoose);

// Routes
routes.setup({app: app, auth: auth, db: mongoose});



//console.log(settings);
app.listen((process.env.PORT? process.env.PORT : 3000), function(){
  console.log("Express server started on port 3000 in %s mode", app.settings.env);

});
