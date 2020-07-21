/*  Second assignment:
    Convert your index.js code to use Express syntax,
Update your default route to show formatted information for each item in your data array:
create home.handlebars template
render this template for requests to your default route
pass your data array to the handlebars template
display the list of items in your data array 
each item is linked to your detail page with a query parameter identifying the item
*/
// Create variable for http and data
// Define express 

const express = require("express");
const bodyParser = require("body-parser");
const employees = require("./data");

const app = express();
const exphbs = require('express-handlebars');

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

//Route to home 
app.get('/', (req, res) => {
  res.render('home', {employees: ListEmployees});
});

//Route to the detail
app.get('/detail', (req, res) => {
  const firstName = req.query.firstName
  res.render('detail', {firstName:firstName, stats: employees.getDetail(firstName)});
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