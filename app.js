var express = require('express');
var routes = require('./routes');
var everyauth = require('everyauth')
  , settings = require('./settings')
  , auth = require('./auth');
  
  
var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
  , auth.middleware()
);
app.configure(function(){
//  app.use(express.cookieParser());
//  app.use(express.session({ secret: "keyb0ard sat" }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
//  app.use(express.bodyParser());
//  app.use(express.methodOverride());
//  mongooseAuth.middleware();
  //app.use(app.router);
//  app.use(express.static(__dirname + '/public'));
  
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




// Routes
routes.setup(app);
auth.helpExpress(app);


//console.log(settings);
app.listen(process.env.PORT, function(){
  console.log("Express server started on port %d in %s mode", app.address().port, app.settings.env);
  console.log('http://172.23.0.129:%d', app.address().port);
});
