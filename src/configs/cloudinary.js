const cloudinary = require("cloudinary");

const { cloudName, cloudKey, cloudSecret } = require("./env");

cloudinary.config({
    cloud_name: cloudName,
    api_key: cloudKey,
    api_secret: cloudSecret,
    secure : true,
});

module.exports = cloudinary;