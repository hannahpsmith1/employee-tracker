DROP DATABASE IF EXISTS homework_DB;
CREATE DATABASE homework_DB;

USE homework_DB;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,3),
  department_id INT,
  PRIMARY KEY (id)
);


CREATE TABLE employee(
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(4) NOT NULL,
  manager_id INTEGER(4) DEFAULT 0,
  PRIMARY KEY (id)
);



