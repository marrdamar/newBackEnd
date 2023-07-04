const db = require("../configs/postgre");
// const bcrypt = require("bcrypt");

const userVerification = (email) => {
	return new Promise((resolve, reject) => {
		//verifikasi ke db
		const sql = `select u.id, u.email, u.password, u.phone_number, u.roles_id, pr.display_name, pr.profile_image, rl.rolesid FROM users u 
		JOIN profiles pr on u.id = pr.users_id 
		JOIN roles rl on u.roles_id = rl.rolesid 
		WHERE email=$1`;
		db.query(sql, [email], (error, result) => {
			if (error) return reject(error);
			return resolve(result);
		});
	});
};

const insertUsers = (client, data) => {
	return new Promise((resolve, reject) => {

		try { 
			const sql = "INSERT INTO users ( email, password, phone_number, roles_id) VALUES ( $1, $2, $3, $4) RETURNING email";
			const values = [data.email, data.hashedPassword, data.phone_number, 2];
			client.query(sql, values, (error, result) => {
				if (error) return reject(error);
				resolve(result);
			});

		} catch (error) {
			console.log(error)
		}
	});
};

const insertDetailUsers = (client, userId, data) => {
	return new Promise((resolve, reject) => {
		const sql = "INSERT INTO profiles (users_id, display_name) VALUES ($1, $2)";
		client.query(sql, [userId, data], (error, result) => {
			if (error) return reject(error);
			resolve(result);
		});
	});
};

const getAccount = (email) => {
	return new Promise((resolve, reject) => {
	  const sqlQuery = "SELECT id, email FROM users WHERE email = $1";
	  db.query(sqlQuery, [email], (error, result) => {
		if (error) return reject(error);
		resolve(result);
	  });
	});
  };

  const forgotPass = (userId, otpCode) => {
	return new Promise((resolve, reject) => {
	  let sqlQuery =
		`UPDATE users SET otp_code = $1, otp_expired_at = NOW() + INTERVAL '1 minutes' WHERE id = $2 RETURNING id, email, phone_number, otp_code, otp_expired_at`;
		// sqlQuery += ` AND UPDATE users SET otp_code = null where otp_expired_at < NOW() - INTERVAL '1 minutes'`
		// console.log(sqlQuery)
	  db.query(sqlQuery, [otpCode, userId], (error, result) => {
		if (error) return reject(error);
		resolve(result);
	  });
	});
  };

  const getUserbyForgot = (body) => {
	return new Promise((resolve, reject) => {
	  const sqlQuery =
		"SELECT * FROM users WHERE email = $1 AND otp_code = $2";
	  const values = [body.email, body.otp_code];
	  db.query(sqlQuery, values, (error, result) => {
		  if (error) return reject(error);
		  console.log(sqlQuery)
		  console.log(values)
		  resolve(result);
	  });
	});
  };

  const editPassword = (newPassword, userId) => {
	return new Promise((resolve, reject) => {
	  const sqlQuery = "UPDATE users SET password = $1, otp_code = null WHERE id = $2";
	  const values = [newPassword, userId];
	  db.query(sqlQuery, values, (error, result) => {
		if (error) return reject(error);
		console.log(values);
		resolve(result);
	  });
	});
  };

  const editUser = (client, req) => {
	return new Promise((resolve, reject) => {
	  let sqlQuery = "UPDATE users SET";
	  let values = [req.authInfo.id];
	  if (req.body.email) {
		sqlQuery += ` email = '${req.body.email}',`;
	  }
	  if (req.body.phone_number) {
		sqlQuery += ` phone_number = ${req.body.phone_number}`;
	  }
	  sqlQuery += " WHERE id = $1 RETURNING *";
	  console.log(sqlQuery);
	  client.query(sqlQuery, values, (error, result) => {
		if (error) return reject(error);
		resolve(result);
	  });
	});
  };

  const editUserBio = (client, req, fileLink) => {
    return new Promise((resolve, reject) => {
        let sqlQuery = "UPDATE profiles SET ";
        let values = [];
        let i = 1;
        const body = req.body;
        if (body.email) {
            delete body.email;
        }
        if (body.phone) {
            delete body.phone_number;
        }
        console.log(body);
        for (const [key, val] of Object.entries(body)) {
            sqlQuery += `${key} = $${i}, `;
            values.push(val);
            i++;
        }
        // if (req.file) {
        //   const fileLink = `/images/users/${req.file.filename}`;
        //   sqlQuery += `profile_picture = '${fileLink}', `;
        // }
        if (req.file) {
            sqlQuery += `profile_image = '${fileLink}', `;
        }

        sqlQuery = sqlQuery.slice(0, -2);
        sqlQuery += ` WHERE users_id = $${i} RETURNING *`;
        values.push(req.authInfo.id);
        console.log(sqlQuery);
        client.query(sqlQuery, values, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
    });
};

  const loginFirebase = (tokenFcm, userId) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "UPDATE users SET token_fcm = $1 WHERE id = $2";
      const values = [tokenFcm, userId];
      db.query(sqlQuery, values, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const getUser = (userId) => {
    return new Promise((resolve, reject) => {
      const sqlQuery = "SELECT token FROM users WHERE id = $1";
      db.query(sqlQuery, [userId], (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  };

  const logout = (userId) => {
	return new Promise((resolve, reject) => {
	  const sqlQuery = "UPDATE users SET token = NULL WHERE id = $1";
	  const values = [userId];
	  db.query(sqlQuery, values, (error, result) => {
		if (error) return reject(error);
		resolve(result);
	  });
	});
  };

  const createToken = (userId, expIn, token) => {
	return new Promise((resolve, reject) => {
	  const sqlQuery = `UPDATE users SET token = $1, token_expired = NOW() + INTERVAL '${expIn} minutes' WHERE id = $2`;
	  const values = [token, userId];
	  console.log(values);
	  db.query(sqlQuery, values, (error, result) => {
		if (error) return reject(error);
		resolve(result);
	  });
	});
  };

  
module.exports = { userVerification, insertUsers, insertDetailUsers, getAccount, forgotPass, getUserbyForgot, editPassword, loginFirebase, getUser, logout, createToken, editUser, editUserBio };