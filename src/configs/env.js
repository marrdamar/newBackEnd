// module.exports = {
//     host : process.env.DB_HOST,
//     db : process.env.DB_NAME,
//     dbPort : process.env.DB_PORT,
//     user : process.env.DB_USER,
//     pwd : process.env.DB_PWD,
//     serverPort : process.env.SERVER_PORT,
//     jwtSecret : "FW14",
//     cloudName : process.env.CLOUD_NAME,
//     cloudKey : process.env.CLOUD_KEY,
//     cloudSecret : process.env.CLOUD_SECRET,
// }
// console.log(process.env.CLOUD_KEY)
// console.log(process.env.DB_HOST)
// console.log(process.env.DB_PORT)
// console.log(process.env.DB_USER)
// // console.log(process.env.cloudSecret)

require('dotenv').config();

module.exports = {
    host : process.env.DB_HOST,
    db : process.env.DB_NAME,
    dbPort : process.env.DB_PORT,
    user : process.env.DB_USER,
    pwd : process.env.DB_PWD,
    serverPort : process.env.SERVER_PORT,
    jwtSecret : process.env.JWT_SECRET,
    cloudName : process.env.CLOUD_NAME,
    cloudKey : process.env.CLOUD_KEY,
    cloudSecret : process.env.CLOUD_SECRET,
}

// console.log(process.env.DB_HOST)
// console.log(process.env.CLOUD_KEY)
// console.log(process.env.JWT_SECRET)