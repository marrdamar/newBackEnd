const { Router } = require("express");
const authController = require("../controllers/auth.controller");

const authRouter = Router();

//auth /auth
//login => post request
authRouter.post("/", authController.login);

module.exports = authRouter;
