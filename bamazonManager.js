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
          "Add a New Team",
          "End Session"
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
          break;
        case "End Session":
          console.log("Bye");
          break;
      }
    });
}
welcome();
// function to display available teams
function display() {
  connection.query("SELECT * FROM products", function(err, res) {
    console.log("---------------------");
    console.log("Teams for Sale");
    console.log("---------------------");
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
    welcome();
  });
}
// display();

// function to view low inventory
function lowInventory() {
  console.log("---------------------");
  console.log("Viewing Low Inventory");
  console.log("---------------------");
  console.log("");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    // loops throw the teams
    for (var i = 0; i < res.length; i++) {
      // checks for teams that have less than 5 in stock
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
    welcome();
  });
}

// function to add inventory, displays prompt to add another team and how much
function addInventory() {
  console.log("----------------");
  console.log("Adding to Inventory");
  console.log("----------------");
  console.log("");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "team",
          message: "Which Team ID would you like to add?",
          type: "list",
          choices: displayTeam(res)
        },
        {
          name: "quantity",
          message: "How many would you like to add?",
          type: "input"
        }
      ])
      .then(function(answer) {
        for (var i = 0; i < res.length; i++) {
          if (answer.team === res[i].team_name) {
            const newQuantity = res[i].stock + answer.quantity;
            connection.query(
              "UPDATE products SET ? WHERE ?",
              //updates mysql database
              [{ stock: newQuantity }, { team_name: answer.team }],
              function(err, res) {
                // if there's an error show the error
                if (err) throw err;
                welcome();
              }
            );
          }
        }
      });
  });
}
function displayTeam(res) {
  var teams = [];
  for (var i = 0; i < res.length; i++) {
    teams.push(res[i].team_name);
  }
  return teams;
}

// allows manager to add a new team
function addNewteam() {
  console.log("----------------");
  console.log("Adding to Inventory");
  console.log("----------------");
  console.log("");
}
