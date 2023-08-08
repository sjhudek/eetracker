const mysql = require("mysql2");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

// const sequelize = new Sequelize("employee_tracker", "root", "030119Kent**", {
//   host: "localhost",
//   dialect: "mysql",
//   define: {
//     underscored: true, // Add this line
//   },
// });


const Department = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

// Function to get all departments
async function getAllDepartments() {
  try {
    const departments = await Department.findAll();
    return departments;
  } catch (error) {
    console.error("Error retrieving departments:", error);
    throw error; 
  }
}

async function getDepartmentById(id) {
  const [rows] = await pool.query("SELECT * FROM department WHERE id = ?", [
    id,
  ]);
  return rows[0];
}


// function to create a new employee
async function createEmployee(firstName, lastName, roleId, managerId) {
  const [result] = await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [firstName, lastName, roleId, managerId]
  );
  const id = result.insertId;
  return getEmployeeById(id);
}

// Function to get all employees
async function getAllEmployee() {
  const [rows] = await pool.query("SELECT * FROM employee");
  return rows;
}

// Function to get an employee by first name
async function getEmployeeByFirstName(firstName) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE first_name = ?", [firstName]);
  return rows;
}

// Function to get an employee by last name
async function getEmployeeByLastName(lastName) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE last_name = ?", [lastName]);
  return rows;
}

// Function to get an employee by ID
async function getEmployeeById(id) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
  return rows;
}

// Function to get an employee by manager id
async function getEmployeeByManagerId(managerId) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE manager_id = ?", [managerId]);
  return rows;
}

// Function to get an employee by role id
async function getEmployeeByRoleId(roleId) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE role_id = ?", [roleId]);
  return rows;
}

// Function to get all roles
async function getAllRole() {
  const [rows] = await pool.query("SELECT * FROM role");
  return rows;
}

// Function to get a role by ID
async function getRoleById(id) {
  const [rows] = await pool.query("SELECT * FROM role WHERE id = ?", [id]);
  return rows[0];
}

// Function to get a role by title
async function getRoleByTitle(title) {
  const [rows] = await pool.query("SELECT * FROM role WHERE title = ?", [
    title,
  ]);
  return rows[0];
}

// Function to get all roles by salary
async function getRolesBySalary(salary) {
    const [rows] = await pool.query(
      "SELECT * FROM role WHERE salary = ?",
      [salary]
    );
    return rows;
  }

// Function to get all roles by department ID
async function getRolesByDepartmentId(department_id) {
  const [rows] = await pool.query(
    "SELECT * FROM role WHERE department_id = ?",
    [department_id]
  );
  return rows;
}

// Function to create a new role
async function createRole(title, salary, department_id) {
  const [result] = await pool.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [title, salary, department_id]
  );
  const id = result.insertId;
  return getRoleById(id);
}

module.exports = {
  Department,
  getAllDepartments,
  getDepartmentById,
  createEmployee,
  getAllEmployee,
  getEmployeeByFirstName,
  getEmployeeByLastName,
  getEmployeeById,
  getEmployeeByManagerId,
  getEmployeeByRoleId,
  getAllRole,
  getRoleById,
  getRoleByTitle,
  getRolesBySalary,
  getRolesByDepartmentId,
  createRole,
};