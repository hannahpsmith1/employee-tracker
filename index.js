var mysql = require("mysql");
var inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const { restoreDefaultPrompts } = require("inquirer");

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
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Department",
        "View Role",
        "View Employee",
        "Update Employee"
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
      }
    });
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
              type: "input",
              message: "What is the employee role Id?",
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
      })
};

// need left join look at 05
function viewRole(){
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
    connection.query("SELECT manager_id FROM homework_DB.employee, homework_DB.role",function(err, res) {
        if (err) throw err;
        console.table(res);
      })

};

// apeending to existing tables
function updateEmployee(){
  inquirer
  .prompt([
    {
      name: "emp_id",
      type: "input",
      message: "what is the employee id?"
    },
    {
      name: "man_id",
      type: "input",
      message: "what is the new managers ID?"
    }
  ])
  .then(function(answer) {
    // when finished prompting, insert a new item into the db with that info
    connection.query("UPDATE department SET ? WHERE ?",
      [
        {
          manager_id: answer.man_id,
      },
      {
          id: answer.emp_id
      }
    ],
      function(err,res) {
        if (err) throw err;
        console.log(res.affectedRows +"Your employee was updated successfully!");
        console.table(res);
        // re-prompt the user for if they want to add employees
        startPrompt();
      }
    );
  });
}


function updateSongs() {
  console.log("updating song qualities");
  var query = connection.query(
      "UPDATE playlist SET ? WHERE ?",
      [
          {
              genre: "pop"
          },
          {
              title: "No Hope"
          }
      ],
      function(err, res) {
          console.log(res.affectedRows + "song updateed!");
          deleteSong();
      }
  );
  console.log(query.sql);
}
    // update to table deaprtment

function updateRole(){
    // see above but for table role
};
function updateEmployee(){

    // see above but for table employee
};

// fuction updateDepartment(){};
// fuction updateRole(){};
// fuction updateDepartment(){};


// function showSameYearArtists() {
//   connection.query(`SELECT topAlbums.year AS year, topAlbums.artist AS artist, song, album
//   FROM topAlbums
//   INNER JOIN top5000 ON topAlbums.artist = top5000.artist AND topAlbums.year = top5000.year
//   ORDER BY year ASC;`, function(err, res) {
//       if (err) throw err;
//       console.table(res);
//       promptUser();
//   });
// }