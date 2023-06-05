const { Router } = require("express");
const { checkToken } = require("../middlewares/auth");
const { checkRole } = require("../middlewares/checkRole");
const transactionsController = require("../controllers/transactions.controller");
// const notificationsController = require("../controllers/notifications.controller");

const transactionRouter = Router();

transactionRouter.post("/", checkToken, transactionsController.createTransactions);
transactionRouter.get("/", checkToken, transactionsController.getHistory);
transactionRouter.patch("/paid/:id", checkToken, checkRole, transactionsController.setPaidOrders);
transactionRouter.get("/getpaid", checkToken, transactionsController.getPaidOrders);
transactionRouter.get("/getpending", checkToken, transactionsController.getPendingOrders);
transactionRouter.get("/getcancel", checkToken, transactionsController.getCanceledOrders);
transactionRouter.patch("/cancel/:id", checkToken, transactionsController.setCancelOrders);

module.exports = transactionRouter