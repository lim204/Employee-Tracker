USE employees;

INSERT INTO department (name)
values
('Sales'),
('Engineering'), 
('legal'), 
('Finance'); 
 

INSERT INTO role (title,salary,department_id)
values
('sales lead', 10000, 1), 
('salesperson', 80000, 1), 
('lead Engineer', 150000, 2), 
('software engineer', 120000, 2),
('legal team lead', 250000, 3), 
('lawyer', 190000, 3),
('accountant', 125000, 4);

INSERT INTO employee (first_name,last_name,role_id,manager_id)
values
('John','Doe', 1, NULL), 
('Mike','Chan',3, NULL), 
('Ashley','Rodriguez', 4, 2), 
('Kevin','Tuptk', 6, NULL),
('Malia','Brown', 2, 1), 
('Sarah','Lound', 2, 1),
('Tom','Allen', 2, 1);

