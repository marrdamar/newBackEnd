module.exports = {
    host : process.env.DB_HOST,
    db : process.env.DB_NAME,
    dbPort : process.env.DB_PORT,
    user : process.env.DB_USER,
    pwd : process.env.DB_PWD,
    serverPort : process.env.SERVER_PORT,
    jwtSecret : "FW14",
    cloudName : process.env.CLOUD_NAME,
    cloudKey : process.env.CLOUD_KEY,
    cloudSecret : process.env.CLOUD_SECRET,
}