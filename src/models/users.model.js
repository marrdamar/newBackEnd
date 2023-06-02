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

const getUsers = (query) => {
	return new Promise((resolve, reject) => {
		let order;
		if (query.order === "asc") {
			order = "display_name asc";
		}
		if (query.order === "desc") {
			order = "display_name desc";
		}

		const sql = `SELECT u.email, u.phone_number, p.address, p.display_name, p.first_name, p.last_name, p.birth_date,
		p.genders
		FROM profiles p
		JOIN users u on u.id = p.users_id
		WHERE u.email ILIKE $1
		ORDER BY ${order || "p.id asc"}
		LIMIT $2`;

		const values = [`%${query.search || ""}%`, `${query.limit || ""}`];
		console.log(values)
		// console.log(sql)
		// console.log(order)
		db.query(sql, values, (err, result) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(result);
			console.log(result)
		});
	});
};

const getUserDetail = (params) => {
	return new Promise((resolve, reject) => {
		const sql = `SELECT u.email, u.phone_number, p.address, p.display_name, p.first_name, p.last_name, p.birth_date,
		p.genders
		FROM profiles p
		JOIN users u on u.id = p.users_id
		WHERE u.id = $1`;
		const values = [params.userId];

		db.query(sql, values, (error, result) => {
			if (error) {
				reject(error);
				return;
			}
			resolve(result);
		});
	});
};


const updateUserData = (params, data, fileLink) => {
	return new Promise((resolve, reject) => {
		let sqlColumns = [];
		let values = [];
		let index = 1;

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

        if (data.last_name) {
			sqlColumns.push(`address = $${index++}`);
			values.push(data.address);
		}

		if (data.birth_date) {
			sqlColumns.push(`birth_date = $${index++}`);
			values.push(data.birth_date);
		}

		if (data.genders) {
			sqlColumns.push(`genders = $${index++}`);
			values.push(data.genders);
		}

		// if (fileLink) {
		// 	sqlColumns.push(`img = $${index++}`);
		// 	values.push(fileLink);
		// }

		const sql = `UPDATE profiles SET ${sqlColumns.join(", ")} WHERE users_id = $${index} RETURNING *`;
		values.push(params.userId);
		// console.log(fileLink);
		console.log(sql)
		console.log(data.genders)

		db.query(sql, values, (error, result) => {
			if (error) return reject(error);
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
    updateUserData,
    deleteUser
};