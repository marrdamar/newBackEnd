const { Pool } = require("pg");
//client
//pool
const db = new Pool({
    host : "db.laivsmpxukdwmzrhttpa.supabase.co",
    database : "postgres",
    port : 5432,
    user : "postgres",
    password : "hah1pisanG14",
});

module.exports = db;
