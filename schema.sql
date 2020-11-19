DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;

CREATE TABLE department(
	id INTEGER NOT NULL auto_increment,
    name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE role(
	id INTEGER NOT NULL auto_increment,
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
