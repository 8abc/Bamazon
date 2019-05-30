// requires mysql node package
var mysql = require("mysql");
// requires inquirer package
var inquirer = require("inquirer");
// connects to mysql server and databases
var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});
connection.connect();
// function to display available teams
function display() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("---------------------");
    console.log("BAMAZON ");
    console.log("---------------------");
    console.log("Select Your Team Below: ");
    console.log("");
    for (var i = 0; i < res.length; i++) {
      console.log(
        "ID: " +
          res[i].team_id +
          "|" +
          "Team Name: " +
          res[i].team_name +
          "|" +
          "Conference: " +
          res[i].conference +
          "|" +
          "Price: " +
          res[i].price +
          "|" +
          "Stock: " +
          res[i].stock
      );
      console.log("----------------");
    }
  });
}
display();
// function to ask the user what team they would like to shop for
function shopping() {
  // connects to mysql servers and darabase
  connection.query("SELECT * FROM products", function(err, res) {
    // ask user what they want
    inquirer
      .prompt([
        {
          name: "id",
          message: "Enter the ID of the team you would like to purchase.",
          type: "input"
        },
        {
          name: "count",
          message: "How many would you like to buy? ",
          type: "input"
        }
      ])
      .then(function(answers) {
        for (var i = 0; i < res.length; i++) {
          // setting the first answer to = team_id
          if (answers.id == res[i].team_id) {
            // checking if the second answer is less than the stock we have available
            if (answers.count > res[i].stock) {
              console.log(
                "\nInsufficient quantity. \nOnly " +
                  res[i].stock +
                  " available. \n\nOrder was not placed.\n"
              );
              // stops the connection with mysql server and databse
              connection.end();
            } else {
              // subtracts the count the user wants from what we have in stock
              var newQuantity = res[i].stock - answers.count;
              // multiple the price with the count the user wants
              var charged = res[i].price * answers.count;
              // creates a variable name to use for console.logs
              var name = res[i].team_name;
              // creates a variable id to use for console.logs
              var id = res[i].team_id;

              connection.query(
                "UPDATE products SET ? WHERE ?",
                //updates mysql database
                [{ stock: newQuantity }, { team_id: id }],
                function(err, res) {
                  // if there's an error show the error
                  if (err) throw err;
                  console.log("\nPuchased: " + name);
                  console.log("Charged: $" + charged);
                  console.log("Left in Stock: " + newQuantity + "\n");
                  connection.end();
                }
              );
            }
          }
        }
      });
  });
}
shopping();
