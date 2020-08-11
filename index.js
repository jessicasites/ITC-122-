//Assignment 4 update your server's 'home' and 'detail' routes to use the new database 
//instead of your JavaScript data array. Your detail page should display details of the 
//requested item.
//Create a new server route to 'delete' an item from your database on request. 
//Your route should accept a request query parameter identifying the item to delete, 
//and should return a response indicating whether delete succeeded or failed.

// Create variable for http and data
// Define express 

const express = require("express");
const bodyParser = require("body-parser");
const employees = require("./data");

const app = express();
const exphbs = require('express-handlebars');
const employee = require("./models/employee");

app.engine('handlebars', exphbs({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

// Set location 
app.use(express.static(__dirname + '/public')); 

// Parse form submissions
app.use(bodyParser.urlencoded({extended: true})); 

// Create variable to get info from data.js
let ListEmployees = employees.getAll();
//let getDetail = employees.getDetail();
//let addEmployee = employees.addEmployee();
//let deleteEmployee  = employees.deleteEmployee();

//Route to home updated for assignment 4 
app.get('/', (req, res, next) => {
  return employees.find({}).lean()
  .then((employess) => {
    console.log(employees)
  res.render('home', {employees: ListEmployees});
})
.catch(err => next(err));
});

//Route to the detail
app.get('/detail', (req, res) => {
  const firstName = req.query.firstName
  employees.findOne({firstname: firstName }).lean()
  .then((employees) => {
    console.log(employees)
  res.render('detail', {firstName:firstName, stats: employees});
})
.catch(err => next(err));
});

// Route to delete
app.get('/delete', (req, res) => {
  const firstName = req.query.firstName;
  employees.findOneAndDelete({firstName: firstName}, (err, employee) => {
      if (err) {
          console.log(err);
      } else if (!employee) {
          console.log("Employee not found");
          res.send(`${firstName} not found`);
      } else if (employee) {
          console.log(firstName + " deleted");
          res.send(`${firstName} deleted`);
      }
  });
});
// Text response
app.get('/about', (req, res) => {
  res.type('text/plain');
  res.send('About page \n I am a student at SCCC');
});
    
// 404 message
app.use( (req, res) => {
  res.type('text/plain');
  res.status(404);
  res.send('404 - Not Found');
});

app.listen(app.get('port'), () => {
  console.log('Express started');
});

/*First assignment:  
index.js - with code to launch a node.js web server on port 3000 and respond to requests.
Should import your data.js module 

// Create variable for http and data
const http = require("http"); 
const employees = require('./data');

// Create variable to get info from data.js
let ListEmployees = employees.getAll();

// Create Server
http.createServer(function(req,res) {
     const path = req.url.toLowerCase();

// Create switch cases with different responses
       switch(path) {

          case '/':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Home page \n' + 'Array length: ' + ListEmployees.length);
            break;

          case '/about':
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('About page \n I am a student at SCCC');
            break;

          default:
            res.writeHead(404, {'Content-Type': 'text/plain'});
            res.end('Not found');
            break;
          }
    }
 ).listen(process.env.PORT || 3000); */