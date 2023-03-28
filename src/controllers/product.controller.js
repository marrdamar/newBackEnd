const productsModel = require("../models/products.model")

const getProducts = async (req, res) => {
    try {
        const result = await productsModel.getProducts();
        res.status(200).json({
            data: result.rows,
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

module.exports = {
    getProducts,
};