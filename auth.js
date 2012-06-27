var mongoose, User;
var hash = function(data){
	var crypto = require('crypto');
	var shasum = crypto.createHash('sha1');
	shasum.update(data);
	var d = shasum.digest('hex');
	return d;
}
module.exports = {
	setup: function(db){
		mongoose = db;
		var Schema = mongoose.Schema
			, ObjectId = mongoose.SchemaTypes.ObjectId;
		var UserSchema = new Schema({username: String, email: String, password: String, fullname: String});
		mongoose.model('User', UserSchema);
		User = mongoose.model('User');
	},
	User: User,
	login: function (user, pass, fn){
		User = mongoose.model('User');
		console.log(User);
		console.log(user, pass);
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

