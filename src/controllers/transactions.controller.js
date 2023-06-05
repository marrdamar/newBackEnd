const db = require("../configs/postgre");

const transactionsModel = require("../models/trasactions.model");

const createTransactions = async (req, res) => {
    const { authInfo, body } = req;
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const result = await transactionsModel.createHistories(
        client,
        body,
        authInfo.id
      );
      console.log(result)
      const transactionId = result.rows[0].id;
      await transactionsModel.createDetailTransaction(
        client,
        body,
        transactionId
      );
      console.log(transactionId)
      await client.query("COMMIT");
      const historyWithDetails = await transactionsModel.getTransactions(
        client,
        transactionId
      );
      client.release();
      res.status(201).json({
        msg: "Add Transactions Success...",
        data: historyWithDetails.rows,
      });
    } catch (err) {
      console.log(err);
      await client.query("ROLLBACK");
      client.release();
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };

  const getHistory = async (req, res) => {
    try {
      const { authInfo } = req;
      const result = await transactionsModel.getHistories(authInfo);
      res.status(200).json({
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };

  const setPaidOrders = async (req, res) => {
    try {
      const result = await transactionsModel.setPaidOrder(req.params);
      console.log(result)
      res.status(200).json({
        msg: "Transaksi telah dibayar!",
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };

  const getPaidOrders = async (req, res) => {
    try {
      const { authInfo } = req;
      const result = await transactionsModel.getPaidOrder(authInfo);
      res.status(200).json({
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };

  const getPendingOrders = async (req, res) => {
    try {
      const { authInfo } = req;
      const result = await transactionsModel.getPendingOrder(authInfo);
      res.status(200).json({
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };

  const getCanceledOrders = async (req, res) => {
    try {
      const { authInfo } = req;
      const result = await transactionsModel.getCancelOrder(authInfo);
      res.status(200).json({
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };

  const setCancelOrders = async (req, res) => {
    try {
      const result = await transactionsModel.setCancelOrder(req.params);
      // console.log(req.params)
      // console.log(result)
      res.status(200).json({
        msg: "Transaksi telah dibatalkan!",
        data: result.rows,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };


module.exports = {
    createTransactions,
    getHistory,
    setPaidOrders,
    getPaidOrders,
    getPendingOrders,
    getCanceledOrders,
    setCancelOrders
}