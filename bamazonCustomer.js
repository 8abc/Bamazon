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

connection.query("SELECT * FROM products", function(err, res) {
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
          name: "count"
        }
      ])
      .then(function(answers) {
        for (var i = 0; i < res.length; i++) {
          if ((answers.team = res[i].team_id)) {
            if (answers.count < res[i].stock) {
              console.log(
                "Insufficient quantity!\n" +
                  "\n We have " +
                  res[i].stock +
                  "available"
              );
              connection.end();
            } else {
              var newCount = res[i].stock - answers.count;
              var charged = res[i].price * answers.count;
              var name = res[i].team_name;
              var id = res[i].team_id;

              connnection.query(
                "UPDATE products SET ? WHERE ?",
                [{ stock: newCount }, { team_id: id }],
                function(err, res) {
                  if (err) throw err;
                  console.log("Purchase :" + name + "\n");
                  console.log("Total: " + charged + "\n");
                  console.log("Left in Stock: " + newCount + "/n");
                  connection.end();
                }
              );
            }
          }
        }
      });
  };
  shopping();
});
