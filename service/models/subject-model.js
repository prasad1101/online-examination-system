var mongoose = require('mongoose');

var Promise = require("bluebird");
// promise to mongoose
mongoose.Promise = Promise;
var Schema = mongoose.Schema;
// create schema less model
var subjectSchema = new Schema({/* mention schema here */}, { strict: false });
var subject = mongoose.model('subject', subjectSchema);

// make this available to our users in our Node applications
module.exports = subject;