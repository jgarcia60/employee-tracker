const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Mickey19",
    database: "employees_db"
});

const questions = [
    {
        type: 'list',
        message: 'What would you like to do?',
        name: 'option',
        choices: ['Add department, role, or employee', 'View department, role, or employee', 'Update employee role', 'Update employee manager', 'View employees by manager', 'Delete department, role, or employee', 'View total utilized budget of a department', 'Exit']
    }
]

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id" + connection.threadId);
    // afterConnection();
    init();
    // connection.end(); //place this on the ending function call
})

// afterConnection = () => {
//     connection.query("SELECT * FROM employee", (err, res) => {
//         if (err) throw err; 
//         console.table(res);
//         connection.end();
//     })
// }
init = () => {
    inquirer.prompt(questions).then((res) => {
        //if you want to add an employee
        switch(res.option) {
            case "Add department, role, or employee":
                // const testObj = {first_name: "Annika", last_name: "Garcia", role_id: 70, manager_id: 2}
                add();
                // queryAdd(testObj);
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
            case "Exit":
                console.log("You have exited the application");
                connection.end();
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

const tableType = [
    {
        type: 'list',
        message: 'Which object are you wanting to add?',
        name: 'table',
        choices: ['employee', 'role', 'department']
    }
]

//INSERT INTO ...
//employee(first, last, role manager)
//role(title, salary, department)
//department(department)
const employeeQs = [
    {
        type: 'input',
        message: "What is the employee's first name?",
        name: 'first'
    },
    {
        type: 'input',
        message: "What is the employee's last name?",
        name: 'last'
    },
    {
        type: 'input',
        message: "What is the employee's role ID?",
        name: 'roleId'
    },
    {
        type: 'input',
        message: "What is the employee's manager's ID?",
        name: 'managerId'
    }
];
const roleQs = [
    {
        type: 'input',
        message: "What is the employee's title?",
        name : 'title'
    },
    {
        type: 'input',
        message: "What is the employee's salary?",
        name: 'salary'
    },
    {
        type: 'input',
        message: "What is the employee's department?",
        name: 'department'
    }
];
const deptQs = [
    {
        type: 'input',
        message: "What is the employee's department?",
        name: 'department'
    }
];
queryAdd = (type, object) => {
    connection.query("INSERT INTO " + type + " SET ?", object, (err, res) => { //might be outside scope of the connection, cannot see database
        if (err) throw err;
        console.log(res.affectedRows + "successfully added");
        init();
    });
}
add = () => {
    inquirer.prompt(tableType).then((res) => { //add specific questions for each if block
        let csv;
        const query = res.table;
        if (res.table === 'employee') {
            inquirer.prompt(employeeQs).then((res) => {
                const newEmployee = {
                    first_name: res.first,
                    last_name: res.last,
                    role_id: res.roleId,
                    manager_id: res.managerId
                }
                queryAdd(query, newEmployee);
                // const arr = [res.first, res.last, res.roleId, res.managerId];
                
            });
        } else if (res.table === 'role') {
            inquirer.prompt(roleQs).then((res) => {
                const newRole = {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.department
                };
                queryAdd(query, newRole);
            });
        } else if (res.table === 'department') {
            inquirer.prompt(deptQs).then((res) => {
                const newDept = {
                    name: res.department
                };
                queryAdd(query, newDept);
            })
        }
    });
};

view = (input) => {
    connection.query("SELECT * FROM ?", [input], (err, res) => {
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    })

}

updateEmployee = (input) => {
    connection.query("SELECT * FROM ?", [input], (err, res) => { //change query call
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    })

}

updateManager = (input) => {

    connection.query("SELECT * FROM ?", [input], (err, res) => { //change query call
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    })

}

employeesByManager = () => {

    connection.query("SELECT * FROM ?", [input], (err, res) => { //change query call
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    })

}

deleteEntry = () => {

    connection.query("SELECT * FROM ?", [input], (err, res) => { //change query call
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    })

}