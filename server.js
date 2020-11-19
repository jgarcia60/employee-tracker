const mysql = require('mysql');
const inquirer = require('inquirer');
const { inherits } = require('util');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mickey19",
    databse: "employees_db"
});

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ['Add department, role, or employee', 'View department, role, or employee', 'Update employee role', 'Update employee manager', 'View employees by manager', 'Delete department, role, or employee', 'View total utilized budget of a department']
    }
]

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    init();
    connection.end(); //place this on the ending function call
})

init = () => {
    inquirer.prompt(questions).then((res) => {
        //if you want to add an employee
        switch(res.option) {
            case "Add department, role, or employee":
                add();
                break;
            case "View department, role, or employee":
                view();
                break;
            case "Update employee role":
                updateEmployee();
                break;
            case "Update employee manager":
                updateManager();
                break;
            case "View employees by manager":
                employeesByManager();
                break;
            case "Delete department, role, or employee":
                deleteEntry();
                break;
            case "View total utilized budget of a department":
                viewBudget();
                break;
        }

        //if you want to view an employee, role, or department

        //if you want to update employee roles

        //if you want to update employee managers

        //if you want to view employees by manager

        //if you want to delete departmentes, roles, or employees

        //if you want to view the total utilized budget of a department (combined salaries0)
        console.log(res.option);
    });
};

add = (input) => {

}

view = (input) => {

}

updateEmployee = (input) => {

}

updateManager = (input) => {

}

employeesByManager = () => {

}

deleteEntry = () => {

}