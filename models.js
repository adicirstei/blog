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
  comments: [{
    email: String,
    date: {type: Date, index: true},
    comment: String
  }]
});
  
BlogPostSchema.virtual('year').get(function() {
  return this.date.getYear();
});
BlogPostSchema.virtual('month').get(function() {
  return this.date.getMonth();
});
BlogPostSchema.virtual('day').get(function() {
  return this.date.getDate();
});  
BlogPostSchema.virtual('t').get(function() {
  return this.title.replace(/[^a-z]/gi, '-');
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