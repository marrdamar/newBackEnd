const db = require("../configs/postgre");
// const bcrypt = require("bcrypt");

const userVerification = (email) => {
	return new Promise((resolve, reject) => {
		//verifikasi ke db
		const sql = `select u.id, u.email, u.password, u.phone_number, pr.display_name, pr.profile_image from users u JOIN profiles pr on u.id = pr.users_id where email=$1`;
		db.query(sql, [email], (error, result) => {
			if (error) return reject(error);
			return resolve(result);
		});
	});
};

const insertUsers = (client, data) => {
	return new Promise((resolve, reject) => {

		try { 
			const sql = "INSERT INTO users ( email, password, phone_number) VALUES ( $1, $2, $3) RETURNING id";
			const values = [data.email, data.hashedPassword, data.phone_number];
			client.query(sql, values, (error, result) => {
				if (error) return reject(error);
				resolve(result);
			});

		} catch (error) {
			console.log(error)
		}
	});
};

const insertDetailUsers = (client, users_id) => {
	return new Promise((resolve, reject) => {
		const sql = "INSERT INTO profiles (users_id) VALUES (cast($1 as int))";
		const values = [users_id.id];
		client.query(sql, values, (error) => {
			if (error) return reject(error);
			resolve();
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
	  const sqlQuery =
		"UPDATE users SET otp_code = $1, otp_expired_at = NOW() + INTERVAL '2 minutes' WHERE id = $2 RETURNING id, email, phone_number, otp_code, otp_expired_at";
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
	  const sqlQuery = "UPDATE users SET password = $1 WHERE id = $2";
	  const values = [newPassword, userId];
	  db.query(sqlQuery, values, (error, result) => {
		if (error) return reject(error);
		console.log(values);
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
      const sqlQuery = "SELECT token_fcm FROM users WHERE id = $1";
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

  
module.exports = { userVerification, insertUsers, insertDetailUsers, getAccount, forgotPass, getUserbyForgot, editPassword, loginFirebase, getUser, logout, createToken };