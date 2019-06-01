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
          addNewteam();
          break;
        case "End Session":
          // ends the connection with mysql
          connection.end();
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
    // creates a table
    console.table(res);
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
  connection.query("SELECT * FROM products WHERE stock < 5", function(
    err,
    res
  ) {
    if (err) throw err;
    console.table(res);
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
          message: "Which team would you like to add?",
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
            // creates a variable with a reference that can't be changed
            // that's equal to stock plus what the user gave for quantity and makes it into a number
            const newQuantity = res[i].stock + parseInt(answer.quantity);
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
  console.log("Adding New Team");
  console.log("----------------");
  console.log("");
  inquirer
    .prompt([
      {
        name: "teamName",
        message: "What new team would you like to add?",
        type: "list",
        choices: displayTeam(res)
      },
      {
        name: "confereneName",
        message: "Which conference is the new team on?",
        choices: ["West", "East"]
      },
      {
        name: "price",
        message: "How much does the new team cost?",
        type: "input"
      },
      {
        name: "qty",
        message: "How many?",
        type: "input"
      }
    ])
    .then(function(answers) {
      connection.query("INSERT INTO products SET ?", function(err, res) {
        {
          team_name: answers.teamName;
          conference: answers.confereceName;
          price: answers.price;
          stock: answers.qty;
        }
      });
    });
  welcome();
}
