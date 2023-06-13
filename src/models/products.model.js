const db = require("../configs/postgre");

// const getProducts = (q) => {
//     return new Promise((resolve, reject) => {
//         let sql = `select * from product order by `;
//         let order = `id ASC`;
//         if (q.order === "cheapest") {
//             order = "prices ASC";
//         } 
//         if (q.order === "priciest") {
//             order = "prices DESC";
//         }
//         sql += order;

//         const limit = parseInt(q.limit) || 5;
//         const page = parseInt(q.page) || 1;
//         const offset = (page - 1) * limit;

//         sql += ` LIMIT $1 OFFSET $2`;
//         const values = [limit, offset];

//         db.query(sql, values, (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             resolve(result);
//         })
//     });
// };

// const getMetaProducts1 = (q) => {
//     return new Promise((resolve, reject) => {
//         let sql = `select count (*) as total_data from product order by `;

//         db.query(sql, values, (error, result) => {
//             if (error) {
//                 reject(error);
//                 return;
//             }
//             const totalData = result.rows[0].total_data;
//             const limit = parseInt(q.limit) || 5;
//             const meta = {
//                 totalData,
//                 next: "",
//                 prev: "",
//                 totalPage: Math.ceil(totalData / limit),
//             }
//             resolve(result);
//         })
//     });
// };

// const getProducts = (query) => {
// 	return new Promise((resolve, reject) => {
// 		let order;
// 		if (query.order === "cheapest") {
// 			order = "price ASC";
// 		}
// 		if (query.order === "priciest") {
// 			order = "price DESC";
// 		}

// 		const sql = `select p.id, p.names, p.prices, p.image, c."category_name" as "category_name"
// 		from product p
// 		join categories c on p.categories_id = c.id
// 		${
// 			query.category === undefined
// 				? `where p.names ilike $1 or c."category_name" ilike $2`
// 				: `where p.names ilike $1 and c."category_name" ilike $2`
// 		}
// 		order by ${order || "id asc"}
// 		limit $3
// 		offset $4`;

// 		const page = query.page || 1;
// 		const limit = query.limit || 10;
// 		const offset = (parseInt(page) - 1) * parseInt(limit);

// 		const values = [`%${query.search || ""}%`, `${query.category}%`, `${limit}`, offset];

// 		db.query(sql, values, (error, result) => {
// 			if (error) {
// 				reject(error);
// 				return;
// 			}
// 			resolve(result);
// 		});
// 	});
// };

// const getMetaProducts = (query, fullUrl) => {
// 	return new Promise((resolve, reject) => {
// 		const sql = "select count (*) as total_data from product";
// 		db.query(sql, (err, result) => {
// 			if (err) return reject(err);
// 			const totalData = parseInt(result.rows[0].total_data);
// 			const page = query.page || 1;
// 			const limit = query.limit || 5;
// 			const totalPage = Math.ceil(totalData / parseInt(limit));

// 			let prev = parseInt(page) === 1 ? null : `${fullUrl}/products?page=${parseInt(page) - 1}`;
// 			let next = parseInt(page) === totalPage ? null : `${fullUrl}/products?page=${parseInt(page) + 1}`;

// 			const meta = { totalData, prev, next, totalPage };
// 			resolve(meta);
// 		});
// 	});
// };

const getProducts = (info) => {
	return new Promise((resolve, reject) => {
	  let sqlQuery =
		"SELECT id, categories_id, names, prices, image FROM product WHERE id <> 1";
	  let parameters = " ";
	  if (info.search) {
		parameters += `AND LOWER(names) LIKE LOWER('%${info.search}%') `;
	  }
	  if (info.category) {
		parameters += `AND categories_id = ${info.category} `;
	  }
	  if (info.order === "cheapest") {
		parameters += "ORDER BY prices ASC ";
	  }
	  if (info.order === "priciest") {
		parameters += "ORDER BY prices DESC ";
	  }
	  if (!info.order) {
		parameters += "ORDER BY id ASC";
	  }
	  const limit = parseInt(info.limit) || 12;
	  const page = parseInt(info.page) || 1;
	  const offset = (page - 1) * limit;
	  sqlQuery += `${parameters} LIMIT ${limit} OFFSET ${offset}`;
	  console.log(sqlQuery);
	  db.query(sqlQuery, (error, result) => {
		if (error) {
		  reject(error);
		  return;
		}
		resolve(result);
	  });
	});
  };

const getMetaProducts = (info) => {
	return new Promise((resolve, reject) => {
	  console.log(info);
	  let sqlQuery = "SELECT COUNT(*) AS total_data FROM product WHERE id  <> 1";
	  if (info.search) {
		sqlQuery += ` AND LOWER(names) LIKE LOWER('%${info.search}%')`;
	  }
	  if (info.category) {
		sqlQuery += ` AND categories_id = ${info.category}`;
	  }
	  db.query(sqlQuery, (error, result) => {
		if (error) {
		  reject(error);
		  return;
		}
		const totalData = parseInt(result.rows[0].total_data);
		const limit = parseInt(info.limit) || 12;
		const page = parseInt(info.page) || 1;
		const totalPage = Math.ceil(totalData / limit);
		let next = "";
		let prev = "";
		if (page < totalPage) {
		  next = `/products?page=${page + 1}&limit=${limit}`;
		  if (info.search) {
			next += `&search=${info.search}`;
		  }
		  if (info.category) {
			next += `&category=${info.category}`;
		  }
		  if (info.order) {
			next += `&order=${info.order}`;
		  }
		} else {
		  next = null;
		}
  
		if (page > 1) {
		  prev = `/products?page=${page - 1}&limit=${limit}`;
		  if (info.search) {
			prev += `&search=${info.search}`;
		  }
		  if (info.category) {
			prev += `&category=${info.category}`;
		  }
		  if (info.order) {
			prev += `&order=${info.order}`;
		  }
		} else {
		  prev = null;
		}
		const meta = {
		  totalData,
		  next,
		  prev,
		  totalPage,
		};
		resolve(meta);
	  });
	});
  };

const insertProducts = (data, fileLink) => {
	return new Promise((resolve, reject) => {
		const sql =
			"INSERT INTO product (names, prices, categories_id, desc_product, image) VALUES ($1, $2, $3, $4, $5) RETURNING *";
		const values = [data.names, data.prices, data.categories_id, data.desc_product, fileLink];
		console.log(values)
		console.log(sql)
		db.query(sql, values, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
};

const nextIdValue = () => {
	return new Promise((resolve, reject) => {
		const sql = "SELECT LAST_VALUE + 1 AS next_value FROM product_id_product_seq";
		db.query(sql, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
};

const getProductDetail = (params) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT p.id, p.names, p.prices, p.image, p.desc_product, c."category_name" as "category_name"
		FROM product p
		JOIN categories c on p.categories_id = c.id
		WHERE p.id = $1`;
		const values = [params.productId];

		db.query(sql, values, (error, result) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(result);
		});
	});
};

const updateImageProducts = (fileLink, productId) => {
    return new Promise((resolve, reject) => {
        const sql = `update product set image = $1 where id = $2 returning id, names, image`;
        db.query(sql, [fileLink, productId], (err, result) => {
            if(err) return reject(err);
            resolve(result);
        })
    })
}

const updateProductWithFile = (params, data, fileLink) => {
	return new Promise((resolve, reject) => {
			const sql =
			"UPDATE product SET names = $1, prices = $2, image = $3, category_id = $4 WHERE id = $5 RETURNING *";
		const values = [data.name, data.price, fileLink, data.category_id, params.productId];

		db.query(sql, values, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
};


const editProductCloud = (req, fileLink) => {
	return new Promise((resolve, reject) => {
	  const { params, body } = req;
	  let sqlQuery = "UPDATE product SET ";
	  let values = [];
	  let i = 1;
	  for (const [key, val] of Object.entries(body)) {
		  sqlQuery += `${key} = $${i}, `;
		//   console.log(key)
		values.push(val);
		i++;
	  }
	  if (req.file !== "") {
		sqlQuery += `image = '${fileLink}', `;
	  }
	//   console.log(req.file)
	  sqlQuery += `updated_at = NOW() WHERE id = $${i} RETURNING *`;
	  values.push(params.productId);
	  console.log(sqlQuery);
	//   console.log(values)
	//   console.log(req.file)
	//   console.log(fileLink)
	  db.query(sqlQuery, values, (error, result) => {
		if (error) {
		  reject(error);
		  return;
		}
		resolve(result);
	  });
	});
  };

const deleteProduct = (params) => {
	return new Promise((resolve, reject) => {
		const sql = "DELETE FROM product WHERE id = $1 RETURNING *";
		const values = [params.productId];
		db.query(sql, values, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
};

const editProductsLocal = (req) => {
	return new Promise((resolve, reject) => {
	  const { params, body } = req;
	  let sqlQuery = "UPDATE product SET ";
	  let values = [];
	  let i = 1;
	  for (const [key, val] of Object.entries(body)) {
		sqlQuery += `${key} = $${i}, `;
		values.push(val);
		i++;
	  }
	  if (req.file) {
		const fileLink = `/images/${req.file.filename}`;
		sqlQuery += `image = '${fileLink}', `;
		console.log(fileLink)
	  }
	  sqlQuery += `updated_at = NOW() WHERE id = $${i} RETURNING *`;
	  values.push(params.productId);
	  console.log(sqlQuery);
	  console.log(req.file)
	  console.log(values)
	  db.query(sqlQuery, values, (error, result) => {
		if (error) {
		  reject(error);
		  return;
		}
		resolve(result);
	  });
	});
  };

module.exports = {
    getProducts,
    insertProducts,
    getProductDetail,
    getMetaProducts,
    deleteProduct,
    updateProductWithFile,
    updateImageProducts,
    nextIdValue,
	editProductCloud,
	editProductsLocal
};