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

// const getUserDetail = async (req, res) => {
// 	try {
// 		const { params } = req;
// 		const result = await usersModel.getUserDetail(params);

// 		if (result.rows.length < 1) {
// 			return (res, { status: 404, message: "Data Not Found" });
// 		}

// 		res.status(200).json({
// 			data: result.rows,
// 		});
// 	} catch (err) {
// 		console.log(err.message);
// 		return (res, { status: 500, message: "Internal Server Error" });
// 	}
// };

const getUserDetails = async (req, res) => {
	try {
	  const { params } = req;
	  const result = await usersModel.getUserDetail(params);
	  if (result.rows.length === 0) {
		res.status(404).json({
		  msg: `Data ID ${params.userId} Not Found... please try other id`,
		});
		return;
	  }
	  res.status(200).json({
		data: result.rows[0],
	  });
	} catch (err) {
	  console.log(err.message);
	  res.status(500).json({
		msg: "Internal Server Error...",
	  });
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

// const updateUserData = async (req, res) => {
// 	try {
// 		const { params, body } = req;

// 		const { data, err, msg } = await uploader(req, "users", params.userId);
// 		if (err) throw { msg, err };

// 		let fileLink;
// 		if (data !== null) {
// 			fileLink = data.secure_url;
// 		}
// 		const result = await usersModel.updateUserData(params, body, fileLink);

// 		res.status(200).json({
// 			data: result.rows,
// 			message: "Updated Successfully",
// 		});
// 	} catch (err) {
// 		console.log(err.message);
// 		return (res, { status: 500, message: "Internal Server Error" });
// 	}
// };

const editUser = async (req, res) => {
	try {
	  const { params, body } = req;
	  const result = await usersModel.editUser(params, body);
	  console.log(params, body)
	  if (result.rowCount === 0) {
		  res.status(404).json({
			  msg: `Edit Fail... ID ${params.userId} Not Found...`,
			});
			return;
		}
		res.status(200).json({
			msg: "Update Data User Success...",
			data: result.rows,
		});
	} catch (err) {
		console.log(err.message);
		res.status(500).json({
			msg: "Internal Server Error...",
		data: err.detail,
	  });
	}
  };

const editProfile = async (req, res) => {
	const client = await db.connect();
	try {
	  if (req.body.email || req.body.phone_number) {
		await authModel.editUser(client, req);
	  }
	  await client.query("BEGIN");
	  let fileLink = "";
	  console.log(req.file);
	  if (req.file) {
		const fileName = req.authInfo.id;
		const upCloud = await uploader(req, "user", fileName);
		fileLink = upCloud.data.secure_url;
	  }
	  const resultUserBio = await authModel.editUserBio(client, req, fileLink);
	  await client.query("COMMIT");
	  res.status(200).json({
		msg: "Update Success...",
		data: resultUserBio.rows,
	  });
	} catch (err) {
	  console.log(err);
	  res.status(500).json({
		msg: "Internal Server Error...",
	  });
	} finally {
	  client.release();
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
	getUserDetails,
    insertUsers,
	editUser,
	editProfile,
	deleteUser
};