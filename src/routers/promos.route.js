const { Router } = require("express");
const promosRouter = Router();
const promoController = require("../controllers/promos.controller");

const { checkRole } = require("../middlewares/checkRole");
const { checkToken } = require("../middlewares/auth");

promosRouter.get("/", promoController.getPromos);
promosRouter.get("/:promoId", promoController.getPromoDetails);
//failing row contains
promosRouter.post("/", checkToken, checkRole, promoController.addPromo);
promosRouter.patch("/:promoId", checkToken, checkRole, promoController.editPromo);
promosRouter.delete("/delete/:promoId", checkToken, checkRole, promoController.deletePromo);

module.exports = promosRouter;