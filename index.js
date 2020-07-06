/*index.js - with code to launch a node.js web server on port 3000 and respond to requests.
Should import your data.js module */

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
 ).listen(process.env.PORT || 3000);