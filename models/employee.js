const mongoose = require("mongoose");
const credentials = require("../lib/credentials");

// local db connection settings 
// const ip = process.env.ip || '127.0.0.1';
// const connectionString = 'mongodb://' +ip+ '/<DB_NAME>';

mongoose.connect(credentials.connectionString, { dbName: 'sccprojects', useNewUrlParser: true }); 
mongoose.set('useFindAndModify', false);
mongoose.connection.on('open', () => {
  console.log('Mongoose connected.');
});

// define employee model in JSON key/value pairs
// values indicate the data type of each key
const mySchema = mongoose.Schema({
 title: { type: String, required: true },
 firstName: String,
 lastName: String,
 startDate: Date,
 status: String
}); 

module.exports = mongoose.model('Employee', mySchema);
