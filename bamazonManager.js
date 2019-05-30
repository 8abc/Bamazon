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
// function that allows the user to select what they want to do with swtch case statements
function welcome() {
  inquirer
    .prompt([
      {
        name: "toDo",
        message: "Select what you would like to do.",
        type: "list",
        choices: [
          "View Teams for Sale",
          "View Low Inventory",
          "Add to Inventory",
          "Add a New Team"
        ]
      }
    ])
    .then(function(answer) {
      switch (answer.toDo) {
        case "View Teams for Sale":
          display();
          break;
        case "View Low Inventory":
          lowInventory();
          break;
        case "Add to Inventory":
          addInventory();
          break;
        case "Add New Team":
          addTeam();
      }
    });
}
// function to display available teams
function display() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("---------------------");
    console.log("BAMAZON ");
    console.log("---------------------");
    console.log("Teams for Sale");
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

// function to view low inventory
function lowInventory() {
  console.log("---------------------");
  console.log("Viewing Low Inventory");
  console.log("---------------------");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      if (res[i].stock <= 5) {
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
    }
  });
}

lowInventory();
// function to add inventory
function addInventory() {}
// function to add new teams
function addTeam() {}
// function to end the sessions
function endSession() {}
