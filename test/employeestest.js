const expect = require("chai").expect;
const movies = require("../data");

const ListEmployees = employees.getAll();
//const getDetail = employees.getDetail();
//const addEmployee = employees.addEmployee();
//const deleteEmployee  = employees.deleteEmployee();

describe("Employee module", () => {
// Get Employee Details
    it("Returns requested employee", () => {
        const result = employees.getDetail("Michelle");
        expect(result).to.deep.equal({firstName: 'Michelle', lastName: 'Thomas', startDate: 10/22/2019, status: 'fulltime'});
    });

    it("Can't find employee", () => {
        const result = employees.getDetail("falseName");
        expect(result.msg).to.deep.equal("Employee not found");
    });
// Add Employee
    it("Adds an employee", () => { 
       const result = employees.addEmployee('Jesus', 'Christ', 10/10/1000, 'fulltime');
        expect(ListEmployees).to.deep.include({ firstName: 'Jesus', lastName: 'Christ', startDate: 10/10/1000, status: 'fulltime' });
    });

    it("Doesn't add employee", () => {
        const result = employees.addEmployee('Jesus', 'Christ'); 
        expect(ListEmployees).to.not.include({ firstName: 'Jesus', lastName: 'Christ', startDate: undefined, status: undefined  });
        expect (employees.addEmployee('Jesus', 'Christ').msg).to.deep.equal('Employee not added');
    });
// Delete Employee
    it("Deletes employee", () => {
        const result = employee.deleteEmployee('Shelly');
        expect(ListEmployees).to.not.include({firstName:'Shelly', lastName: 'Randall', startDate:'01/02/2017', status:'partime'});
    });

    it("Doesn't delete", () => {
       const result = employees.deleteEmployee('testName');
        expect(employees.deleteEmployee('testName').msg).to.deep.equal('Employee not found');
    })
});