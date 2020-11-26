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
        choices: ['Add employee', 'View department, role, or employee', 'Update employee role', 'Update employee manager', 'View employees by manager', 'Delete department, role, or employee', 'View total utilized budget of a department', 'Exit']
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
            case "Add employee":
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

const newEmployeeQs = [
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
    },
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
queryAdd = (employee, role, department) => {
    connection.query("INSERT INTO employee SET ?", employee, (err, res) => { //might be outside scope of the connection, cannot see database
        if (err) throw err;
        console.log(res.affectedRows + "successfully added");
        // init();
    });
    connection.query("INSERT INTO role SET ?", role, (err, res) => { //might be outside scope of the connection, cannot see database
        if (err) throw err;
        console.log(res.affectedRows + "successfully added");
        // init();
    });
    connection.query("INSERT INTO department SET ?", department, (err, res) => { //might be outside scope of the connection, cannot see database
        if (err) throw err;
        console.log(res.affectedRows + "successfully added");
        init();
    });
    
};
add = () => {
    inquirer.prompt(newEmployeeQs).then((res) => { //add specific questions for each if block
        // let csv;
        // const query = res.table;
        const newEmployee = {
            first_name: res.first,
            last_name: res.last,
            role_id: res.roleId,
            manager_id: res.managerId
        };
        const newRole = {
            id: res.roleId,
            title: res.title,
            salary: res.salary,
            department_id: res.department
        };
        const newDept = {
            name: res.department
        };
        queryAdd(newEmployee, newRole, newDept);
        // queryAdd("role", newRole);
        // queryAdd("department", newDept);
        // if (res.table === 'employee') {
        //     inquirer.prompt(employeeQs).then((res) => {
        //         const newEmployee = {
        //             first_name: res.first,
        //             last_name: res.last,
        //             role_id: res.roleId,
        //             manager_id: res.managerId
        //         }
        //         queryAdd(query, newEmployee);
        //         // const arr = [res.first, res.last, res.roleId, res.managerId];
                
        //     });
        // } else if (res.table === 'role') {
        //     inquirer.prompt(roleQs).then((res) => {
        //         const newRole = {
        //             title: res.title,
        //             salary: res.salary,
        //             department_id: res.department
        //         };
        //         queryAdd(query, newRole);
        //     });
        // } else if (res.table === 'department') {
        //     inquirer.prompt(deptQs).then((res) => {
        //         const newDept = {
        //             name: res.department
        //         };
        //         queryAdd(query, newDept);
        //     })
        // }
    });
};

const viewQs = [
    {
        type: 'input',
        message: 'Which employee would you like to view? (First and Last Name',
        name: 'employeeName'
    }
];
queryView = (first, last) => {
    connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id WHERE first_name = ? AND last_name = ?;", [first, last], (err, res) => {
        if (err) throw err; 
        console.table(res);
        init();
    })
}
view = () => {
    inquirer.prompt(viewQs).then((res) => {
        const temp = res.employeeName.split(" ");
        const firstName = temp[0];
        const lastName = temp[1];
        queryView(firstName, lastName);
    });
    // connection.query("SELECT * FROM employee WHERE ? = ?", [table, column, value], (err, res) => {
    //     if (err) throw err;
    //     console.table(res);
    //     init();
    //     // connection.end();
    // });
};

queryUpdate = (first, last, column, value) => {
    if (column === "Title" || column === "Salary") {
        let table = "role";
    } else {
        let table = "employee";
    }
    column = column.toLowerCase();
    connection.query(
        "UPDATE " + table + " JOIN role ON employee.role_id = role.id  SET ? = ? WHERE first_name = ? AND last_name = ?", [column, value, first, last], (err, res) => {
            if (err) throw err;
            console.log("You've updated " + first + " " + last);
            console.table(res);
        });
    //might need 2 queries. One to get the role_id from employee,
    //one to update the role columns based on role_id
};

const updateQs = [
    {
        type: 'input',
        message: "Whose data would you like to update? (first and last name)",
        name: 'name',
    },
    {
        type: 'list',
        message: 'What would you like to update?',
        name: 'column',
        choices: ['Title', 'Salary', 'Role ID', 'Manager ID']
    },
    {
        type: 'input',
        message: 'Enter your updated value:',
        name: 'value'
    }
];
updateEmployee = () => {
    inquirer.prompt(updateQs).then((res) => {
        const temp = res.name.split(" ");
        const first = temp[0];
        const last = temp[1];
        const col = res.column;
        const val = res.value;
        
        queryUpdate(first, last, col, val);
    });
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
const employeeByManagerQs = [
    {
        type: 'input',
        message: 'Enter the manager ID for the employees you want to view:',
        name: 'manager_id'
    }
]

queryByManager = (manager_id) => {
    connection.query("SELECT * FROM employee JOIN role ON employee.role_id = role.id WHERE manager_id = ?;", [manager_id], (err, res) => { 
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    });
};
employeesByManager = () => {
    inquirer.prompt(employeeByManagerQs).then((res) => {
        const manager_id = parseInt(res.manager_id);
        queryByManager(manager_id);
    });
};

const deleteQs = [
    {
        type: 'input',
        message: "Whose info would you like to delete?",
        name: 'name'
    }
];

queryDelete = (first, last) => {
    connection.query("DELETE * FROM employee WHERE first_name = ? AND last_name = ?", [first, last], (err, res) => {
        if (err) throw err;
        console.log(res.affectedRows + " was deleted!");
    });
    init();
};
deleteEntry = () => {
    inquirer.prompt(deleteQs).then((res) => {
        const name = res.name;
       
        let temp = name.split(" ");
        const first = temp[0];
        const last = temp[1];
        queryDelete(first, last);
    })
    connection.query("DELETE * FROM ?", [input], (err, res) => { //change query call
        if (err) throw err;
        console.table(res);
        init();
        // connection.end();
    })

}

budgetQs = [
    {
        type: 'input',
        message: 'Which department are you interested in seeing the total utilized budget?',
        name: 'dept'
    }
]
viewBudget = () => { 
    inquirer.prompt(budgetQs).then((res) => {

        connection.query("SELECT SUM(salary) FROM role WHERE department = ?"), [res.dept], (err, rez) => {
            if (err) throw err; 
            console.table(rez);
            init();
        }
    })
    
}