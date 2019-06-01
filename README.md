# Bamazon
---
This application is a command line storefront that has two interfaces for a customer and manager.

- **Builty With:** Node.js, MySql, Javascript
 - **Packages Used:** require, mysql, inquirer, console.table
 
 ### How it Works ###
 
 #### Customer ####
 
 ```node bamazonCustomer.js```
 
 
  The app prompts users with two messages:
  1. Ask for the ID of the team they would like to buy.
  2. Ask how many teams they would like to buy.

Once the customer has placed the order, the app will check if the store has enough teams to fullfill the customer's request.
If not, the app will return `Insufficient quantity!`, and then prevent the order from going through.

However, if your store _does_ have enough of the product, you should fulfill the customer's order.
This will update the SQL database to reflect the remaining quantity & show the customer the total cost of their purchase.

 <img width="643" alt="Screen Shot 2019-05-31 at 6 06 52 PM" src="https://user-images.githubusercontent.com/46228172/58744224-a4b38c80-83f4-11e9-8c37-8463efa7feec.png">

--

 #### Manager ####
 
```node bamazonManager.js```

The manager has a menu of options:
1. ```View Teams for Sale``` List available teams with names, prices, quantities

<img width="636" alt="Screen Shot 2019-05-31 at 6 09 17 PM" src="https://user-images.githubusercontent.com/46228172/58744233-bdbc3d80-83f4-11e9-98b3-a38564b43839.png">

2. ```View Low Inventory``` List all teams with an inventory count lower than five.

<img width="579" alt="Screen Shot 2019-05-31 at 6 09 42 PM" src="https://user-images.githubusercontent.com/46228172/58744239-c90f6900-83f4-11e9-98d0-402bcbb57a52.png">

3. ```Add to Inventory``` Displays a prompt that will let the manager add more teams that store has.

<img width="616" alt="Screen Shot 2019-05-31 at 6 10 40 PM" src="https://user-images.githubusercontent.com/46228172/58744247-d3316780-83f4-11e9-80d1-3bc21520094d.png">

4. ```Add New Team``` Allows the manager to add a completely new team to the store


