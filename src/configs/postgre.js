const { Pool } = require("pg");
require('dotenv').config();
//client
//pool
const db = new Pool({
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    port : process.env.DB_PORT,
    user : process.env.DB_USER,
    password : process.env.DB_PWD,
});

// console.log(db)

module.exports = db;
