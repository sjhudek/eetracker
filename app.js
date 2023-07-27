import express from "express";

import { getAllDepartments, getDepartmentById } from "./database.js";

import {
  getAllRole,
  getRoleById,
  getRoleByTitle,
  getRolesByDepartmentId,
  createRole,
} from "./database.js";

import {
  getAllEmployee,
  getEmployeeById,
  getEmployeeByFirstName,
  getEmployeeByLastName,
  getEmployeeByRoleId,
  getEmployeeByManagerId,
  createEmployee,
} from "./database.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Welcome to the Employee Tracker API!");
  });

// Routes for department
app.get("/department", async (req, res) => {
  const department = await getAllDepartments();
  res.send(department);
});

app.get("/department/:id", async (req, res) => {
  const id = req.params.id;
  const department = await getDepartmentById(id);
  res.send(department);
});

// Routes for role
app.get("/role", async (req, res) => {
  const roles = await getAllRole();
  res.send(roles);
});

app.get("/role/:id", async (req, res) => {
  const id = req.params.id;
  const role = await getRoleById(id);
  res.send(role);
});

app.get("/role/title/:title", async (req, res) => {
  const title = req.params.title;
  const role = await getRoleByTitle(title);
  res.send(role);
});

app.get("/role/department/:department_id", async (req, res) => {
  const department_id = req.params.department_id;
  const role = await getRoleByDepartmentId(department_id);
  res.send(role);
});

app.post("/role", async (req, res) => {
  const { title, salary, department_id } = req.body;
  const role = await createRole(title, salary, department_id);
  res.status(201).send(role);
});

// Routes for employee
app.get("/employee", async (req, res) => {
  const employee = await getAllEmployee();
  res.send(employee);
});

app.get("/employee/:id", async (req, res) => {
  const id = req.params.id;
  const employee = await getEmployeeById(id);
  res.send(employee);
});

app.get("/employee/first_name/:first_name", async (req, res) => {
  const title = req.params.first_name;
  const employee = await getEmployeeByFirstName(first_name);
  res.send(employee);
});

app.get("/employee/last_name/:last_name", async (req, res) => {
  const department_id = req.params.last_name;
  const employee = await getEmployeeByLastName(role_id);
  res.send(employee);
});

app.get("/employee/role_id/:", async (req, res) => {
  const department_id = req.params.role_id;
  const employee = await getEmployeeByRoleId(role_id);
  res.send(employee);
});

app.get("/employee/manager_id/:manager_id", async (req, res) => {
    const department_id = req.params.manager_id;
    const employee = await getEmployeeByManagerId(manager_id);
    res.send(employee);
  });

app.post("/employee", async (req, res) => {
  const { title, salary, department_id } = req.body;
  const employee = await createEmployee(title, salary, department_id);
  res.status(201).send(employee);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke 💩");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
