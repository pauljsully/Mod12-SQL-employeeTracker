const mysql = require('mysql2');
const main = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'employee_db'
    },
    console.log(`Connected to the staff_db database.`)
);

const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
        {
            type: 'list',
            message: "What would you like to do?",
            name: 'selection',
            choices: [
                "View all employees",
                "Add an employee",
                "Update an employee role",
                "View all roles",
                "Add a role",
                "View all departments",
                "Add a department",
                "Quit!"
            ]
        }
    ])

    .then((data) => {
        switch (data.selection) {
            case "View all employees":
                viewAllEmployees();
                break;
            case "Add an employee":
                addEmployee();
                break;
            case "Update an employee role":
                updateRole();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "Add a role":
                addRoles();
                break;
            case "View all departments":
                viewAllDepartments();
                break;
            case "Add a department":
                addDepartment();
                break;
            case "Quit":
                quitThisJob();
                break;
        }
    })
};

promptUser();

