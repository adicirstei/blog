
/*
 * GET home page.
 */
var couch = require('couch'),
    c = couch('http://blog:bl0gger@adicirstei.iriscouch.com/blog_cirstei_ro');

exports.index = function(req, res){
    c.post({'msg':'new document'}, function (e, info) {
        if (e){ 
            throw e;
        } else{
            console.log('ok');
            console.log(info);
        }
    });

    res.render('index', { title: 'Express' })
};