var mysql = require("mysql");
var inquirer = require("inquirer");
// var cTable = require("console.table");

// const Choices = require("inquirer/lib/objects/choices");
// const { restoreDefaultPrompts } = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "homework_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    startPrompt();

  });

  function startPrompt() {
    inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "Update Employee",
        // "Delete Employee",
        "End"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Add Department":
        addDepartment();
        break;

      case "Add Role":
        addRole();
        break;

      case "Add Employee":
        addEmployee();
        break;

      case "View Department":
        viewDepartment();
        break;

      case "View Role":
        viewRole();
        break;

      case "View Employee":
        viewEmployee();
        break;
            
      case "Update Employee":
        updateEmployee();
        break;

      // case "Delete Employee":
      //     deleteEmployee();
      //     break;

      case "End":
          endPrompt();
          break;
      }
    });
}

function endPrompt() {
  connection.end();
}

// department has no dependency, but role needs a department
function addDepartment(){
  inquirer
          .prompt([
            {
              name: "add_department",
              type: "input",
              message: "What is the department name?"
            }
          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query("INSERT INTO department SET ?",
              {
                name: answer.add_department,
              },
              function(err,res) {
                if (err) throw err;
                console.log(res.affectedRows +"Your department was created successfully!");
                // console.table(homework_db.department)
                console.table(res);
                // re-prompt the user for if they want to add employees
                
                startPrompt();
              }
            );
          });
      }
// }



function addRole(){
  inquirer
          .prompt([
            {
              name: "add_title",
              type: "input",
              message: "title of role would you like to add?"
            },
            {
              name: "add_salary",
              type: "input",
              message: "What is the salary for this role?"
            },
            {
              name: "add_departmentid",
              type: "input",
              message: "which department ID does this to belong to?"
              // choices: []
              // I want this to be a list of the options that are coming from the table
            }

          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO role SET ?",
              {

                title: answer.add_title,
                salary: answer.add_salary,
                department_id: answer.add_departmentid
                // role_id: answer.emp_lastName,
                // role_id: answer.emp_role,
              },
              function(err, res) {
                if (err) throw err;
                console.log("Your role was created successfully!");
                console.table(res)
                // re-prompt the user for if they want to add employees
                startPrompt();
              }
            );
          });

    // see above
};


function addEmployee() {
        inquirer
          .prompt([
            {
              name: "emp_firName",
              type: "input",
              message: "What is the first name of the employee?"
            },
            {
                // reference to 30 rock paule lasname lolololoolol
              name: "emp_lastName",
              type: "input",
              message: "What is the last name of the employee?",
            },
            {
              name: "emp_role",
              type:"input",
              // type: "list",
              // choices: function(){
              //   var roleArray = [];
              //   for(var i=0; i <res.length; i++){
              //     roleArray.push(res[i].title);
              //   }
              //   return roleArray;
              // },
              message: "What is the employee's role Id?",
            },
            {
              name: "emp_manager",
              type: "input",
              message: "what is your manager's id",
            }
          ])
          .then(function(answer) {
            connection.query(
              "INSERT INTO employee SET ?",
              {
                // might not need answer.saldkfjaldkfj on the other side of :
                first_name: answer.emp_firName,
                last_name: answer.emp_lastName,
                role_id: answer.emp_role,
                manager_id: answer.emp_manager,
              },
              function(err, res) {
                if (err) throw err;
                console.log("Your employee was created successfully!");
                console.table(res)
                startPrompt();
              }
            );
          });
      }
// }


// reading from table department and role (and/or employee)
function viewDepartment(){
    // console.log(department.name)
    connection.query("SELECT * FROM homework_DB.department",function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
      })
};

// need left join look at 05
function viewRole(){
  connection.query("SELECT * FROM department LEFT JOIN role ON department.id = role.id", 
  // "SELECT department.id, department.name FROM department INNER JOIN role on role.id = department.id", 
  function(err, res){
    if (err) throw err;
    console.table(res);
    startPrompt();
  })

//     -- LEFT JOIN returns all of the values from the left table, and the matching ones from the right table
// SELECT title, firstName, lastName
// FROM books
// LEFT JOIN authors ON books.authorId = authors.id;

    // for ( var i=0; i<role.length; i++){
        
    // }
};

// Need inner? Join
//     SELECT title, firstName, lastName
// FROM books
// INNER JOIN authors ON books.authorId = authors.id;
function viewEmployee(){
    connection.query("SELECT employee.first_name, employee.last_name, employee.manager_id, role.title, role.department_id FROM employee LEFT JOIN role ON employee.id = role.id", function(err, res) {
        if (err) throw err;

        // trying to be able to search by user

        // inquirer
        // prompt ([
        //   {
        //     name:"employee_id",
        //     type:"input",
        //     message: "what is the employee's ID number"
        //   }
        // ])
        // .then(function(answer){
        //   [
        //     {
        //       id: answer.employee_id
        //     }
        //   ]
        // })
        console.table(res);
        startPrompt();
      })

};


function updateEmployee() {
  var employee_search = `SELECT * FROM employee;`;
  connection.query(employee_search, function(err, res) {
    if (err) throw err;
    
    var employee_names = res.map(employee=> { 
      return (employee.first_name + " " + employee.last_name) ; });
    
    var updateQ = [
      {
          name: "name",
          type: "list",
          message: "Which employee?",
          choices: employee_names
      }];
  inquirer
  .prompt(updateQ).then(answers => {
        var role_query = `SELECT * FROM role;`;
        var emp_index = employee_names.indexOf(answers.name);
        var emp_id = res[emp_index].id;

         connection.query(role_query, function(err, res) {
             if (err) throw err;
             var roles = res.map(role=>{ 
               return role.title; });
                   console.table(roles);
                   startPrompt();
                  });

               });
            });
       };

  

