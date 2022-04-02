var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	name: {type: String},
	surname: {type: String},
	username: {type: String},
	password: {type: String}
});

const user = mongoose.model('user', userSchema)

module.exports = user;