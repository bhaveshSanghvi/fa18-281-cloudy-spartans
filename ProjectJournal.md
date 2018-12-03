# Project Journal for Coffee with Cloudy Spartans

## Week-1 (10-Nov-2018 - 16-Nov-2018)
### Project Kick Off 

  - Decide on Problem Statement
  - Research on best practices
  - Divided the problem statement into different modules
  - Discussed the different tasks in each module 
  - Assigned each module to the respective team member
  - Decided on the Front End Application UI
  - Discussed on the Application architecture
  
### Challenges/Issues faced :
  - Need more research about the integration of individual microservices across multiple VPC's
  - Need to figure out the combination of databases
  
 ## Week-2 (17-Nov-2018 - 23-Nov-2018)

**Divided the application into four Microservices each to be developed by individual team member as follows:**    
 - Sign-up/Login API- Hansraj    
 - Display/Add items in Catalog API- Srinivas    
 - Place Order/Shopping Cart API- Preethi    
 - Order Processing/Payment API- Abhishek       

**Started with the Development of each of the Front End modules.**

**Finalized NOSQL DBs for individual APIs as follows:**    
 - Sign-up/Login API- Riak     
 - Display/Add items in Catalog API- Mongo    
 - Place Order/Shopping Cart API- Riak    
 - Order Processing/Payment API- Mongo    
 
**Means of Communication between APIs/Databases:**   
- Every API will reside on an instance in public subnet which in turn is able to communicate internally with the Private NOSQL Database instances of the same VPC.  

**Test Scenarios:**  
- Test Scenario 1: Communication between Cart API and Order Processing API to map the number of orders to process.
- Test Scenario 2:  Communicate the status of Order Processing from Order Processing API to Cart API in order to delete the cart.
- Test Scenario 3: Communication between the FrontEnd and Cart API to create/update order.
- Test Scenario 4: Communication between the FrontEnd and Catalog API to add/update items in catalog.
- Test Scenario 5: Communication between the FrontEnd and SignUp to Create/Validate a User.
- Test Scenario 6: Authorising an admin user from Login API to FrontEnd application for adding/editing an item in the catalog.




