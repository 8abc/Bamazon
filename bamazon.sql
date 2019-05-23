-- Starting fresh in a new database
DROP DATABASE IF EXISTS bamazon_DB;
-- Creating a database
CREATE DATABASE bamazon_DB;
-- Utilizing the database
USE bamazon_DB;
-- Creating a product table
CREATE TABLE products
(
    item_id INT NOT NULL
    AUTO_INCREMENT,
    product_name VARCHAR
    (100) NOT NULL,
    department_name VARCHAR
    (100) NOT NULL,
    price INT NOT NULL, 
    stock_quantity INT NOT NULL
);

