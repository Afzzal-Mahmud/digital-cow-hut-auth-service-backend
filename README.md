## Table Of Content 

### 1. About this repositorie
### 2. Technology used to build this repositorie
### 3. Api End-Points
### 4. Pagination 
### 5. Response pattern on `CRUD` oparation
### 6. Error Handling
### 7. Live Url : https://digital-cow-hut-auth-navy.vercel.app/

### Online Cow Selling Backend for Eid Ul Adha

This is a Digital Cow Selling Website Auth Backend Where People Can Purches Cow Online And Also Trade Them With There Potential Customers. This Reposetory Could Solve The Hustle For User Who Is Looking For Buying Or Selling The Cow Without Actually Go To The Market. 

### Technology Stack:

- Use TypeScript as the programming language.
- Use Express.js as the web framework.
- Use Mongoose as the Object Data Modeling (ODM) and validation library for MongoDB.

### Application Routes:

   #### User
   - api/v1/auth/signup (POST)
   - api/v1/users (GET)
   - api/v1/users/64c9d34bce80771106f5c5c2 (Single GET)
   - api/v1/users/64c9d34bce80771106f5c5c2 (PATCH)
   - api/v1/users/64c9d3ccce80771106f5c5c6 (DELETE)

   #### Cows
   - api/v1/cows (POST)
   - api/v1/cows (GET)
   - api/v1/cows/64c9d479ce80771106f5c5cb (Single GET) 
   - api/v1/cows/64c9d479ce80771106f5c5cb (PATCH)
   - api/v1/cows/64c9d521ce80771106f5c5d0 (DELETE) 

   ### Pagination and Filtering routes of Cows

   - api/v1/cows?page=1&limit=10
   - api/v1/cows?sortBy=price&sortOrder=asc
   - api/v1/cows/?minPrice=50000&maxPrice=60000&sortBy=price&sortOrder=asc&category=Beef
   - api/v1/cows?minPrice=20000&maxPrice=70000
   - api/v1/cows?location=Chattogram
   - api/v1/cows?searchTerm=Cha
     
  
   #### Orders
   - api/v1/orders (POST)
   - api/v1/orders (GET)

### Model:

### User Model:
- _id
- phoneNumber
- role   → enums → [‘seller’,’ buyer’]
- password 
- name	
   - firstName
   - lastName
- address
- budget → Savings for buying the cow
- income → money from selling the cow
- createdAt
- updatedAt


### Sample Data: (User as Buyer)
```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
  "password":"userPassword@123",
  "role": "buyer",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":70000,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```

### Sample Data: (User as Seller)
```json
{
  "_id":"ObjectId(“6473c6a50c56d0d40b9bb6a3)",  
  "password":"abrakadabra",
  "role": "seller",
   "name":{
      "firstName": "Mr. Babull"
      "lastName": "Bro"
    },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":0,
  "income":0,
  "createdAt":"",
  "updatedAt":"",
}
```

### Cow Model:

- name: The name of the cow.
- age: The age of the cow in years.
- price: The price of the cow.
- location: Enums of location
  - Dhaka
  - Chattogram
  - Barishal
  - Rajshahi
  - Sylhet
  - Comilla
  - Rangpur
  - Mymensingh

- breed: The breed of the cow
  - Brahman 
  - Nellore 
  - Sahiwal 
  - Gir 
  - Indigenous 
  - Tharparkar 
  - Kankrej 

- weight: The weight of the cow in kilograms.
- label: The enums of the label.
  - for sale → Default value
  - sold out

- category: An enum representing the category of the cow.
  - Dairy = "Dairy",  // Represents cows bred primarily for milk production.
  - Beef = "Beef", // Represents cows bred primarily for meat production.
  - DualPurpose = "Dual Purpose", // Represents cows bred for both milk and meat production.

- seller: A reference ID that identifies the seller of the cow, allowing for tracking and association with the seller's information.

### Sample Data: (Cow)

```json
{
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "ObjectId(609c17fc1281bb001f523456)"
}

```


## Implement Create, Read, Update, and Delete Operations for Users Listing

### Create a new User 

 Route:  /api/v1/auth/signup (POST)
 
 Request body:
 
 ```json
 {
  "password":"abrakadabra",
  "role": "buyer",
   "name": {
     "firstName": "Kopa",
      "lastName": "Samsu"
   },
  "phoneNumber":"01711111111",
  "address": "Chattogram",
  "budget":30000  // money to buy the cow
  "income":0 // By Default 0
}
```
 
 Response: The newly created user object.
 
 Response Sample Pattern:

```json
 {
      "success": true, 
      "statusCode":200,
      "message": "Users created successfully",
      "data": {}, 
  }
```

           
### Get All Users

 Route:  /api/v1/users (GET)
 
 Request body:
 
 Response: The user's array of objects.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Users retrieved successfully",
      "data": [{},{}], 
  }
```


### Get a Single User

Route:  /api/v1/users/:id (GET)

Request Param: :id

Response: The specified user object.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "User retrieved successfully",
      "data": {}, 
  }
  ```

### Update a Single User

 Route:  /api/v1/users/:id (PATCH)
 
 Request Param: :id
 
 Response: The updated user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "User updated successfully",
      "data": {}, 
  }
  ```
  
  ### Delete a User

 Route:  /api/v1/users/:id ( DELETE)
 
 Request Param: :id
 
 Response:  The deleted user object.
 
 Response Sample Pattern:
 
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Uers deleted successfully",
      "data": {}, 
  }
```

## Implement Create, Read, Update, and Delete Operations for COW listings.

### Create a New Cow

 Route:  /api/v1/cows (POST)

Request body:

```json
 {
  "name": "Bella",
  "age": 4,
  "price": 5000,
  "location": "Dhaka",
  "breed": "Brahman",
  "weight": 400,
  "label": "for sale",
  "category": "Beef",
  "seller": "609c17fc1281bb001f523456"
}

```
 
 Response: The newly created cow object.

 Response Sample Pattern:

```json
 {
      "success": true, 
      "statusCode":200,
      "message": "Cow created successfully",
      "data": {}, 
  }
```
           
### Get All Cows

 Route:  /api/v1/cows (GET)

 Request body:

 Response: The cows array of objects.

 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        "count":1050
        }
      "data": [{},{}] , 
  }
  ```


### Retrieve paginated and filtered cow listings: ( You do not need to implement pagination as we implemented, you can do as you want )

Route:  /api/v1/cows?

Query parameters:  (Case Insensitive)
- page: The page number for pagination (e.g., ?page=1).
- limit: The number of cow listings per page (e.g., ?limit=10).
- sortBy: The field to sort the cow listings (e.g., ?sortBy=price).
- sortOrder : The order of sorting, either 'asc' or 'desc' (e.g., ?sortOrder=asc).
- minPrice: The minimum price for filtering (e.g., ?minPrice=1000).
- maxPrice: The maximum price for filtering (e.g., ?maxPrice=5000).
- location: The location for filtering (e.g., ?location=chattogram).
- searchTerm: The search query string for searching cows (e.g., ?query=Dhaka). (Search Fields should be location, breed, and category) 

Response: An array of cow listing objects that match the provided filters, limited to the specified page and limit.

Response Sample Pattern:
```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cows retrieved successfully",
      "meta": {
        "page": 3,
        "limit": 10,
        }
      "data": [{},{}], 
  }
```


### Get a Single Cow

Route:  /api/v1/cows/:id (GET)

Request Param: :id

Response: The specified cow object.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow retrieved successfully",
      "data": {}, 
  }
```


### Update a Single Cow

 Route:  /api/v1/cows/:id (PATCH)
 
 Request Param: :id
 
 Response: The updated cow object.

 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow updated successfully",
      "data": {}, 
  }

```  
### Delete a Cow

 Route:  /api/v1/cows/:id ( DELETE)
 
 Request Param: :id
 
 Response: The deleted cow object
 
 Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Cow deleted successfully",
      "data": {}, 
  }
```

#3 Bonus Part : ( 10 Marks )
     
### Implement Create, Read Operations for Order History Listings.

Route:  /api/v1/orders  (POST)

Request body:

```json
{

  "cow":"64c9d8a5ce80771106f5c5f1", // cow reference _id
  "buyer":"64c9d74dce80771106f5c5e1", // user reference  _id
}
```

Response: The  newly created order object.

Implement a transactional operation for buying a cow.  When a user requests to buy a cow, simulate a `transaction` process without involving an actual payment gateway. Upon successful transaction simulation, update the cow's status as sold, transfer money from buyer to seller account, and provide appropriate response messages.

Steps:

- The user initiates a purchase order using the "api/v1/orders" POST API.
- Check that the user has enough money in their account to buy the cow.
- If the user needs more money, show them an error message.
- If the user has enough money, begin the buying process (start a transaction). This involves a few steps:
- Change the cow's label from 'for sale' to 'sold out'.
- Deduct the cost of the cow from the buyer's budget
- Put the same amount of  cost into the seller's income
- Make an entry in the orders collection
- Commit transaction
- End transaction session
- If any error happens abort the transaction 



Route:  /api/v1/orders  (GET)

Request body:

Response: The ordered array of objects.

Response Sample Pattern:

```json
  {
      "success": true, 
      "statusCode":200,
      "message": "Orders retrieved successfully",
      "data": {}, 
  }
```

### Error Handling:

Implement proper error handling throughout the application.
Use global error handling `middleware` to catch and handle errors, providing appropriate error responses with status codes and error messages.

Error Response Object Should include the following properties:
- success  →  false
- message → Error Type → Validation Error, Cast Error, Duplicate Entry
- errorMessages 
- stack

### Sample Error Response

```json
   {
    "success": false,
    "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }",
    "errorMessages": [
        {
            "path": "",
            "message": "E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }"
        }
    ],
    "stack": "MongoServerError: E11000 duplicate key error collection: univerity-management.students index: email_1 dup key: { email: \"user2@gmail.com\" }\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\operations\\insert.ts:85:25\n    at H:\\next-level-development\\university-management-auth-service\\node_modules\\mongodb\\src\\cmap\\connection_pool.ts:574:11\n    at H:\\next-level-development\\university-writeOrBuffer (node:internal/streams/writable:391:12)"
}
```