/* data.js -  
containing an array of at least 5 items (objects), where each item has at least 4 attributes 
an exported getAll method that returns all array items */

// Create array of 5 objects with 4 attributes each
const employees = [
    {firstName:'Michelle', lastName: 'Thomas', startDate:'10/22/2019', status:'fulltime'},
    {firstName:'Shelly', lastName: 'Randall', startDate:'01/02/2017', status:'partime'},
    {firstName:'David', lastName: 'Smith', startDate:'04/09/2015', status:'fulltime'},
    {firstName:'Ryan', lastName: 'Oconnor', startDate:'05/22/2019', status:'fulltime'}
    
];

// getAll method that returns all array items
exports.getAll = () => {
    return employees;
}

