const { Department, Role, Employee } = require("./database.js");
const inquirer = require("inquirer");
const cTable = require('console.table');

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
      if (departments.length === 0) {
        console.log("No departments found.");
      } else {
        console.log("ID\tName");
        departments.forEach((department) => {
          console.log(`${department.id}\t${department.name}`);
        });
      }
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

async function startApp() {
  try {
    // Sync the defined models with the database
    await sequelize.sync();

    // Display the options menu
    displayOptions();
  } catch (error) {
    console.error("Error synchronizing database:", error);
  }
}

startApp();