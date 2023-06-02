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
      // const result = await transactionsModel.getHistory(authInfo);
      // const hasil = result.rows.reduce((acc, current) => {
      //   const item = acc.find((item) => item.history_id === current.history_id);
      //   if (!item) {
      //     acc.push({
      //       history_id: current.history_id,
      //       display_name: current.display_name,
      //       notes: current.notes,
      //       products: [
      //         {
      //           product_id: current.product_id,
      //           prod_name: current.prod_name,
      //           price: current.price,
      //           size: current.size,
      //           cost: current.cost,
      //           qty: current.qty,
      //           subtotal: current.subtotal,
      //           promo_id: current.promo_id,
      //           coupon_code: current.coupon_code,
      //           discount: current.discount,
      //           delivery: current.delivery,
      //           shipping_price: current.shipping_price,
      //           payments: current.payments,
      //           status: current.status,
      //         },
      //       ],
      //     });
      //   } else {
      //     item.products.push({
      //       product_id: current.product_id,
      //       prod_name: current.prod_name,
      //       price: current.price,
      //       size: current.size,
      //       cost: current.cost,
      //       qty: current.qty,
      //       subtotal: current.subtotal,
      //       promo_id: current.promo_id,
      //       coupon_code: current.coupon_code,
      //       discount: current.discount,
      //       delivery: current.delivery,
      //       shipping_price: current.shipping_price,
      //       payments: current.payments,
      //       status: current.status,
      //     });
      //   }
      //   return acc;
      // }, []);
  
      // res.status(201).json({
      //   data: hasil,
      // });
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
      const result = await transactionsModel.getPaidOrder();
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
      const result = await transactionsModel.getPendingOrder();
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

  const getAllOrders = async (req, res) => {
    try {
      const result = await transactionsModel.getAllOrder();
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
    getAllOrders,
    setCancelOrders
}