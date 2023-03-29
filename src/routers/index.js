const { Router } = require("express");
//welcome /
const welcomeRouter = require("./welcome.router");
//users /users
const usersRouter = require("./users.route");
//products /products
const productsRouter = require("./products.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);

module.exports = masterRouter;

