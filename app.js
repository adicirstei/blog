
/**
 * Module dependencies.
 */
var app = require('./expressapp');  
var routes = require('./routes');

// Routes
routes.setup(app);

//console.log(settings);
app.listen(process.env.PORT, function(){
  console.log("Express server started on port %d in %s mode", app.address().port, app.settings.env);
  console.log('http://172.23.0.129:%d', app.address().port);
});
