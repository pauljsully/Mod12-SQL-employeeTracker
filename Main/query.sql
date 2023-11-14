SELECT
    e.first_name,
    e.last_name,
    r.title AS role_title,
FROM employee e
JOIN roles r ON e.role_id = r.id;
