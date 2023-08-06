const { Department, Role, Employee } = require("./database.js");
const database = require("./database.js");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
require('dotenv').config();

const dbConfig = {
  host: process.env.DB_LOCALHOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Create a MySQL connection
const connection = mysql.createConnection(dbConfig);

// Display options menu
function displayOptions() {
  console.log(`
  Options:
  1. View all departments
  2. View all roles
  3. View all employees
  4. Add a department
  5. Add a role
  6. Add an employee
  7. Update an employee role
  8. Quit
  `);
  getUserInput();
}

// Get user input and process selected option
function getUserInput() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "option",
        message: "Enter the option number: ",
      },
    ])
    .then((answers) => {
      const { option } = answers;
      switch (option) {
        case "1":
          viewAllDepartments();
          break;
        case "2":
          viewAllRole();
          break;
        case "3":
          viewAllEmployee();
          break;
        case "4":
          addDepartment();
          break;
        case "5":
          addRole();
          break;
        case "6":
          addEmployee();
          break;
        case "7":
          updateEmployeeRole();
          break;
        case "8":
          console.log("Exiting the application...");
          connection.end();
          break;
        default:
          console.log("Invalid option!");
          displayOptions();
          break;
      }
    });
}

// Option 1: View all departments
function viewAllDepartments() {
  const query = "SELECT * FROM department";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving departments", err);
    } else {
      console.table(rows);
    }
    displayOptions();
  });
}

// Option 2: View all roles
function viewAllRole() {
  const query = "SELECT * FROM role";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving roles", err);
    } else {
      console.table(rows);
    }
    displayOptions();
  });
}

// Option 3: View all Employees
function viewAllEmployee() {
  const query = "SELECT * FROM employee";
  connection.query(query, (err, rows) => {
    if (err) {
      console.error("Error retrieving employees", err);
    } else {
      console.table(rows);
    }
    displayOptions();
  });
}

// Option 4: Add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "departmentName",
        message: "Enter the name of the department: ",
      },
    ])
    .then((answers) => {
      const { departmentName } = answers;
      const query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, [departmentName], (err, result) => {
        if (err) {
          console.error("Error adding department", err);
        } else {
          console.log("Department added successfully!");
        }
        displayOptions();
      });
    });
}

// Option 5: Add a role
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the role: ",
      },
    ])
    .then((answers) => {
      const { roleName } = answers;
      const query = "INSERT INTO role (title) VALUES (?)";
      connection.query(query, [roleName], (err, result) => {
        if (err) {
          console.error("Error adding role", err);
        } else {
          console.log("Role added successfully!");
        }
        displayOptions();
      });
    });
}

// Option 6: Add employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the employee: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee: ",
      },
    ])
    .then((answers) => {
      const { firstName, lastName } = answers;
      const query = "INSERT INTO employee (first_name, last_name) VALUES (?, ?)";
      connection.query(query, [firstName, lastName], (err, result) => {
        if (err) {
          console.error("Error adding employee", err);
        } else {
          console.log("Employee added successfully!");
        }
        displayOptions();
      });
    });
}

// Option 7: Update employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the first name of the employee: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the last name of the employee: ",
      },
      {
        type: "input",
        name: "roleName",
        message: "Enter the name of the new role: ",
      },
    ])
    .then((answers) => {
      const { firstName, lastName, roleName } = answers;
      const findRoleQuery = "SELECT id FROM role WHERE title = ?";
      connection.query(findRoleQuery, [roleName], (err, roleResults) => {
        if (err) {
          console.error("Error retrieving role", err);
          displayOptions();
        } else {
          if (roleResults.length === 0) {
            console.error(`Role '${roleName}' not found.`);
            displayOptions();
          } else {
            const newRoleId = roleResults[0].id;
            const updateQuery =
              "UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?";
            connection.query(
              updateQuery,
              [newRoleId, firstName, lastName],
              (err, result) => {
                if (err) {
                  console.error("Error updating employee role", err);
                } else {
                  console.log("Employee role updated successfully!");
                }
                displayOptions();
              }
            );
          }
        }
      });
    });
}

async function startApp() {
  try {
    // Connect to the database
    // await connectToDatabase();
    await connection.connect();

    // Display the options menu
    displayOptions();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

startApp();
