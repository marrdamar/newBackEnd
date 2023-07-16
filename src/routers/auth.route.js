const { Router } = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth");
const memoryUpload = require("../middlewares/memoryUpload");

const authRouter = Router();

//auth /auth
//login => post request
authRouter.post("/", authController.login);
//register
authRouter.post("/register", authController.insertUsers);
//private
// authRouter.get("/private", authMiddleware.checkToken, authController.privateAccess);
//forgot
authRouter.patch("/forgot", authController.forgotPass);
//editpassbyforgot
authRouter.patch("/editpassbyforgot", authController.editPassbyForgot);
//edit user
authRouter.patch("/profile", authMiddleware.checkToken, memoryUpload.single("profile_image"), authController.editProfile);
//logout
authRouter.patch("/logout", authMiddleware.blacklistToken, authController.logout);

module.exports = authRouter;
