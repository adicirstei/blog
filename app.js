var express = require('express');
var routes = require('./routes');
var everyauth = require('everyauth')
  , settings = require('./settings')
  , Promise = everyauth.Promise;

everyauth.debug = true;

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = mongoose.SchemaTypes.ObjectId;

var UserSchema = new Schema({})
  , User;
var mongooseAuth = require('mongoose-auth');


UserSchema.plugin(mongooseAuth, {
    everymodule: {
      everyauth: {
          User: function () {
            return User;
          }
      }
    }
/*  , facebook: {
      everyauth: {
          myHostname: 'http://www.cirstei.ro'
        , appId: conf.fb.appId
        , appSecret: conf.fb.appSecret
        , redirectPath: '/'
      }
    } */
  , twitter: {
      everyauth: {
          myHostname: 'http://www.cirstei.ro'
        , consumerKey: settings.twitter.conskey
        , consumerSecret: settings.twitter.secret
        , redirectPath: '/'
      }
    }
  , password: {
        loginWith: 'email'
      , extraParams: {
            phone: String
          , name: {
                first: String
              , last: String
            }
        }
      , everyauth: {
            getLoginPath: '/login'
          , postLoginPath: '/login'
          , loginView: 'login.jade'
          , getRegisterPath: '/register'
          , postRegisterPath: '/register'
          , registerView: 'register.jade'
          , loginSuccessRedirect: '/'
          , registerSuccessRedirect: '/'
        }
    }
/*  , github: {
      everyauth: {
          myHostname: 'http://www.cirstei.ro'
        , appId: conf.github.appId
        , appSecret: conf.github.appSecret
        , redirectPath: '/'
      }
    }
  , instagram: {
      everyauth: {
          myHostname: 'http://www.cirstei.ro'
        , appId: conf.instagram.clientId
        , appSecret: conf.instagram.clientSecret
        , redirectPath: '/'
      }
    } */
  , google: {
      everyauth: {
          myHostname: 'http://www.cirstei.ro'
        , appId: "224794776836-cp3a2v0elt955h9uqhgmskplhg85ljjm.apps.googleusercontent.com"
        , appSecret: "rxGFo1mBG_H3DX2ifDFawiMZ"
        , redirectPath: '/'
        , scope: 'https://www.google.com/m8/feeds'
      }
    }
});

mongoose.model('User', UserSchema);

mongoose.connect('mongodb://localhost/blog');
User = mongoose.model('User');

var app = express.createServer(
    express.bodyParser()
  , express.static(__dirname + "/public")
  , express.cookieParser()
  , express.session({ secret: 'esoognom'})
  , mongooseAuth.middleware()
);
app.configure(function(){
//  app.use(express.cookieParser());
//  app.use(express.session({ secret: "keyb0ard sat" }));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
//  app.use(express.bodyParser());
//  app.use(express.methodOverride());
//  mongooseAuth.middleware();
  //app.use(app.router);
//  app.use(express.static(__dirname + '/public'));
  
});
app.dynamicHelpers({
  session: function(req, res){
    return req.session;
  }
});
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});




// Routes
routes.setup(app);
mongooseAuth.helpExpress(app);


//console.log(settings);
app.listen(process.env.PORT, function(){
  console.log("Express server started on port %d in %s mode", app.address().port, app.settings.env);
  console.log('http://172.23.0.129:%d', app.address().port);
});
