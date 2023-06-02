const { Router } = require("express");

const productsController = require("../controllers/product.controller");
const { checkToken } = require("../middlewares/auth");
const { checkRole } = require("../middlewares/checkRole");
const memoryUpload = require("../middlewares/memoryUpload");
const { singleUpload } = require("../middlewares/productDiskUpload");
const productsRouter = Router();

productsRouter.get("/", productsController.getProducts);
// /products/1
productsRouter.get("/:productId", productsController.getProductDetail);
//add product with statis image
productsRouter.post("/", checkRole, checkToken, singleUpload("image"), productsController.insertProducts);
// productsRouter.post("/", checkRole, checkToken, memoryUpload.single("image"), productsController.insertProducts);
//add single image
productsRouter.patch("/image/:productId", checkToken, singleUpload("image"), productsController.patchImageProducts);
//edit cloud
// productsRouter.patch("/:productId", checkRole, checkToken, memoryUpload.single("image"), productsController.editProductCloud);
productsRouter.delete("/:productId", checkRole, checkToken, productsController.deleteProduct);
//upload single image cloud
// productsRouter.patch("/cloudimg/:productId", memoryUpload.single("image"), productsController.cloudUpload);
//edit local --> success
productsRouter.patch("/:productId", checkToken, checkRole, singleUpload("image"), productsController.editProductsLocals);

module.exports = productsRouter;