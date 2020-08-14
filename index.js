//Create a new React-based home page

// Create variable for http and data
// Define express 

const express = require("express");
const bodyParser = require("body-parser");
//const employees = require("./data");
const app = express();
const exphbs = require('express-handlebars');
const employees = require("./models/employee");

app.engine('handlebars', exphbs({
    defaultLayout: false
}));

app.set('view engine', 'handlebars');
app.use('/api', require('cors')());

app.set('port', process.env.PORT || 3000);

// Set location 
app.use(express.static(__dirname + '/public')); 

// Parse form submissions
app.use(bodyParser.urlencoded({extended: true})); 

// Create variable to get info from data.js
//let ListEmployees = employees.getAll();
//let getDetail = employees.getDetail();
//let addEmployee = employees.addEmployee();
//let deleteEmployee  = employees.deleteEmployee();

//API Routes 
app.get('/api/employees', (req, res) => {
  return employees.find({}).lean()
    .then((employees) => {
        res.json(emloyees)
    })
    .catch(err => {res.status(500).send('Error occurred: database error.')})
})

app.get('/api/details', (req, res) => {
  return employees.findOne({firstName:req.query.firstName}).lean()
  .then((employees) => {
    res.json(employees);
  })
  .catch(err => res.status(500).send('Error occurred: database error.'));
});

app.post('/api/employees/:firstName', (req, res) => {
  const employeeName = req.params.firstName;
  employees.findOneAndUpdate({firstName: employeeName}, req.body, {upsert: true, new: true})
  .then(employee => {
      res.json(employee)
  })
  .catch(err => {
      res.status(500).send('Error occurred: dabatase error', err)
  })
})

app.delete('/api/employees/:firstName', (req, res) => {
  const employeeName = req.params.firstName; 
  employees.findOneAndDelete({firstName: employeeName})
  .then(employee => {
      if(employee === null) {
          return res.status(400).send(`Error: "${employeeName}" not found`)   
      } else {
          res.json(employee)}
  })

  .catch(err => {
      res.status(500).send('Dabatase error', err)
  })
})

//res.json(employees.map((a) => {
  //return {
    //firstName: a.firstName,
    //lastName: a.lastName,
    //startDate: a.startDate,
   // status: a.status
 // }
//})
//);

//Route to home updated for assignment 6
app.get('/', (req, res, next) => {
  employees.find((err,employees) => {
  console.log(employees)
  if (err) return next(err);
  //res.render('home', {employees});
  res.render('home_react', {employees: JSON.stringify(employees)});
});
});

//Route to the detail
app.get('/detail', (req, res) => {
  const firstName = req.query.firstName;
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