const db = require("../configs/postgre");

const userVerification = (body) => {
    return new Promise ((resolve, reject) => {
    //verifikasi ke db
    const sql = `select id, email from users
    where email = $1 and password = $2`;
    db.query = (sql, [body.email, body.password], (err, result) => {
        if (err) return reject(err);
        resolve(result);
    });
    });
};

module.exports = { userVerification };