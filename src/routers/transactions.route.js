const { Router } = require("express");
const { checkToken } = require("../middlewares/auth");
const { checkRole } = require("../middlewares/checkRole");
const transactionsController = require("../controllers/transactions.controller");
// const notificationsController = require("../controllers/notifications.controller");

const transactionRouter = Router();

transactionRouter.post("/", checkToken, transactionsController.createTransactions);
transactionRouter.get("/", checkToken, transactionsController.getHistory);
// transactionRouter.get("/getallorder", checkToken, checkRole, transactionsController)
transactionRouter.patch("/paid/:id", checkToken, checkRole, transactionsController.setPaidOrders);
transactionRouter.get(
    "/getpaid",
    checkToken,
    checkRole,
    transactionsController.getPaidOrders
  );

  transactionRouter.get(
    "/getpending",
    checkToken,
    checkRole,
    transactionsController.getPendingOrders
  );

  transactionRouter.get(
    "/getall",
    checkToken,
    checkRole,
    transactionsController.getAllOrders
  );
transactionRouter.patch("/cancel/:id", checkToken, checkRole, transactionsController.setCancelOrders);

module.exports = transactionRouter