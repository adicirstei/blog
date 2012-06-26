var mongoose;


/*
 * GET home page.
 */
exports.setup = function(options){
	mongoose = options.db;
	app = options.app;
	
    app.get('/', function(req, res){
        res.render('index', { title: 'Express' })
    });
    
    app.get('/logout', function (req, res) {
        req.session.user = null;
        res.redirect('/');
    });
    app.get('/login', function(req, res){
        res.render('login');
    });
	
	app.post('/login', function(req, res){
		auth.login(req.body.username, req.body.password, function(user){
			if (user){ 
				req.session.user = user;
			}
		});
	});
	
	
    app.get('/db', isauth, function(req, res){
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
    var li = req.session.user;
    if(li){
        next();
    }else{
        res.redirect('/');
    }
}