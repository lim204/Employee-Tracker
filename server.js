//packages
const inquirer = require('inquirer');
const mysql2 = require('mysql2');
// const { exit } = require('process');

//mysql connection
 const  db = mysql2.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'employees_db'
},
    console.log('connecting successful...')
);

const util = require('util')
db.query = util.promisify(db.query)


// inquirer prompt for start action    
     start();

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
               'update an emploment role'],
            //    'Exit'],
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
            // if (choices === 'exit'){
            //     connection.end()
            // };

        });
};
showDepartments = async() => {
    console.log ('showing all department... \n');
    const sql = `SELECT * FROM department`;

    const result = await db.query(sql);
    console.table(result)
    start();
};

// add department function
showRoles = async () => {
    console.log('showing all roles....\n');
    const sql =`SELECT * FROM role`;
    const result = await db.query(sql);
    console.table(result)
    start();
};

showEmployees = async () => {
    console.log('showing all employees....\n');
    const sql =`SELECT * FROM employee`;
    const result = await db.query(sql);
    console.table(result)
    start();
};


// need to review from here 
// showEmployees = () =>{
//     console.log('showing all employees....\n');

//     const sql =`SELECT employee.id, 
//     employee.first_name,
//     employee.last_name, role.title, 
//     department.name AS department, 
//     role.salery,
//     CONCAT (namager.first_name,"", nameager.last_name AS manager 
//     FROM employee
//         lEFT JOIN role ON employee.role_id = role.id,
//         lEFT JOIN department ON department_id = department.id,
//         lEFT JOIN employee namager ON employee.manager_id = manager.id)`;

//     connection.promise().query(sql,(err,rows)=>{
//         if (err) throw err;
//         console.table(rows);
//         start();
//     })
// };




// // add a department
// addDepartment = async () => {
//     console.log('Please add a new Department\n');
//     const sql =`INSERT INTO department`;
//     const result = await db.query(sql);
//     inquirer.prompt([{
//         name: "department_name",
//         type: "input",
//         message: "Please enter the name of the department you want to add to the database."
//     }])
//     console.table(result)
//     start();
// };
// add a department function
addDepartment = async() =>{
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
        const result = await db.query(sql);
        const sql = `INSERT INTO department (name)
            VALUES (?)`;
            connection.query(sql,answer.addDept,(err,result)=>{
                if (err) throw err;
                console.log ('Added' + answer.addDept + 'to departments');

                showDepartments ();
            });
};

// add a role  function
addRole = ()=> {
    inquirer.prompt([
        {type:'input',
        name:'role',
        message: 'What role do you want to add',
        validate: addRole => {
            if (addRole){
                return true;
            }else{
                console.log('please enter a role');
                return false;
            }
        }
    },
    {
        type:'input',
        name: 'salary',
        message:'what is the salary of this role',
        validate:addSalary =>{
            if (isNaN(addSalary)){
                return true;
            }else{
                console.log('please enter a salary');
                return false;
            }
        }
    }
    ]).then (answer =>{
        const params = [answer.role, answer.salary];
    })
}