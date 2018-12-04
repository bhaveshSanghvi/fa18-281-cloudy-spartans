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


## Week-3 (24-Nov-2018 - 30-Nov-2018)

**Signup/Login API - Riak**  
SignUp/Login API deals with creating a new user, authenticating and authorizing the users based on their UserType.

The SignUp module of the API will add a user in bucket 'Users' with key as 'UserId' and value as other User details. A user can be an admin user or a guest user. Only admin user can add/delete items from catalog.
The Login module of the API authenticates the user based on the UserId and Password provided, and also authorizes based on the respective UserType in database.

A POST request will made for a user to sign up.  
Following is the POST body from front end SignUp page:  
```
{
	"Userid":"<unique id>",
	"email": "<email-id>",
	"UserType": "<admin/user>",
	"Password": "<password>"
}
```

A POST request will be made to take in the details provided while login.  
An internal GET request to the Riak database will fetch the corresponding UserId.  
Request body(UserId and password) of the POST request will be compared with the corresponding value of the User fetched from the Riak db for a successful login.  
Following is the POST body for Login request received from front end login page:  
```
{
	"Userid":"<userid>",
	"Password": "<password>"
}
```



