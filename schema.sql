DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
	id INTEGER NOT NULL,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INTEGER,
    PRIMARY KEY (id)
);

CREATE TABLE employee(
	id INTEGER NOT NULL auto_increment,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ("Annika", "Garcia", 70, 1);

INSERT INTO role(id, title, salary, department_id)
VALUES (70, "ABL Associate", 65000, 3);

SELECT * FROM employee JOIN role ON employee.role_id = role.id WHERE first_name = "Jonathan" AND last_name = "Garcia";

UPDATE employee
SET first_name = "Jonny", last_name = "G"
WHERE id=1;

UPDATE employee JOIN role ON employee.role_id = role.id SET salary = 90000 WHERE first_name = "Jonny" AND last_name = "G";