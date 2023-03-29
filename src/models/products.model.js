const db = require("../configs/postgre");

const getProducts = (q) => {
    return new Promise((resolve, reject) => {
        let sql = `select * from product order by `;
        let order = `id ASC`;
        if (q.order === "cheapest") {
            order = "prices ASC";
        } 
        if (q.order === "priciest") {
            order = "prices DESC";
        }
        sql += order;
        db.query(sql, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        })
    });
};


const insertProducts = (data) => {
    return new Promise((resolve, reject) => {
        const sql = `insert into product (names, prices) 
        values ($1, $2) RETURNING *`;
        const values = [data.names, data.prices]
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

const getProductDetail = (p) => {
    return new Promise((resolve, reject) => {
        const sql = `select * from product where id = $1`;
        const values = [p.productId]
        db.query(sql, values, (err, result) => {
            if (err) return reject(err);
            resolve(result);
        });
    });
};

module.exports = {
    getProducts,
    insertProducts,
    getProductDetail,
};