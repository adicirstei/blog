var models = require('./models');
var User = models.User;

var hash = function(data){
	var crypto = require('crypto');
	var shasum = crypto.createHash('sha1');
	shasum.update(data);
	var d = shasum.digest('hex');
	return d;
}
module.exports = {
	login: function (user, pass, fn){
		User.findOne({ username: user, password: hash(pass)}, function (err, u){
			console.log(err, u);
			if (err){
				fn(null);
			}else{
				if(u){
					fn(u);
				}else{
					fn(null);
				}
			}
		});
	}
};

