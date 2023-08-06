DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department (id)
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT,
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);


INSERT INTO department (name)
VALUES ('Accounting'), ('Software'), ('Sales'), ('Legal');
  
INSERT INTO role (title, salary, department_id)
VALUES
  ('Accountant', 5000.00, 1),
  ('Software Engineer', 4000.00, 2),
  ('Software', 3500.00, 2),
  ('Sales Manager', 3500.00, 3),
  ('Sales', 3500.00, 3),
  ('Legal Team Lead', 3500.00, 4),
  ('Attorney', 3500.00, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Michael', 'Johnson', 3, NULL),
  ('Alfred', 'Neuman', 4, 3),
  ('Natalie', 'Attired', 5, NULL),
  ('John', 'Wayne', 6, 4),
  ('Sitting', 'Bull', 7, NULL);