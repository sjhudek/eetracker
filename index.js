import inquirer from "inquirer";
import { Sequelize, DataTypes } from "sequelize";
import * as database from "./database.js";
import dotenv from "dotenv";
dotenv.config();


// Create Sequelize instance
const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, // Disable logging of queries and results
});

const Department = sequelize.define("department", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Role = sequelize.define("role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync models with database
sequelize
  .sync()
  .then(() => { 
    // console.log("Database & tables created!");
    startApp();
  })
  .catch((error) => {
    console.error("Error creating database tables:", error);
  });


  let databaseCreated = false;


// Start the application
async function startApp() {
  try {
    // Sync models with database
    await sequelize.authenticate();
    await sequelize.sync();

    if (!databaseCreated) {
      // console.log("Database & tables created!");
      databaseCreated = true;
      displayOptions(); // Move this line here
    }
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}


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
          viewAllRoles();
          break;
        case "3":
          viewAllEmployees();
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
  Department.findAll()
    .then((departments) => {
      console.log("\nAll Departments:");
      departments.forEach((department) => {
        console.log(`ID: ${department.id}, Name: ${department.name}`);
      });
      displayOptions();
    })
    .catch((error) => {
      console.error("Error retrieving departments:", error);
      displayOptions();
    });
}

// Option 2: View all roles
function viewAllRoles() {
  Role.findAll()
    .then((roles) => {
      console.log("\nAll Roles:");
      roles.forEach((role) => {
        console.log(
          `ID: ${role.id}, Title: ${role.title}, Salary: ${role.salary}`
        );
      });
      displayOptions();
    })
    .catch((error) => {
      console.error("Error retrieving roles:", error);
      displayOptions();
    });
}

// Option 3: View all employees
function viewAllEmployees() {
  Employee.findAll()
    .then((employees) => {
      console.log("\nAll Employees:");
      employees.forEach((employee) => {
        console.log(
          `ID: ${employee.id}, Name: ${employee.firstName} ${employee.lastName}`
        );
      });
      displayOptions();
    })
    .catch((error) => {
      console.error("Error retrieving employees:", error);
      displayOptions();
    });
}

// Option 4: Add a department
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the department name: ",
      },
    ])
    .then((answers) => {
      const { name } = answers;
      Department.create({ name })
        .then(() => {
          console.log("Department added successfully!");
          displayOptions();
        })
        .catch((error) => {
          console.error("Error adding department:", error);
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
        name: "title",
        message: "Enter the role title: ",
      },
      {
        type: "input",
        name: "salary",
        message: "Enter the role salary: ",
      },
    ])
    .then((answers) => {
      const { title, salary } = answers;
      Role.create({ title, salary })
        .then(() => {
          console.log("Role added successfully!");
          displayOptions();
        })
        .catch((error) => {
          console.error("Error adding role:", error);
          displayOptions();
        });
    });
}

// Option 6: Add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "Enter the employee first name: ",
      },
      {
        type: "input",
        name: "lastName",
        message: "Enter the employee last name: ",
      },
    ])
    .then((answers) => {
      const { firstName, lastName } = answers;
      Employee.create({ firstName, lastName })
        .then(() => {
          console.log("Employee added successfully!");
          displayOptions();
        })
        .catch((error) => {
          console.error("Error adding employee:", error);
          displayOptions();
        });
    });
}

// Option 7: Update an employee role
function updateEmployeeRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "employeeId",
        message: "Enter the employee ID: ",
      },
      {
        type: "input",
        name: "roleId",
        message: "Enter the new role ID: ",
      },
    ])
    .then((answers) => {
      const { employeeId, roleId } = answers;
      Employee.findByPk(employeeId)
        .then((employee) => {
          if (!employee) {
            console.log("Employee not found!");
            displayOptions();
          } else {
            Role.findByPk(roleId)
              .then((role) => {
                if (!role) {
                  console.log("Role not found!");
                  displayOptions();
                } else {
                  employee
                    .setRole(role)
                    .then(() => {
                      console.log("Employee role updated successfully!");
                      displayOptions();
                    })
                    .catch((error) => {
                      console.error("Error updating employee role:", error);
                      displayOptions();
                    });
                }
              })
              .catch((error) => {
                console.error("Error retrieving role:", error);
                displayOptions();
              });
          }
        })
        .catch((error) => {
          console.error("Error retrieving employee:", error);
          displayOptions();
        });
    });
}

startApp();
