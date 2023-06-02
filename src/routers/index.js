const { Router } = require("express");
//welcome /
const welcomeRouter = require("./welcome.router");
//users /users
const usersRouter = require("./users.route");
//products /products
const productsRouter = require("./products.route");
//auth /
const authRouter = require("./auth.route");
//transactions /
const transactionRouter = require("./transactions.route");
//promos /
const promosRouter = require("./promos.route");

const masterRouter = Router();
masterRouter.use("/", welcomeRouter);
masterRouter.use("/users", usersRouter);
masterRouter.use("/products", productsRouter);
masterRouter.use("/auth", authRouter);
masterRouter.use("/transactions", transactionRouter);
masterRouter.use("/promos", promosRouter);


module.exports = masterRouter;

