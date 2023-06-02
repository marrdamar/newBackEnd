const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");

const authRouter = Router();

//auth /auth
//login => post request
authRouter.post("/", authController.login);
//register
authRouter.post("/register", authController.insertUsers);
//private
authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);
//forgot
authRouter.patch("/forgot", authController.forgotPass);
//editpassbyforgot
authRouter.patch("/editpassbyforgot", authController.editPassbyForgot);

module.exports = authRouter;
