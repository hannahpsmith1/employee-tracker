var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "homework_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    searchEmployees();
    // connection.query("SELECT * FROM homework_DB.department",function(err, res) {
    //           if (err) throw err;
    //           console.log(res);
    //         })
  });

  function searchEmployees() {
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
        "Update Department",
        "Update Role",
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

      case "Update Department":
        updateDepartment();
        break;
    
      case "Update Role":
        updateRole();
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
            connection.query(
              "INSERT INTO department SET ?",
              {
                // might not need answer.saldkfjaldkfj on the other side of :
                name: answer.add_department,
                // role_id: answer.emp_lastName,
                // role_id: answer.emp_role,
              },
              function(err) {
                if (err) throw err;
                console.log("Your department was created successfully!");
                // re-prompt the user for if they want to add employees
                addDepartment();
              }
            );
          });
      }
// }


    // create a entry in table for department 

function addRole(){
    // see above
};
function addEmployee() {
        // prompt for info about the item being put up for auction
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
            }
          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO employee SET ?",
              {
                // might not need answer.saldkfjaldkfj on the other side of :
                first_name: answer.emp_firName,
                role_id: answer.emp_lastName,
                role_id: answer.emp_role,
              },
              function(err) {
                if (err) throw err;
                console.log("Your employee was created successfully!");
                // re-prompt the user for if they want to add employees
                addEmployee();
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
function updateDepartment(){
    // update to table deaprtment
};
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