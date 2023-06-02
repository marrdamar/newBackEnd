const mongoose = require("mongoose");
const errorSchema = require("../schemas/error.schema");

const Error = mongoose.model("error", errorSchema);

const logError = async ({ status, message }, cb) => {
  try {
    await Error.create({ status, message });
    cb(null, { message: "OK" });
  } catch (error) {
    cb(error, null);
  }
};

const getError = async (cb) => {
  try {
    const result = await Error.find({});
    cb(null, result);
  } catch (error) {
    cb(error, null);
  }
};

module.exports = { logError, getError };