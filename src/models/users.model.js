const db = require("../configs/postgre");

// const getUsers = () => {
//     return new Promise ((resolve, reject) => {
//         db.query("select id, email, phone_number from users", 
//         (err, result) => {
//             if (err) {
//                 reject(err)
//                 return;
//             }
//             resolve(result)
//         });
//     })
// };

// const getUsers = (query) => {
// 	return new Promise((resolve, reject) => {
// 		let order;
// 		if (query.order === "asc") {
// 			order = "display_name asc";
// 		}
// 		if (query.order === "desc") {
// 			order = "display_name desc";
// 		}

// 		const sql = `SELECT u.email, u.phone_number, p.address, p.display_name, p.first_name, p.last_name, p.birth_date,
// 		p.genders
// 		FROM profiles p
// 		JOIN users u on u.id = p.users_id
// 		WHERE u.email ILIKE $1
// 		ORDER BY ${order || "p.id asc"}
// 		LIMIT $2`;

// 		const values = [`%${query.search || ""}%`, `${query.limit || ""}`];
// 		console.log(values)
// 		// console.log(sql)
// 		// console.log(order)
// 		db.query(sql, values, (err, result) => {
// 			if (err) {
// 				reject(err);
// 				return;
// 			}
// 			resolve(result);
// 			console.log(result)
// 		});
// 	});
// };

const getUsers = () => {
    return new Promise((resolve, reject) => {
        let showData = "SELECT * FROM users ORDER BY id ";
        let order = "ASC LIMIT 5 OFFSET 0";
        // if(info.page) {
        //     if(info.page == "all") {
        //         order = "ASC";
        //     } else {
        //         let offset = parseInt(info.page);
        //         let page = (offset - 1) * 5;
        //         order = `ASC LIMIT 5 OFFSET ${page}`;
        //     }
        // }
        showData += order;
        db.query(showData, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

// const getUserDetail = (params) => {
// 	return new Promise((resolve, reject) => {
// 		const sql = `SELECT u.email, u.phone_number, p.address, p.display_name, p.first_name, p.last_name, p.birth_date,
// 		p.genders
// 		FROM profiles p
// 		JOIN users u on u.id = p.users_id
// 		WHERE u.id = $1`;
// 		const values = [params.userId];

// 		db.query(sql, values, (error, result) => {
// 			if (error) {
// 				reject(error);
// 				return;
// 			}
// 			resolve(result);
// 		});
// 	});
// };

const getUserDetail = (userId) => {
    return new Promise((resolve, reject) => {

        const pick = "email, phone_number, ub.display_name, ub.first_name, ub.last_name, ub.address, ub.birth_date, ub.genders, ub.profile_image ";
        const table = "users u JOIN profiles ub ON ub.users_id = u.id";
        const showData = `SELECT ${pick} FROM ${table} WHERE u.id = $1`;
        // const values = [userId];
        // console.log(values)
        db.query(showData, [userId], (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

// const updateUserData = (params, data, fileLink) => {
// 	return new Promise((resolve, reject) => {
// 		let sqlColumns = [];
// 		let values = [];
// 		let index = 1;

// 		if (data.display_name) {
// 			sqlColumns.push(`display_name = $${index++}`);
// 			values.push(data.display_name);
// 		}

// 		if (data.first_name) {
// 			sqlColumns.push(`first_name = $${index++}`);
// 			values.push(data.first_name);
// 		}

// 		if (data.last_name) {
// 			sqlColumns.push(`last_name = $${index++}`);
// 			values.push(data.last_name);
// 		}

//         if (data.last_name) {
// 			sqlColumns.push(`address = $${index++}`);
// 			values.push(data.address);
// 		}

// 		if (data.birth_date) {
// 			sqlColumns.push(`birth_date = $${index++}`);
// 			values.push(data.birth_date);
// 		}

// 		if (data.genders) {
// 			sqlColumns.push(`genders = $${index++}`);
// 			values.push(data.genders);
// 		}

// 		// if (fileLink) {
// 		// 	sqlColumns.push(`img = $${index++}`);
// 		// 	values.push(fileLink);
// 		// }

// 		const sql = `UPDATE profiles SET ${sqlColumns.join(", ")} WHERE users_id = $${index} RETURNING *`;
// 		values.push(params.userId);
// 		// console.log(fileLink);
// 		console.log(sql)
// 		console.log(data.genders)

// 		db.query(sql, values, (error, result) => {
// 			if (error) return reject(error);
// 			resolve(result);
// 		});
// 	});
// };

const editUserBio = (params, data, fileLink) => {
    // return new Promise((resolve, reject) => {
    //   let sqlQuery = "UPDATE profiles SET ";
    //   let values = [];
    //   let i = 1;
    //   const body = req.body;
    // //   if (body.email) {
    // //     delete body.email;
    // //   }
    // //   if (body.phone_number) {
    // //     delete body.phone_number;
    // //   }
    //   console.log(body);
    //   for (const [key, val] of Object.entries(body)) {
    //     sqlQuery += `${key} = $${i}, `;
    //     values.push(val);
    //     i++;
    //   }
    //   // if (req.file) {
    //   //   const fileLink = `/images/users/${req.file.filename}`;
    //   //   sqlQuery += `profile_picture = '${fileLink}', `;
    //   // }
    //   if (req.file) {
    //     sqlQuery += `image = '${fileLink}', `;
    //   }
  
    //   sqlQuery = sqlQuery.slice(0, -2);
    //   sqlQuery += ` WHERE users_id = $${i} RETURNING *`;
    //   values.push(req.authInfo.id);
    //   console.log(sqlQuery);
    //   client.query(sqlQuery, values, (error, result) => {
    //     if (error) return reject(error);
    //     resolve(result);
    //   });
    // });
    return new Promise((resolve, reject) => {
		let sqlColumns = [];
		let values = [];
		let index = 1;

		if (data.address) {
			sqlColumns.push(`address = $${index++}`);
			values.push(data.address);
		}

		if (data.display_name) {
			sqlColumns.push(`display_name = $${index++}`);
			values.push(data.display_name);
		}

		if (data.first_name) {
			sqlColumns.push(`first_name = $${index++}`);
			values.push(data.first_name);
		}

		if (data.last_name) {
			sqlColumns.push(`last_name = $${index++}`);
			values.push(data.last_name);
		}

		if (data.birth_date) {
			sqlColumns.push(`birth_date = $${index++}`);
			values.push(data.birth_date);
		}

		if (data.genders) {
			sqlColumns.push(`genders = $${index++}`);
			values.push(data.genders);
		}

		if (fileLink) {
			sqlColumns.push(`profile_image = $${index++}`);
			values.push(fileLink);
		}

		const sql = `UPDATE profiles SET ${sqlColumns.join(", ")} WHERE users_id = $${index} RETURNING *`;
		values.push(params.userId);
		console.log(fileLink);
        db.query(sql, values, (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
};

  const editUser = (info, data) => {
    return new Promise((resolve, reject) => {
        // const editData = "UPDATE profiles SET display_name = $1, first_name = $2, last_name = $3, address = $4, birth_date = $5, genders = $6, image = $7 WHERE users_id = $8 RETURNING *";
        // const values = [data.display_name, data.first_name, data.last_name, data.address, data.birth_date, data.genders, data.image, info.userId];
        // // console.log(values)
        
        let editData = "UPDATE profiles SET";
        let values = [];
        let i = 1;
        for(const [key, val] of Object.entries(data)) {
            editData = `${key} = $${i}`;
            values.push(val);
            i++;
        }
        console.log(i)
        // console.log(editData)
        editData += ` WHERE id = $${i} RETURNING *`;
        console.log(editData);
        console.log(values)
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
        db.query(editData, values, (error, result) => {
            if(error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

const deleteUser = (info) => {
    return new Promise((resolve, reject) => {
        const values = [info.userId];
        const delData = "DELETE FROM users WHERE id = $1";
        db.query(delData, values, (error, result) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(result);
        });
    });
};

module.exports = {
    getUsers,
	getUserDetail,
    editUser,
    editUserBio,
    deleteUser
};