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
                "Add a Department",
                "Add a role",
                "Add an employee",
                "Update an employee role",
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
            db.query(

            `SELECT 
                roles.id AS "ID",
                roles.title AS 'Role',
                roles.salary AS 'Salary',
                department.department_name AS 'Department Name'
            FROM roles
            JOIN department ON roles.department_id = department.id`,

             (err, result) => {
                if (err) throw err;
                console.log("Viewing All Roles: ");
                console.table(result);
                promptUser();
            });
        } else if (choice.selection === 'Add a Department') {

            
           return inquirer.prompt([{
                // Adding a Department
                type: 'input',
                name: 'department',
                message: 'What is the name of the department?',
                validate: departmentInput => {
                    if (departmentInput) {
                        return true;
                    } else {
                        console.log('Please Add A Department!');
                        return false;
                    }
                }
            }]).then((answer) => {
                db.query(`INSERT INTO department (department_name) VALUES (?)`, [answer.department], (err, result) => {
                    if (err) {
                        console.error('Error adding department:', err);
                    } else {
                        console.log(`Added ${answer.department} to the database.`);
                    }
        
                    promptUser();
                });
            });
        } else if (choice.selection === 'Add a role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
                        // Adding A Role
                        type: 'input',
                        name: 'role',
                        message: 'What is the name of the role?',
                        validate: roleInput => {
                            if (roleInput) {
                                return true;
                            } else {
                                console.log('Please Add A Role!');
                                return false;
                            }
                        }
                    },
                    {
                        // Adding the Salary
                        type: 'input',
                        name: 'salary',
                        message: 'What is the salary of the role?',
                        validate: salaryInput => {
                            if (salaryInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        // Department
                        type: 'list',
                        name: 'department',
                        message: 'Which department does the role belong to?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].department_name);
                            }
                            return array;
                        }
                    }
                ]).then((answer) => {
                    // Comparing the result and storing it into the variable
                    for (var i = 0; i < result.length; i++) {
                        if (result[i].department_name === answer.department) {
                            var department = result[i];
                        }
                    }

                    db.query(`INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`, [answer.role, answer.salary, department.id], (err, result) => {
                        if (err) throw err;
                        console.log(`Added ${answer.role} to the database.`)
                        promptUser();
                    });
                })
            });
        } else if
        
    });
};
    
        promptUser();
        

