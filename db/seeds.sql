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