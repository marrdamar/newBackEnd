const mongoose = require("mongoose");

const errorSchema = new mongoose.Schema({
  status: { type: Number, required: true },
  message: String
});

module.exports = errorSchema;