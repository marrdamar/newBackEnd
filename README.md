[![My Skills](https://skillicons.dev/icons?i=js,express,nodejs,postgres)](https://skillicons.dev)
## Endpoints Call

|   Method  |             Endpoint              |  Remark   |
| --------- | --------------------------------- | --------- |
| AUTH      |                                   |           |
| POST      | /auth                             | Login     |
| POST      | /auth/register                    | Register  |
| PATCH     | /auth/forgot                      | ForgotPass|
| PATCH     | /auth/editpassbyforgot            | EditPass  |
| --------- | --------------------------------- | --------- |
| PRODUCTS  |                                   |           |
| GET       | /products                         | ListProd  |
| POST      | /products                         | AddProd   |
| GET       | /products/productId               | SingleProd|
| DELETE    | /products/productId               | DeleteProd|
| --------- | --------------------------------- | --------- |
| USERS     |                                   |           |
| GET       | /users                            | ListUser  |
| GET       | /users/userId                     | SingleUser|
| PATCH     | /users/userId                     | EditUser  |
| DELETE    | /users/userId                     | DeleteUser|
