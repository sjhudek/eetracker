CREATE DATABASE employee_tracker;
USE employee_tracker;

INSERT INTO department (id)
VALUES (1), (2), (3), (4);
  
INSERT INTO role (id, title, salary, department_id)
VALUES
  (1, 'Sales', 5000.00, 1),
  (2, 'Lead Engineer', 4000.00, 2),
  (3, 'Software Engineer', 3500.00, 2),
  (4, 'Account Manager', 3500.00, 3),
  (5, 'Accountant', 3500.00, 3),
  (6, 'Legal Team Lead', 3500.00, 4),
  (7, 'Attorney', 3500.00, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
  (1, 'John', 'Doe', 1, NULL),
  (2, 'Jane', 'Smith', 2, 1),
  (3, 'Michael', 'Johnson', 3, NULL),
  (4, 'Alfred', 'Neuman', 4, 3),
  (5, 'Natalie', 'Attired', 5, NULL),
  (6, 'John', 'Wayne', 6, 4),
  (7, 'Sitting', 'Bull', 7, NULL);
