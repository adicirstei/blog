var app;
var models = require('../models');
var auth = require('../auth');
var BlogPost = models.BlogPost,
    User = models.User;

exports.setup = function(options){
	app = options.app;

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
				res.render('login', {errors: [new Error('login failed')]});
			}
		});
	});
	
	app.get('/edit/:year?/:month?/:day?/:title?',  function(req, res) {
    var y, m, d, t, p;
    y = req.params.year;
    m = req.params.month;
    d = req.params.day;
    t = req.params.title;
    p = y || m || d || t;
    if (y && m && d && t) {
      BlogPost.find({title:'test test'}, function(err, posts) {
        console.log('error', err);
        console.log('info', posts[0]);
        console.log('info', y, m, d, t);
        if (!err && posts) {
          // edit existing post
          res.render('edit', {post: posts[0], user: req.session.user});
        } else {
          res.redirect('/');
          
        }
      });
    
    } else if (p) {
      // malformed url
      console.log('warn', 'malformed URL');
      res.redirect('/');
    } else {
      // new post
      res.render('edit', {post: new BlogPost(), user: req.session.user });
    }
  });
  app.put('/edit', isauth, function(req, res){
    var post = req.body.post;
    var dbpost;
    if(post.id) {
      // try to update document by id
      BlogPost.update({_id: post.id}, {title: post.title, body: post.body, tags: post.tags.split(',')}
      , function(err, numAfect){
        if (err) {
          console.log('error', err);
        }
      });
    } else {
      // add new post
      dbpost = new BlogPost();
      dbpost.title = post.title;
      dbpost.body = post.body;
      dbpost.tags = post.tags.split(',');
      dbpost.comments = [];
      
      dbpost.save(function(err) {
        console.log('error', err);
      });
    }
    res.redirect('/');
  });
  app.del('/edit', isauth, function(req, res){
      res.redirect('/');
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