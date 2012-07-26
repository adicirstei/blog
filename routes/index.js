var app;
var models = require('../models');
var auth = require('../auth');
var BlogPost = models.BlogPost;
var User = models.User;
var markdown = require('markdown').markdown;
var mdFn = function(code){
  var c = code.replace(/\r\n?/g, '\n');
  console.log(c);
  return markdown.toHTML(c);
};


function makeTagArray(tags) {
  var l, i, t = tags.trim().split(/\s*,\s*/g);
  l = t.length - 1;
  for (i = l; i >= 0; i--) {
    if (t[i] === '') {
      t.splice(i, 1);
    }
  }
  return t;
}

exports.setup = function(options) {
  app = options.app;

  app.get('/logout', function(req, res) {
    req.session.user = null;
    res.redirect('/');
  });

  app.get('/login', function(req, res) {
    res.render('login', {
      source: req.query.source
    });
  });

  app.post('/login', function(req, res) {
    auth.login(req.body.username, req.body.password, function(user) {
      if (user) {
        req.session.user = user;
        res.redirect(req.body.source ? req.body.source : '/');
      } else {
        res.render('login', {
          errors: [new Error('login failed')]
        });
      }
    });
  });

  app.get('/post/:pid?', function(req, res) {
    var pid;
    pid = req.params.pid;

    if (pid) {
      BlogPost.findById(pid, function(err, post) {
        if (!err && post) {
          // render existing post
          res.render('post', {
            markdown: mdFn,
            post: post,
            user: req.session.user
          });
        } else {
          console.log('warn', 'Invalid Id');
          res.redirect('/');
        }
      });
    } else {
      // no post id speciffied, just go to home
      res.redirect('/', {
        user: req.session.user
      });
    }
  });
  app.get('/edit/:pid?', isauth, function(req, res) {
    var pid;
    pid = req.params.pid;

    if (pid) {
      BlogPost.findById(pid, function(err, post) {
        if (!err && post) {
          // edit existing post
          res.render('edit', {
            post: post,
            user: req.session.user
          });
        } else {
          console.log('warn', 'Invalid Id');
          res.redirect('/');
        }
      });
    } else {
      // new post
      res.render('edit', {
        post: new BlogPost(),
        user: req.session.user
      });
    }
  });

  app.put('/edit/:pid?', isauth, function(req, res) {
    var post = req.body.post;
    var dbpost;
    if (!req.params.pid) {
      // save new post
      post.author = req.session.user._id;
      dbpost = new BlogPost(post);
      dbpost.tags = makeTagArray(post.tags);
      dbpost.save(function(err) {
        console.log('error', err);
        res.redirect('/');
      });
    } else {
      // update existing
      BlogPost.update({
        _id: post._id
      }, {
        tags: makeTagArray(post.tags),
        body: post.body,
        published: post.published,
        title: post.title
      }, function(err, affected) {
        if (err) {
          console.log('error', err);
        }
        res.redirect('/');
      });
    }
  });


  app.del('/edit/:pid', isauth, function(req, res) {
    res.redirect('/');
  });

  app.get('/tag/:tag/:pag?', function(req, res) {
    var pag = req.params.pag || 1;
    var tag = req.params.tag;
    pag = (pag < 1 ? 1 : pag);
    var ponpage = 5;
    var totalposts = 0;
    var pages;
    var filter = (req.session.user ? {} : {
      published: true
    });
    filter.tags = tag;

    BlogPost.count(filter, function(err, c) {
      if (!err) {
        totalposts = c;
      }
      pages = Math.ceil(totalposts / ponpage);
      BlogPost.find(filter).sort('date', -1).skip(ponpage * (pag - 1)).limit(ponpage).exec(afterFind);
    });

    function afterFind(err, posts) {
      res.render('index', {
        markdown: mdFn,
        posts: posts,
        page: pag,
        total: pages,
        user: req.session.user
      });
    }
  });

  app.get('/:pag?', function(req, res) {
    var pag = req.params.pag || 1;
    pag = (pag < 1 ? 1 : pag);
    var ponpage = 5;
    var totalposts = 0;
    var pages;
    var filter = (req.session.user ? {} : {
      published: true
    });
    BlogPost.count(filter, function(err, c) {
      if (!err) {
        totalposts = c;
      }
      pages = Math.ceil(totalposts / ponpage);
      BlogPost.find(filter).sort('date', -1).skip(ponpage * (pag - 1)).limit(ponpage).exec(afterFind);
    });

    function afterFind(err, posts) {
      res.render('index', {
        markdown: mdFn,
        posts: posts,
        page: pag,
        total: pages,
        user: req.session.user
      });
    }
  });
};


function isauth(req, res, next) {
  var li = req.session.user;
  if (li) {
    next();
  } else {
    res.redirect('/login?source=' + req.url);
  }
}