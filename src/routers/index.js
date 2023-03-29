const { Router } = require("express");
//welcome /
const welcomeRouter = require("./welcome.router");
//users /users
const usersRouter = require("./users.route");
//products /products
const productsRouter = require("./products.route");
//auth /
const authRouter = require("./auth.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/auth", authRouter);

module.exports = masterRouter;

