-- Starting fresh in a new database
DROP DATABASE IF EXISTS bamazon_DB;
-- Creating a database
CREATE DATABASE bamazon_DB;
-- Utilizing the database
USE bamazon_DB;
-- Creating a product table
CREATE TABLE products
(
    item_id INT
    AUTO_INCREMENT NOT NULL,
  product_name VARCHAR
    (45) NOT NULL,
  department_name VARCHAR
    (45) NOT NULL,
  price DECIMAL
    (65,2) NOT NULL,
  stock_quantity INT
    (100) NOT NULL,
  primary key
    (item_id)
);
    -- populating the table with 10 products
    INSERT INTO products
        (product_name, department_name, price,stock_quantity)
    VALUES
        ('bed' , 'bedding', 1083.25, 8),
        ('tv', 'entertainment', 512.50, 23),
        ('couch', 'furniture', 803.00, 30),
        ('pillows', 'bedding', 479.75, 14),
        ('basketball', 'sports', 18.25, 50),
        ('laptop', 'entertainment',
            999.00, 26),
        ('chair', 'furniture', 10.25, 42),
        ('bike', 'sports', 30.50, 70),
        ('phone', 'entertainment', 8.00, 83);


    SELECT *
    FROM products;