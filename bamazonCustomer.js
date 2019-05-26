// requires mysql node package
var mysql = require("mysql");
// requires inquirer package
var inquirer = require("inquirer");
// requires clitable package
var Table = require("cli-table");
// connects to mysql server and databases
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  //   port: 5432,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "bamazon_DB"
});
connection.connect();
// function to display available teams
var display = function() {
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
};
display();

// function to ask the user what they want to shop for
var shopping = function() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Enter the ID of the team you would like to purchase.",
        name: "team"
      },

      {
        type: "input",
        message: "How many would you like to buy?",
        name: "password"
      },
      // Here we ask the user to confirm.
      {
        type: "confirm",
        message: "Are you sure?x",
        name: "confirm",
        default: true
      }
    ])
    .then(function(inquirerResponse) {
      if (inquirerResponse.confirm) {
        console.log("\nWelcome " + inquirerResponse.username);
        console.log(
          "Your " + inquirerResponse.pokemon + " is ready for battle!\n"
        );
      } else {
        console.log(
          "\nThat's okay " +
            inquirerResponse.username +
            ", come again when you are more sure.\n"
        );
      }
    });
};
shopping();
