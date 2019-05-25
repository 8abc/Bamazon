-- Starting fresh in a new database
DROP DATABASE IF EXISTS bamazon_DB;
-- Creating a database
CREATE DATABASE bamazon_DB;
-- Utilizing the database
USE bamazon_DB;
-- Creating a product table
CREATE TABLE products
(
  team_id INT
  AUTO_INCREMENT NOT NULL,
  team_name VARCHAR
  (40),
  conference VARCHAR
  (45),
  price DECIMAL
  (65,2) NOT NULL,
  stock INT
  (20) NOT NULL,
  primary key
  (team_id)
);

  -- populating the table with 10 products
  INSERT INTO products
    (team_name,conference,price,stock)
  VALUES
    ('Golden State Warriors', 'West', 80000, 3),
    ('Los Angeles Lakes', 'West', 30000, 6),
    ('Toronto Raptors', 'East', 60000, 4),
    ('Brooklyn Nets', 'East', 20000, 5),
    ('Sacamento Kings', 'West', 10000, 9),
    ('Boston Celtics', 'East', 50000, 1),
    ('Houston Rockets', 'West', 40000, 2),
    ('Milwaukee Bucks', 'East', 70000, 8),
    ('Los Angeles Clippers', 'West', 30000, 7),
    ('Chicago Bulls', 'East', 60000, 4);


  SELECT *
  FROM products;


