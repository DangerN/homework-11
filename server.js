var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Carolina1984$$",
  database: "company_db"
});

connection.connect(function(err) {
  if (err) throw err;
  start();
});


function start() {
  inquirer
    .prompt({
      name: "addStuff",
      type: "list",
      message: "Would you like to add? Department, role, or employee?",
      choices: ["Department", "role", "employee"]
    })
    .then(function(answer) {
      if (answer.addStuff === "Department") {
        addDepartment();
      }
      else if(answer.addStuff === "role") {
        addRole();
      } else{
        addEmployee();
      }
    });
}

// function to add department into the table
function addDepartment() {
  // prompt for info about waht he wants to add (department, role, or employee)
  inquirer
    .prompt([
      {
        name: "department",
        type: "input",
        message: "What is the department you would like to add?"
      }
    ])
    .then(function(answer) {
      // when finished prompting, insert a new item into the db with that info
      connection.query(
        "INSERT INTO department SET ?",
        {
          name: answer.department,
        },
        function(err) {
          if (err) throw err;
          console.log("Your department was created successfully!");
        //   start();
        }
      );
    });
}

// function to add employee into the table
function addEmployee() {
    // prompt for info about waht he wants to add (department, role, or employee)
    inquirer
      .prompt([
        {
          name: "employeeFirstName",
          type: "input",
          message: "What is the first name of the employee you would like to add?"
        },
        {
            name: "employeeLastName",
            type: "input",
            message: "What is the last name of the employee you would like to add?"
          },
          {
            name: "employeeRoleId",
            type: "input",
            message: "What is the role Id of this employee?"
          },
          {
            name: "employeeManagerId",
            type: "input",
            message: "What is the manager Id of this employee?"
          }

      ])
      .then(function(answer) {
        // when finished prompting, insert a new employee into the db with that info
        connection.query(
          "INSERT INTO employee SET ?",
          {
            first_name: answer.employeeFirstName,
            last_name: answer.employeeLastName,
            role_id: answer.employeeRoleId,
            manager_idclear: answer.employeeManagerId,
          },
          function(err) {
            if (err) throw err;
            console.log("Your employee was added successfully!");
          //   start();
          }
        );
      });
  }

  // function to add role into the table
  function addRole() {
      // prompt for info about waht he wants to add (department, role, or employee)
      inquirer
        .prompt([
          {
            name: "roleTitle",
            type: "input",
            message: "What title would you like to add?"
          },
          {
              name: "salary",
              type: "input",
              message: "What is the salary for this role?"
            },
            {
              name: "departmentId",
              type: "input",
              message: "What is the departmentId of this role?"
            }
        ])
        .then(function(answer) {
          // when finished prompting, insert a new role into the db with that info
          connection.query(
            "INSERT INTO employee SET ?",
            {
              title: answer.roleTitle,
              salary: answer.salary,
              department_id: answer.departmentId,
                      },
            function(err) {
              if (err) throw err;
              console.log("Your role was added successfully!");
            //   start();
            }
          );
        });
    }
