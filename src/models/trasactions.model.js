const db = require("../configs/postgre");

const createHistories = async (client, body, userId) => {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "INSERT INTO history (users_id, promo_id, deliveries_id, payment_id, notes, status_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id";
      const values = [
        userId,
        body.promo_id,
        body.deliveries_id,
        body.payment_id,
        body.notes,
        body.status_id
      ];
      console.log(values)
      client.query(sqlQuery, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const createDetailTransaction = (client, body, transactionId) => {
    return new Promise((resolve, reject) => {
      const { products } = body;
      let sqlQuery =
        "INSERT INTO m_transaction (history_id, product_id, sizes_id, qty, subtotal) VALUES ";
      let values = [];
      console.log(values)
      console.log(products)
      // console.log(sqlQuery)
      products.forEach((product, idx) => {
        if (values.length) sqlQuery += ", ";
        const { product_id, sizes_id, qty, subtotal } = product;
        sqlQuery += `($${1 + 5 * idx}, $${2 + 5 * idx}, $${3 + 5 * idx}, $${
          4 + 5 * idx
        }, $${5 + 5 * idx})`;
        values.push(transactionId, product_id, sizes_id, qty, subtotal);
      });
      console.log(sqlQuery);
      client.query(sqlQuery, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const getTransactions = (client, transactionId) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT t.history_id, ub.display_name , h.notes, 
          t.product_id, p.names, p.prices, ps."size", ps."cost", t.qty, t.subtotal, 
          h.promo_id, pr.coupon_code, pr.discount, d."method" as delivery, d.shipping, 
          py."methods" as payments, sp.status 
          FROM m_transaction t 
          JOIN history h ON h.id = t.history_id 
          JOIN product p ON p.id = t.product_id 
          JOIN sizes ps ON ps.id = t.sizes_id 
          JOIN users u ON u.id = h.users_id 
          JOIN profiles ub ON ub.users_id = u.id 
          JOIN payments py ON py.id = h.payment_id 
          JOIN promo pr ON pr.id = h.promo_id 
          JOIN deliveries d ON d.id = h.deliveries_id  
          JOIN status sp ON h.status_id = sp.id 
          WHERE t.id = $1`;
      client.query(sqlQuery, [transactionId], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };
  
  const getHistories = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT DISTINCT ON (h.id) h.id, h.status_id, h.payment_id, d.method, h.created_at, t.product_id, p.names, p.prices, p.image
        FROM history h
        JOIN deliveries d ON d.id = h.deliveries_id
        JOIN m_transaction t ON t.history_id = h.id
        JOIN product p ON p.id = t.product_id
      WHERE h.users_id = $1 AND h.status_id in (1,2) ORDER BY h.id DESC`;
      // const sqlQuery = `SELECT * from history
      //     WHERE users_id = $1`;
      db.query(sqlQuery, [info.id], (error, result) => {
        console.log(info.id)
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const getHistory = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT t.history_id, ub.display_name , h.notes, 
          t.product_id, p.names, p.prices, ps."size", ps."cost", t.qty, t.subtotal, 
          h.promo_id, pr.coupon_code, pr.discount, d."method" as delivery, d.shipping, 
          py."method" as payments, sp.status 
          FROM transactions t 
          JOIN history h ON h.id = t.history_id 
          JOIN product p ON p.id = t.product_id 
          JOIN sizes ps ON ps.id = t.size_id 
          JOIN users u ON u.id = h.users_id 
          JOIN profiles ub ON ub.user_id = u.id 
          JOIN payments py ON py.id = h.payment_id 
          JOIN promo pr ON pr.id = h.promo_id 
          JOIN deliveries d ON d.id = h.deliveries_id  
          JOIN status sp ON h.status_id = sp.id 
          WHERE h.user_id = $1`;
      db.query(sqlQuery, [info.id], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const setPaidOrder = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "UPDATE history SET status_id = 2, updated_at = NOW() WHERE id = $1 RETURNING *";
        console.log(sqlQuery)
      db.query(sqlQuery, [info.id], (error, result) => {
        console.log(info.id)
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const getPaidOrder = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT DISTINCT ON (h.id) h.id, h.status_id, d.method, h.created_at, t.product_id, p.names, p.prices, p.image
      FROM history h
      JOIN deliveries d ON d.id = h.deliveries_id
      JOIN m_transaction t ON t.history_id = h.id
      JOIN product p ON p.id = t.product_id
      WHERE h.status_id = 2 AND h.users_id = $1 ORDER BY h.id DESC`;
      db.query(sqlQuery, [info.id], (error, result) => {
        // console.log(info.id)
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const getPendingOrder = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT DISTINCT ON (h.id) h.id, h.status_id, d.method, h.created_at, t.product_id, p.names, p.prices, p.image
      FROM history h
      JOIN deliveries d ON d.id = h.deliveries_id
      JOIN m_transaction t ON t.history_id = h.id
      JOIN product p ON p.id = t.product_id
      WHERE h.status_id = 1 AND h.users_id = $1
      ORDER BY h.id DESC`;
      db.query(sqlQuery, [info.id], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const getCancelOrder = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = `SELECT DISTINCT ON (h.id) h.id, h.status_id, d.method, h.created_at, t.product_id, p.names, p.prices, p.image
      FROM history h
      JOIN deliveries d ON d.id = h.deliveries_id
      JOIN m_transaction t ON t.history_id = h.id
      JOIN product p ON p.id = t.product_id
      WHERE h.status_id = 4 AND h.users_id = $1
      ORDER BY h.id DESC`;
      db.query(sqlQuery, [info.id], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const setCancelOrder = (info) => {
    return new Promise((resolve, reject) => {
      const sqlQuery =
        "UPDATE history SET status_id = 4, updated_at = NOW() WHERE id = $1 RETURNING *";
        console.log(sqlQuery)
      db.query(sqlQuery, [info.id], (error, result) => {
        console.log(info.id)
        if (error) return reject(error);
        resolve(result);
      });
    });
  };



module.exports = {
    createHistories,
    createDetailTransaction,
    getTransactions,
    getHistories,
    getHistory,
    setPaidOrder,
    getPaidOrder,
    getPendingOrder,
    getCancelOrder,
    setCancelOrder
}