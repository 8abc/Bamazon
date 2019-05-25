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

var display = function() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log("---------------------");
    console.log("-------BAMAZON-------");
    console.log("---------------------");
    console.log("---------------------");
    console.log("Select a team below:");
    console.log("---------------------");
  });
};
// connection.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected");
//   processOrder("bed", 3);
//   //   run a function after connection is made to prompt ths user
// });

// function processOrder(item, quantity) {
//   console.log(item);
//   connection.query(
//     `SELECT * FROM products where (?)`,
//     { product_name: item },
//     // checks the error in the query and gives data
//     function(err, inventory) {
//       console.log(inventory[0]);
//     }
//   );
// }
