
/*
 * GET home page.
 */
//var couch = require('couch'),
//    c = couch('http://blog:bl0gger@adicirstei.iriscouch.com/blog_cirstei_ro');
exports.setup = function(app){
  app.get('/', function(req, res){
  
    res.render('index', { title: 'Express' })
  });
  
  
  app.get('/login', function(req, res){
    res.render('login');
  });
}
