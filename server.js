const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const logger = require('morgan');

const app = express();

//mysql connection
mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: "root",
    database: 'employees_db'
},
    console.log('connecting successful...')
);


app.listen(3001, () =>
    console.log(`App is ruuning on http://localhost:3001`));

function start() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to do?',
            name: 'action',
            choices: [
                'Add department',
                'Add employee',
                'Add role',
                'View by department',
                'View roles',
                'View employees',
                'Update employee roles',
                'Exit'
            ],
        }
        ]).then((answer) => {
            switch (answer.action) {
                case 'add Department':
                    addDepartment();
                    break;
                case 'add Employee':
                    addEmployee();
                    break;
                case 'add Role':
                    addRole();
                    break;
                case 'View by Department':
                    ViewByDepartment();
                    break;
                case 'view Role':
                    viewRole();
                    break;
                case 'Update employee roles':
                    updateEmployes();
                    break;
                default:
                    db.end();
                    break;
            }
        })
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input?',
            message: 'enter name of new department'
        }).then(({ name }) => {
            const query = 'insert into department(name) values (?)';
            db.query(query, name, (err, res) => {
                if (err) throw err;
                start();
            })
        })
}
function addEmployee() {
    db.query(
        'select * from employee', (err, empRes) => {
            const employees = empRes.map(employee => {
                return employee.first_name + '' + employee.last_name
            });
            db.query(
                'select * from role', (err, roleRes) => {
                    const roles = rolesRes.map(role => {
                        return role.title;
                    });
                    inquirer
                        .prompt([{
                            name: 'first_name',
                            type: 'input',
                            message: 'Enter the new employees first name:' 
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: 'Enter the new employees last name:' 
                        },
                        {
                            name: 'role_id',
                            type: 'list',
                            message: 'Choose the new employees role:',
                            choices: roles 
                        },
                        {
                            name: 'manager_id',
                            type: 'list',
                            message: 'Choose the new employee manager:',
                            choices: employee
                        }
                    ]).then ((res)=>{
                        const {first_name,last_name}= res;
                        const manager = empRes.filter (employee =>{
                            return employee.first_name +''+employee.last_name
                        })
                    })

                })
        }
    )
}


