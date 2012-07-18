var models = require('./models');
var User = models.User;

var hash = function(data) {
		var crypto = require('crypto');
		var shasum = crypto.createHash('sha1');
		shasum.update(data);
		var d = shasum.digest('hex');
		return d;
	}
module.exports = {
	login: function(user, pass, fn) {
		User.findOne({
			username: user,
			password: hash(pass)
		}, ['username', 'email'], function(err, u) {
			if (err || !u) {
				fn(null);
				return;
			}
			fn(u);
		});
	}
};