const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
const { jwtSecret } = require("../configs/env");

const login = async (req, res) => {
    try {
    //ambil email dan pwd dari body
    const { body } = req;
    //verifikasi ke db
    const result = await authModels.userVerification(body);
    //jika true, maka create jwt
    //jika false, maka error handling
    if (result.rows.length < 1) return res.status(401).json({
        msg: "Email / Password Salah!",
    });

    //buat token
    jwt.sign(result.rows[0], jwtSecret, {
        expiresIn : "5m",
    }, (err, token) => {
        if (err) throw err;
        res.status(200).json({
            msg: "Selamat Datang",
            token,
        })
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server Error",
        });
    }
};

module.exports = { login };