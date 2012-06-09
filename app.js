
/**
 * Module dependencies.
 */
var app = require('./expressapp');  
var routes = require('./routes')
  , settings = require('./settings')
  , auth = require('./auth.js').setup();
  


// Routes
routes.setup(app);

//console.log(settings);
app.listen(3000, function(){
  console.log("Express server started on port %d in %s mode", app.address().port, app.settings.env);
  console.log('http://172.23.0.129:%d', app.address().port);
});
