var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/blog');


/*
 * GET home page.
 */
exports.setup = function(app){
    app.get('/', function(req, res){
        res.render('home', { title: 'Express' })
    });
    
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
    app.get('/login', function(req, res){
        res.render('login');
    });
    app.get('/db', function(req, res){
        mongoose.model('User').find({}, function(err, docs){
            if(err){
                res.render('db', {data: err, s: JSON.stringify(req.session)});
            }else{
                res.render('db', {data: docs, s: JSON.stringify(req.session)});
            }
        });
        
    });
}

function isauth(req, res, next){
    if(req.session.user){
        next();
    }else{
        res.redirect('/');
    }
}