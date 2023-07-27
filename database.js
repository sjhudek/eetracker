import mysql from "mysql2";

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  })
  .promise();

export async function getAllDepartments() {
  const [rows] = await pool.query("SELECT * FROM department");
  return rows;
}

export async function getDepartmentById(id) {
  const [rows] = await pool.query("SELECT * FROM department WHERE id = ?", [
    id,
  ]);
  return rows[0];
}

// function to create a new employee
export async function createEmployee(firstName, lastName, roleId, managerId) {
  const [result] = await pool.query(
    "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
    [firstName, lastName, roleId, managerId]
  );
  const id = result.insertId;
  return getEmployeeById(id);
}

// Function to get all employees
export async function getAllEmployee() {
  const [rows] = await pool.query("SELECT * FROM employee");
  return rows;
}

// Function to get an employee by first name
export async function getEmployeeByFirstName(firstName) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE first_name = ?", [firstName]);
  return rows;
}

// Function to get an employee by last name
export async function getEmployeeByLastName(lastName) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE last_name = ?", [lastName]);
  return rows;
}

// Function to get an employee by ID
export async function getEmployeeById(id) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE id = ?", [id]);
  return rows;
}

// Function to get an employee by manager id
export async function getEmployeeByManagerId(managerId) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE manager_id = ?", [managerId]);
  return rows;
}

// Function to get an employee by role id
export async function getEmployeeByRoleId(roleId) {
  const [rows] = await pool.query("SELECT * FROM employee WHERE role_id = ?", [roleId]);
  return rows;
}

// Function to get all roles
export async function getAllRole() {
  const [rows] = await pool.query("SELECT * FROM role");
  return rows;
}

// Function to get a role by ID
export async function getRoleById(id) {
  const [rows] = await pool.query("SELECT * FROM role WHERE id = ?", [id]);
  return rows[0];
}

// Function to get a role by title
export async function getRoleByTitle(title) {
  const [rows] = await pool.query("SELECT * FROM role WHERE title = ?", [
    title,
  ]);
  return rows[0];
}

// Function to get all roles by salary
export async function getRolesBySalary(salary) {
    const [rows] = await pool.query(
      "SELECT * FROM role WHERE salary = ?",
      [salary]
    );
    return rows;
  }

// Function to get all roles by department ID
export async function getRolesByDepartmentId(department_id) {
  const [rows] = await pool.query(
    "SELECT * FROM role WHERE department_id = ?",
    [department_id]
  );
  return rows;
}

// Function to create a new role
export async function createRole(title, salary, department_id) {
  const [result] = await pool.query(
    "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
    [title, salary, department_id]
  );
  const id = result.insertId;
  return getRoleById(id);
}
