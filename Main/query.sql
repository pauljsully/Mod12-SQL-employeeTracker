-- Add a column to store the manager's name
ALTER TABLE employee ADD COLUMN manager_name VARCHAR(60);


UPDATE employee e
JOIN employee m ON e.manager_id = m.id
SET e.manager_name = CONCAT(m.first_name, ' ', m.last_name);

SELECT 
    employee.id AS "ID",
    employee.first_name AS 'First Name',
    employee.last_name AS 'Last Name',
    roles.title AS 'Role Title',
    roles.salary AS 'Salary',
    employee.manager_name AS 'Manager Name'
FROM employee
JOIN roles ON employee.role_id = roles.id;


