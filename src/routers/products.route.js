const { Router } = require("express");

const productsController = require("../controllers/product.controller");
const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
// /products/1
productsRouter.get("/:productId", productsController.getProductDetail);
productsRouter.post("/", productsController.insertProducts);
module.exports = productsRouter;