//packages
const express = require('express');
const inquirer = require('inquirer');
const mysql2 = require('mysql2');

const logger = require('morgan');

const app = express();

//mysql connection
 mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'employees'
},
    console.log('connecting successful...')
);

//connect and check for err
app.listen(3001, () =>
    console.log(`App is ruuning on http://localhost:3001`));


// inquirer prompt for start action    
     start()

function start() {
    inquirer
        .prompt([{
            type: 'list',
            message: 'what would you like to do?',
            name: 'choices',
            choices: [
               'view all departments',
               'view all roles',
               'view all employees',
               'add a department',
               'add a role',
               'add an employee',
               'update an emploment role',
               'Exit'],
        },
        ]).then((answers) => {
            const {choices} = answers;
            if (choices === 'view all departments'){
                showDepartments ();
            }
            if (choices === 'view all roles'){
                showRoles ();
            }
            if (choices === 'view all employees'){
                showEmployees ();
            }
            if (choices === 'add a department'){
                addDepartment ();
            }
            if (choices === 'add a role'){
                addRole ();
            }
            if (choices === 'add an employee'){
                addEmployee ();
            }
            if (choices === 'update an emploment role'){
                updateEmployee ();
            }
            if (choices === 'exit'){
                connection.end()
            };

        });
};
showDepartments = () => {
    console.log ('showing all department... \n');
    const sql = `SELECT department.id AS id, department.name AS department FROM department`;

    connection.promise().query(sql,(err,rows)=>{
        if (err)throw err;
        console.table(rows);
        start();
    });
};
// add department function
showRoles = () =>{
    console.log('showing all roles....\n');

    const sql =`SELECT role.id, role.title, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id`;

    connection.promise().query(sql,(err,rows)=>{
        if (err) throw err;
        console.table(rows);
        start();
    })
};
showEmployees = () =>{
    console.log('showing all employees....\n');

    const sql =`SELECT employee.id, 
    employee.first_name,
    employee.last_name, role.title, 
    department.name AS department, 
    role.salery,
    CONCAT (namager.first_name,"", nameager.last_name AS manager 
    FROM employee
        lEFT JOIN role ON employee.role_id = role.id,
        lEFT JOIN department ON department_id = department.id,
        lEFT JOIN employee namager ON employee.manager_id = manager.id)`;

    connection.promise().query(sql,(err,rows)=>{
        if (err) throw err;
        console.table(rows);
        start();
    })
};
// add a department function
addDepartment = () =>{
    inquirer 
        .prompt([
            {
                type: 'input',
                name: 'addDept',
                message: 'What department would you like to add',
                validate: addDept =>{
                    if (addDept){
                        return true;
                    }else{
                        console.log ('please enter a department');
                        return false;
                    }
                }
            }

        ])
        .then (answer =>{
            const sql = `INSERT INTO department (name)
            VALUES (?)`;
            connection.query(sql,answer.addDept,(err,result)=>{
                if (err) throw err;
                console.log ('Added' + answer.addDept + 'to departments');

                showDepartments ();
            });
        });
};