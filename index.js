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
                "Add a Role",
                "Add an Employee",
                "Update an Employee Role",
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
        } else if (choice.selection === 'Add a Role') {
            db.query(`SELECT * FROM department`, (err, result) => {
                if (err) throw err;

                inquirer.prompt([
                    {
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
        } else if (choice.selection === 'Add an Employee') {
            db.query(`SELECT * FROM employee, roles`, (err, result) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'firstName',
                        message: 'What is the employees First Name?',
                        validate: firstNameInput => {
                            if (firstNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A First Name!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'input',
                        name: 'lastName',
                        message: 'What is the employees Last Name?',
                        validate: lastNameInput => {
                            if (lastNameInput) {
                                return true;
                            } else {
                                console.log('Please Add A Salary!');
                                return false;
                            }
                        }
                    },
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the employees role?',
                        choices: () => {
                            var array = [];
                            for (var i = 0; i < result.length; i++) {
                                array.push(result[i].title);
                            }
                            var newArray = [...new Set(array)];
                            return newArray;
                        }
                    },
                    {
                        type: 'input',
                        name: 'manager',
                        message: 'Who is the employees manager?',
                        validate: managerInput => {
                            if (managerInput) {
                                return true;
                            } else {
                                console.log('Please Add A Manager!');
                                return false;
                            }
                        }
                    }]).then((answer) => {
                        for (var i = 0; i < result.length; i++) {
                            if (result[i].title === answer.role) {
                                var role = result[i];
                            }
                        }
    
                        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`, [answer.firstName, answer.lastName, role.id, answer.manager.id], (err, result) => {
                            if (err) throw err;
                            console.log(`Added ${answer.firstName} ${answer.lastName} to the database.`)
                            promptUser();
                        });
                    })
        })
    }
        
    });
};
    
promptUser();
        

