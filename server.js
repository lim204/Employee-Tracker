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
               'add a department',
               'Exit'],
        },
        ]).then((answer) => {
            
        
        })
}
// add department function
function addDepartment() {
    inquirer
        .prompt({
            name: 'name',
            type: 'input',
            message: 'enter name of new department'
        }).then(({ name }) => {
            const query = 'insert into department(name) values (?)';
            db.query(query, name, (err, res) => {
                if (err) throw err;
                start();
            })
        })
}

// add employee function
function addEmployee() {
    db.query(
        'select * from employee', (err, empRes) => {
            const employees = empRes.map(employee => {
                return employee.first_name + '' + employee.last_name
            });
            db.query(
                'select * from role', (err, roleRes) => {
                    const roles = roleRes.map(role => {
                        return role.title;
                    });
                    inquirer
                        .prompt([{
                            name: 'first_name',
                            type: 'input',
                            message: 'Enter the new employee\'s first name:'
                        },
                        {
                            name: 'last_name',
                            type: 'input',
                            message: 'Enter the new employee\'s last name:'
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
                            choices: employees
                        }
                        ]).then((res) => {
                            const { first_name, last_name } = res;
                            const manager = empRes.filter(employee => {
                                return employee.first_name + '' + employee.last_name === res.manager;
                            })[0];
                            const role_id = roleRes.filter(role => {
                                return role.title === res.role;
                            })[0];
                            const manager_id = manager ? manager.id : null
                            db.query('insert into employee set ?',
                                {
                                    first_name, last_name, role_id, manager_id
                                }, (err, result) => {
                                    if (err) throw err;
                                }
                            )
                          start ();
                        })

                })
        }
    )
}
//add role function
function addRole(){
    db.query (
        'select * from department', (err,result => {
            if (err)throw err;
            const departments = result.map (department = department.name);
            inquirer
                .prompt([
                    {
                        name: 'title',
                        type: 'input',
                        message: 'Please enter title of new role:'
                    },
                    {
                        name: 'salary',
                        type: 'input',
                        message: 'Please enter salary of new role:',
                        vallidate: salary => {
                            if (isNaN (salary) || salary < 0) {
                                return 'please enter a number'
                            }
                            return true;
                        }
                    },
                    {
                        name:'departmnet',
                        type: 'list',
                        message: 'what department is it in?',
                        choice: departments
                    }
                ]).then ((res) =>{
                    const {title} = res ;
                    const salary = res.salary;
                    const department_id = res.department_id;
                })[0];
                db.query(
                    'insert into role set ?',
                    {
                        title,salary,department_id
                    },
                    (err,result) => {
                        if (err) throw err;
                        start();
                    }
                )
        })
    )
}

//view department function
function ViewByDepartment (){
    const query = 'selecct * from department';
    db.query (query,(err,res)=>{
        if (err) throw err;
        console.log (table(toTableFormat(res)));
        start();
    });
};
//view roles function
function viewRoles () {
    const query = 'select * from role';
    db.query(query, (err,res)=>{
        if  (err) throw err;
        console.log (table(toTableFormat(res)));
        start();
    });
};
//view employees function
function viewEmployees(){
    const query = 'select * from employee';
    db.query(query, (err,res)=>{
        if  (err) throw err;
        console.log (table(toTableFormat(res)));
        start();
    });
};
//uopdate employee roles
function updateEmpRoles(){
    const query = 'select *from employee';
    db.query(query, (err,res)=>{
        const employees = res.map(employee => {
            return employee.first_name + '' + employee.last_name;
        });
        db.query('select * from role', (err,result)=>{
            const roles = result.map (role =>{
                return role.title;
            });
            inquirer
                .prompt ([
                    {
                        type:'list',
                        name: 'employee',
                        message: 'which employee\'s role do you want to update?',
                        choice: employees   
                    },
                    {
                        type:'list',
                        name: 'role',
                        message: 'what\'s employee\'s new role ?',
                        choice: roles  
                    },
                ]).then (answer =>{
                    const id = result.filter(employee =>{
                        return employee.first_name + '' + empployee.last_name === answer.employee;  
                    }) [0]
                    db.query (
                        'update employee set role_id = ? where id =?', [role_id,id],(err, result) => {
                            if  (err) throw err;
                            start ();
                        }
                    )
                })
        })
    })
}
 //table format
 function toTableFormat (arr){
    const header = Object.keys (arr [0]);
    const rows = arr.map(obj => Object.values (obj));
    return [header,...rows];
 }