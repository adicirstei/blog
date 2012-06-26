var mongoose, User;

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
		User.findOne({ username: user, password: password}, function (err, u){
			if (err){
			}else{
				if(u){
					fn(u);
				}
			}
		});
	}
};

