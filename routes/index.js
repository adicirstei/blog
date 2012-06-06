
/*
 * GET home page.
 */
//var couch = require('couch'),
//    c = couch('http://blog:bl0gger@adicirstei.iriscouch.com/blog_cirstei_ro');

exports.index = function(req, res){
  
    res.render('index', { title: 'Express' })
};