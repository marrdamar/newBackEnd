## Built With
[![My Skills](https://skillicons.dev/icons?i=js,express,nodejs,postgres)](https://skillicons.dev)

## Requirements
This project need to install NodeJS.

## Windows Installation
First of all, after you installed NodeJS. initialize git to your project
```
init git
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
| PATCH     | /products/productId               | EditProd  |
| DELETE    | /products/productId               | DeleteProd|
| --------- | --------------------------------- | --------- |
| USERS     |                                   |           |
| GET       | /users                            | ListUser  |
| GET       | /users/userId                     | SingleUser|
| PATCH     | /users/userId                     | EditUser  |
| DELETE    | /users/userId                     | DeleteUser|
| --------- | --------------------------------- | --------- |
| TRANS     |                                   |           |
| GET       | /transactions                     | ListTrans |
| GET       | /transactions/getpaid             | PaidTrans |
| GET       | /transactions/getpending          | PendTrans |
| GET       | /transactions/getcancel           |CancelTrans|
| PATCH     | /transactions/setpaid             |   Paid    |
| GET       | /transactions/setcancel           |   Cancel  |
