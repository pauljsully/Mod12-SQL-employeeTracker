const inquirer = require('inquirer');
const db = require('./Main/connection');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'selection',
            choices: [
                "View All Departments",
                "View All Employees",
                "View all roles",
                "Add a role",
                "Add an employee",
                "Update an employee role",
                "Add a department",
                "Quit!"
            ]
        }
    ])
    .then((choice) => {
        if (choice.selection === "View All Employees") {
            db.query(
                
        `SELECT 
            employee.id AS "ID",
            employee.first_name AS 'First Name',
            employee.last_name AS 'Last Name',
            roles.title AS 'Role Title',
            roles.salary AS 'Salary',
            employee.manager_name AS 'Manager Name'
        FROM employee
        JOIN roles ON employee.role_id = roles.id;`, 
        
        (err, result) => {
                if (err) throw err;
                console.log("Viewing All Employees: ");
                console.table(result);
                promptUser();
            });
        } else if (choice.selection === 'View All Departments') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                promptUser();
            });
        } else if (choice.selection === 'View all roles') {
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                promptUser();
            });
        } else if (choice.selection === 'View all roles') {
            db.query(`SELECT * FROM roles`, (err, result) => {
                if (err) throw err;
                console.log("Viewing All Departments: ");
                console.table(result);
                promptUser();
            });
        }
       
    });
};


promptUser();

