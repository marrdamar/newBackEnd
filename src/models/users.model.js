const db = require("../configs/postgre");

const getUsers = () => {
    return new Promise ((resolve, reject) => {
        db.query("select id, email, phone_number from users", 
        (err, result) => {
            if (err) {
                reject(error)
                return;
            }
            resolve(result)
        });
    })
    
}

module.exports = {
    getUsers,
};