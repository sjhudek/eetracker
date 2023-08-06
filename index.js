const { Department, Role, Employee } = require("./database.js");
const database = require("./database.js");
const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require("console.table");
  
// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "030119Kent**",
  database: "employee_tracker",
});

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
          sequelize.close(); // Close the database connection before quitting
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
