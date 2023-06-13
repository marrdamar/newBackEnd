const productsModel = require("../models/products.model")
const { uploader } = require("../utils/cloudinary");
const response = require ("../utils/response");

// const getProducts = async (req, res) => {
//     try {
//         const { query } = req;
//         const result = await productsModel.getProducts(query);
// 		const fullUrl = req.protocol + '://' + req.get('host');
//         if (result.rows.length === 0) {
//             res.status(404).json({
//                 data: result.rows,
//                 msg: "product tidak ditemukan"
//             });
//             return;
//         }
//         const meta = await productsModel.getMetaProducts(query, fullUrl);
//         res.status(200).json({
//             data: result.rows,
//             meta,
//         });
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).json({
//             msg: "Internal Server Error",
//         });
//     }
// };

const getProducts = async (req, res) => {
  try {
    const { query } = req;
    const result = await productsModel.getProducts(query);
    if (result.rows.length === 0) {
      res.status(404).json({
        msg: "Data Not Found... please don't do it again",
        data: result.rows,
      });
      return;
    }
    const meta = await productsModel.getMetaProducts(query);
    res.status(200).json({
      meta,
      data: result.rows,
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      msg: "Internal Server Error...",
    });
  }
};


const insertProducts = async (req, res) => {
  try {
    let fileLink;
		const { body, file } = req;
    console.log(file)
		const valueResult = await productsModel.nextIdValue();
		const nextValue = valueResult.rows[0].next_value;
		const { data, err, msg } = await uploader(req, "products", nextValue);
		if (err) throw { msg, err };

		if (!file) return (res, { status:400, message: "Image Is Required" });
    fileLink = data.secure_url;
		const result = await productsModel.insertProducts(body, fileLink);
    console.log(fileLink)

		res.status(201).json({
			data: result.rows[0],
			message: "Created Successfully",
		});
	} catch (err) {
		console.log(err.message);
		return (res, { status: 500, message: "Internal Server Error" });
	}
  // try {
  //   let fileLink = "";
  //   if (req.file) {
  //     const fileName = req.params.productId;
  //     const upCloud = await uploader(req, "products", fileName);
  //     fileLink = upCloud.data.secure_url;
  //     // console.log(upCloud)
  //   }
  //   console.log(fileLink)
  //   const result = await productsModel.insertProducts(req, fileLink);
  //   res.status(201).json({
  //     msg: "Add Data Success...",
  //     data: result.rows,
  //   });
  // } catch (err) {
  //   console.log(err.message);
  //   res.status(500).json({
  //     msg: "Internal Server Error...",
  //     data: err.detail,
  //   });
  // }
};


// params => query (search, filter, sort, paginasi) & path (get detail dll)
// query => req.query
// path => req.params

// const insertProducts = async (req, res) => {
// 	try {
// 		const { body, file } = req;

// 		const valueResult = await p.nextIdValue();
// 		const nextValue = valueResult.rows[0].next_value;
// 		const { data, err, msg } = await uploader(req, "product", nextValue);
// 		if (err) throw { msg, err };

// 		if (!file) return err(res, { status:400, message: "Image Is Required" });
// 		const fileLink = `/images/${req.file.filename}`;
// 		const result = await productsModel.insertProducts(body, fileLink);

// 		res.status(201).json({
// 			data: result.rows[0],
// 			message: "Images has created",
// 		});
// 	} catch (err) {
// 		console.log(err.message);
// 		res.status(500).json({
//             msg : "Internal Server Error",
//         });
// 	}
// };

const getProductDetail = async (req, res) => {
    try {
        const { params } = req;
        const result = await productsModel.getProductDetail(params);
        res.status(201).json({
            data: result.rows,
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

const deleteProduct = async (req, res) => {
	try {
		const { params } = req;
		const result = await productsModel.deleteProduct(params);
		res.status(200).json({
			data: result.rows,
			message: "Deleted Successfully",
		});
	} catch (err) {
		console.log(err.message);
		return err(res, { status: 500, message: "Internal Server Error" });
	}
};

const patchImageProducts = async (req, res) => {
    let fileLink = "";
    console.log(fileLink)
    try {
      let fileLink = "";
      if (req.file) {
        const fileName = req.params.productId;
        const upCloud = await uploader(req, "products", fileName);
        fileLink = upCloud.data.secure_url;
        // console.log(upCloud)
      }
        const result = await productsModel.updateImageProducts(fileLink, req.params.productId);
        res.status(200).json({
            msg : "Images Updated",
            data : result.rows,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Servel Error",
        });
    }
};

const editProductCloud = async (req, res) => {
    try {
      let fileLink = "";
      if (req.file) {
        const fileName =
        req.body.names.replace(/\s/g, "") || req.params.productId;
        const upCloud = await uploader(req, "products", fileName);
        fileLink = upCloud.data.secure_url;
        // console.log(upCloud)
      }
      const result = await productsModel.editProductCloud(req, fileLink);
      console.log(result)
      if (result.rowCount === 0) {
        res.status(404).json({
          msg: `Edit Fail... ID ${req.params.productId} Not Found...`,
        });
        return;
      }
      res.status(200).json({
        msg: "Edit Data Success...",
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

  const editProductsLocals = async (req, res) => {
    try {
      const result = await productsModel.editProductsLocal(req);
      console.log(result)
      if (result.rowCount === 0) {
        res.status(404).json({
          msg: `Edit Fail... ID ${req.params.productId} Not Found...`,
        });
        return;
      }
      res.status(200).json({
        msg: "Edit Data Success...",
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

const cloudUpload = async (req, res) => {
    try {
        //uplad ke cloud
        const { data, err, msg} = await uploader(req, "products", req.params.productId);
        if (err) throw { msg, err };
        console.log(data, err, msg)
        if (!data) return res.status(200).json({msg: "No File Uploaded"});
        res.status(201).json({
            data,
            msg,
        });
    } catch (error) {
        res.status(500).json({
            msg: error.msg,
        })
    }
};

module.exports = {
    getProducts,
    insertProducts,
    getProductDetail,
    deleteProduct,
    patchImageProducts,
    cloudUpload,
    editProductCloud,
    editProductsLocals
};