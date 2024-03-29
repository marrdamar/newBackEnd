## Description
This is backend that build with expressjs and postgresql. This project has included feature auth, users (profiles), product, promo, transaction.

## Demo
[CoffeeShop-BackEnd](https://new-back-end-hazel.vercel.app/)

## Built With
[![My Skills](https://skillicons.dev/icons?i=js)](https://www.javascript.com/)
[![My Skills](https://skillicons.dev/icons?i=express)](https://expressjs.com/)
[![My Skills](https://skillicons.dev/icons?i=nodejs)](https://nodejs.org/en)
[![My Skills](https://skillicons.dev/icons?i=postgres)](https://www.postgresql.org/)

## Requirements
This project need to install NodeJS.

## Windows Installation
First of all, after you installed NodeJS. initialize git to your project
```
$ git init
```
and then clone this repo 
```
$ git clone https://github.com/marrdamar/newBackEnd
$ cd newBackEnd on your directory root
```

## How To Run
1. Be sure you have to installed NodeJS
2. Go to your directory project
3. Create an ENV file on your project, add folowing
```
DB_HOST = "YOUR HOST"
DB_DATABASE = "YOUR DB NAME"
DB_PORT = "YOUR DB PORT"
DB_USER = "YOUR DB USER"
DB_PWD = "YOUR DB PASSWORD"
SERVER_PORT = "YOUR LOCALHOST"

JWT_SECRET = "YOUR SECRET JWT"

MONGO_PWD = "YOUR MONGO PASSWORD"
MONGO_DBNAME = "YOUR DB NAME"
MONGO_USER = "YOUR USERNAME MONGO"
MONGO_HOST = "YOUR MONGO HOST"

CLOUD_NAME = "YOUR CLOUDNAME"
CLOUD_KEY = "YOUR KEY CLOUD"
CLOUD_SECRET = "YOUR KEY SECRET CLOUD "
```
4. Start project
```
$ npm run dev
```

## Related Project
[CoffeeShop-ReactJS](https://coffeeshop-react-silk.vercel.app/)
[CoffeeShop-ReactNative]()

## Endpoints Call

|   Method  |             Endpoint              |  Remark   |
| --------- | --------------------------------- | --------- |
| AUTH      |                                   |           |
| POST      | /auth                             | Login     |
| POST      | /auth/register                    | Register  |
| PATCH     | /auth/forgot                      | ForgotPass|
| PATCH     | /auth/editpassbyforgot            | EditPass  |
| PATCH     | /auth/logout                      | Logout    |
| --------- | --------------------------------- | --------- |
| PRODUCTS  |                                   |           |
| GET       | /products                         | ListProd  |
| POST      | /products                         | AddProd   |
| GET       | /products/productId               | SingleProd|
| PATCH     | /products/cloud/productId         | EditProd  |
| PATCH     | /products/cloudimg/productId      | SingleImg |
| DELETE    | /products/productId               | DeleteProd|
| --------- | --------------------------------- | --------- |
| USERS     |                                   |           |
| GET       | /users                            | ListUser  |
| GET       | /users/userId                     | SingleUser|
| PATCH     | /users/userId                     | EditUser  |
| DELETE    | /users/userId                     | DeleteUser|
| --------- | --------------------------------- | --------- |
| PROMO     |                                   |           |
| GET       | /promos                           | ListPromo |
| GET       | /promos/promoId                   |SinglePromo|
| POST      | /promos                           |  AddPromo |
| PATCH     | /promos/promoId                   | EditPromo |
| DELETE    | /users/userId                     | DeleteUser|
| --------- | --------------------------------- | --------- |
| TRANS     |                                   |           |
| GET       | /transactions                     | ListTrans |
| GET       | /transactions/getpaid             | PaidTrans |
| GET       | /transactions/getpending          | PendTrans |
| GET       | /transactions/getcancel           |CancelTrans|
| PATCH     | /transactions/setpaid             |   Paid    |
| GET       | /transactions/setcancel           |   Cancel  |

## Feedback
If you have question or any feedback, just contact me on email damaranggoro7@gmail.com