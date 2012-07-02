var mongoose = require('mongoose');
var Schema = mongoose.Schema
		, ObjectId = mongoose.SchemaTypes.ObjectId;
var UserSchema = new Schema({username: String, email: String, password: String, fullname: String});
mongoose.model('User', UserSchema);


var BlogPostSchema = new Schema({
  author: {type: ObjectId, ref: 'User'}, 
  date: {type: Date, index: true, default: Date.now}, 
  title: {type: String, index: true}, 
  body: String, 
  tags: [String],
  published: {type: Boolean, default: true},
  comments: [{
    email: String,
    date: {type: Date, index: true},
    comment: String
  }]
});
  
BlogPostSchema.virtual('jtags').get(function() {
  return this.tags.join(',');
});

mongoose.model('BlogPost', BlogPostSchema);

mongoose.connect('mongodb://localhost/blog');

module.exports = {
  db: mongoose,
  User: mongoose.model('User'),
  BlogPost: mongoose.model('BlogPost')
};