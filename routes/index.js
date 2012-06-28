var mongoose, app, auth;



/*
 * GET home page.
 */
exports.setup = function(options){
	mongoose = options.db;
	app = options.app;
	auth = options.auth;
	
    app.get('/', function(req, res){
        res.render('index', { title: 'Express', user: req.session.user })
    });
    
    app.get('/logout', function (req, res) {
        req.session.user = null;
        res.redirect('/');
    });
    app.get('/login', function(req, res){
        res.render('login', {source: req.query.source});
    });
	
	app.post('/login', function(req, res){
		auth.login(req.body.username, req.body.password, function(user){
			if (user){ 
				req.session.user = user;
				res.redirect(req.body.source? req.body.source : '/');
			}else{
				res.render('login', {errors: new Error('login failed')});
			}
		});
	});
	
	
    app.get('/db', isauth, function(req, res){
        mongoose.model('User').find({}, function(err, docs){
            if(err){
                res.render('db', {data: err, s: JSON.stringify(req.session), user: req.session.user});
            }else{
                res.render('db', {data: docs, s: JSON.stringify(req.session), user: req.session.user});
            }
        });
        
    });
}

function isauth(req, res, next){
    var li = req.session.user;
    if(li){
        next();
    }else{
        res.redirect('/login?source=' + req.url);
    }
}