const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();

const limits = 2e6;

const fileFilter = (req, file, cb) => {
	const pattern = /png|jpg|jpeg|webp/i;
	const ext = path.extname(file.originalname);
	if (!pattern.test(ext))
		return cb(new Error("Extension should be in png, jpg, jpeg or webp"), false);
	cb(null, true);
};

const upload = multer({
	storage,
	limits,
	fileFilter,
});

module.exports = upload;
