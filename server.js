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

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    init();
})

init = () => {
    
}