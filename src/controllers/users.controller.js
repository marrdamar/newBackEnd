const usersModel = require("../models/users.model");
const { uploader } = require("../utils/cloudinary");

// const getUsers = async (req,res) => {
//     try {
//         const result = await usersModel.getUsers();
//         res.status(200).json({
//             data: result.rows
//         });
//     } catch (err) {
//         console.log (err.message);
//         res.status(500).json({
//             msg: "Internal Server Error",
//         });
//     }
// };

const getUsers = async (req, res) => {
	try {
	  const { query } = req;
	  const result = await usersModel.getUsers(query);
	  if (result.rows.length === 0) {
		res.status(404).json({
		  msg: "Data Not Found...",
		  data: result.rows,
		});
		return;
	  }
	  res.status(200).json({
		data: result.rows,
	  });
	} catch (err) {
	  console.log(err.message);
	  res.status(500).json({
		msg: "Internal Server Error...",
	  });
	}
  };

const getUserDetail = async (req, res) => {
	try {
		const { params } = req;
		const result = await usersModel.getUserDetail(params);

		if (result.rows.length < 1) {
			return (res, { status: 404, message: "Data Not Found" });
		}

		res.status(200).json({
			data: result.rows,
		});
	} catch (err) {
		console.log(err.message);
		return (res, { status: 500, message: "Internal Server Error" });
	}
};

const insertUsers = async (req, res) => {
	const { body } = req;
	const client = await db.connect();
	try {
		const verificationResult = await authModel.userVerification(body);
		if (verificationResult.rows.length > 0) {
			return error(res, { status: 400, message: "Email has been registered" });
		}

		await client.query("BEGIN");
		const result = await authModel.insertUsers(client, body);
		const userId = result.rows[0].id;
		await authModel.insertDetailUsers(client, userId);
		await client.query("COMMIT");
		client.release();
		res.status(200).json({
			message: "OK",
		});
	} catch (err) {
		console.log(err.message);
		await client.query("ROLLBACK");
		client.release();
		return err;
	}
};

const updateUserData = async (req, res) => {
	try {
		const { params, body } = req;

		const { data, err, msg } = await uploader(req, "users", params.userId);
		if (err) throw { msg, err };

		let fileLink;
		if (data !== null) {
			fileLink = data.secure_url;
		}
		const result = await usersModel.updateUserData(params, body, fileLink);

		res.status(200).json({
			data: result.rows,
			message: "Updated Successfully",
		});
	} catch (err) {
		console.log(err.message);
		return (res, { status: 500, message: "Internal Server Error" });
	}
};

  const deleteUser = async (req, res) => {
	try {
	  const { params } = req;
	  const result = await usersModel.deleteUser(params);
	  if (result.rowCount === 0) {
		res.status(404).json({
		  msg: `Delete Fail... ID ${params.userId} Not Found...`,
		});
		return;
	  }
	  res.status(200).json({
		msg: "Delete Data User Success...",
		data: result.rows,
	  });
	} catch (err) {
	  console.log(err.message);
	  res.status(500).json({
		msg: "Internal Server Error...",
	  });
	}
  };

module.exports = {
    getUsers,
	getUserDetail,
    insertUsers,
	updateUserData,
	deleteUser
};