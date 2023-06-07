const cloudinary = require("cloudinary");

// const { CLOUD_NAME, CLOUD_KEY, CLOUD_SECRET } = require("./env");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
    secure : true,
});

module.exports = cloudinary;