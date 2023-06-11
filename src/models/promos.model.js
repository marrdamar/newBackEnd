const db = require("../configs/postgre");

const getPromos = (info) => {
  return new Promise((resolve, reject) => {
    let showData =
      "SELECT pr.id, pr.product_id, coupon_code, discount, coupon_desc, pr.coupon_expired, pr.title, pd.image FROM promo pr JOIN product pd ON pd.id = pr.product_id WHERE pr.id <> 1 ORDER BY pr.id ";
    let order = "ASC";
    if (info.order === "desc") {
      order = "DESC";
    }
    showData += order;
    db.query(showData, (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    });
  });
};

const getPromoDetails = (info) => {
    return new Promise((resolve, reject) => {
      const showData =
        "SELECT po.id, po.title, coupon_code, discount, pd.image FROM promo po JOIN product pd ON po.product_id = pd.id WHERE po.id = $1";
      const values = [info.promoId];
      db.query(showData, values, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(result);
      });
    });
  };

const addPromo = (data) => {
    return new Promise((resolve, reject) => {
      const addData =
        "INSERT INTO promo (title, product_id, coupon_code, discount, coupon_desc, coupon_expired) VALUES ($1, $2, UPPER($3), $4, $5, $6) RETURNING *";
      const values = [
        data.title,
        data.product_id,
        data.coupon_code,
        data.discount,
        data.coupon_desc,
        data.coupon_expired,
      ];
      console.log(values)
      console.log(addData)
      db.query(addData, values, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  };

  const editPromo = (info, data) => {
    return new Promise((resolve, reject) => {
      // const editData = "UPDATE promo SET coupon_code = UPPER($1), discount = $2 WHERE id = $3 RETURNING *";
      // const values = [data.coupon_code, data.discount, info.promoId];
  
      let editData = "UPDATE promo SET ";
      let values = [];
      let i = 1;
      for (const [key, val] of Object.entries(data)) {
        editData += `${key} = $${i}, `;
        values.push(val);
        i++;
      }
      editData = editData.slice(0, -2);
      editData += ` WHERE id = $${i} RETURNING *`;
      values.push(info.promoId);
      console.log(editData);
      console.log(values);
      db.query(editData, values, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  };

  const deletePromo = (info) => {
    return new Promise((resolve, reject) => {
      const values = [info.promoId];
      db.query("DELETE FROM promo WHERE id = $1", values, (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  };

module.exports = {
    getPromos,
    getPromoDetails,
    addPromo,
    editPromo,
    deletePromo
}