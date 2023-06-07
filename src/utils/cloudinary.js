const cloudinary = require("../configs/cloudinary");
const path = require("path");
const dataUriParser = require("datauri/parser");

const uploader = async (req, prefix, id) => {
    const { file } = req;
    if(!file) return { data: null };
    //mendapatkan buffer dari multer
    const buffer = file.buffer;
    const ext = path.extname(file.originalname).toString();
    //buffer konversi menjadi datauri
    const parser = new dataUriParser();
    const datauri = parser.format(ext, buffer);
    const filename = `${prefix}-${file.fieldname}-${id}`;
    // console.log(filename);
    // console.log(buffer)
    // console.log(datauri)
    // console.log(ext)
    // console.log(file)
    //upload ke cloudinary
    try {
        const result = await cloudinary.uploader.upload(datauri.content, {
            public_id : filename,
            folder : "products",
        });
        return { data : result, msg: "OK" };
    } catch (err) {
        return { data : err, msg : "Upload Failed", err};
    }
};

// const uploader = async (req, prefix, id) => {
//     const { file } = req;
//     if (!file) return { data: null };
  
//     // Cek ukuran file
//     const fileSizeLimit = 2 * 1024 * 1024; // 2 MB
//     if (file.size > fileSizeLimit) {
//       return {
//         data: null,
//         msg: "File size exceeded the limit",
//         err: new Error("File size exceeded the limit"),
//       };
//     }
  
//     const buffer = file.buffer;
//     const ext = path.extname(file.originalname).toString();
  
//     const parser = new dataUriParser();
//     const datauri = parser.format(ext, buffer);
//     const filename = `${prefix}-${file.fieldname}-${id}`;
  
//     try {
//       const result = await cloudinary.uploader.upload(datauri.content, {
//         public_id: filename,
//         folder: "products",
//       });
//       return { data: result, msg: "OK" };
//     } catch (err) {
//       return { data: null, msg: "Upload Failed...", err };
//     }
//   };

module.exports = {uploader};