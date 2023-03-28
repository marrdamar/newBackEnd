const { Router } = require("express");
const welcomeController = require("../controllers/welcome.controller");


const welcomeRouter = Router();
//localhost /
welcomeRouter.get("/", welcomeController.welcomePage);

module.exports = welcomeRouter;