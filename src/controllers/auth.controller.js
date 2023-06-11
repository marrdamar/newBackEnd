const jwt = require("jsonwebtoken");
const authModels = require("../models/auth.model");
// require("dotenv").config();
const {jwtSecret} = require("../configs/env")
const bcrypt = require("bcrypt");
// const response = require("../utils/response");
const db = require("../configs/postgre");
const login = async (req, res) => {
    try {
        //ambil email dan pwd dari body
        const { body } = req;
        //verifikasi ke db
        const result = await authModels.userVerification(body.email);
        //jika true, maka create jwt
        //jika false, maka error handling
        if (result.rows.length < 1)
        return res.status(401).json({
            msg: "Email / Password Salah!",
        });
        // console.log(result)
        const {
            id,
            email,
            password,
            phone_number,
            profile_image,
            display_name
        } = result.rows[0];
        // console.log(result.rows[0])
        const isPassValid = await bcrypt.compare(body.password, password);
        // console.log(isPassValid)
        if (result.rows.length < 1 || !isPassValid) {
            res.status(401).json({
                msg: "Email / Password Salah",
            });
            return;
        }
        
        const dataUser = {
            id,
            email,
            phone_number,
            profile_image,
            display_name
        };
        
        const expIn = 60;
        const jwtOptions = {expiresIn: `${expIn}m`}
        //   console.log(jwtOptions);
        jwt.sign(dataUser, jwtSecret, jwtOptions, async (err, token) => {
            console.log(jwtOptions)
            if (err) {
            console.log(err);
            res.status(500).json({
                err
            });
            return;
            }
            await authModels.createToken(id, expIn, token,);
            res.status(200).json({
              msg: "Welcome...",
              token,
              dataUser,
            });
          });
        } catch (err) {
          console.log(err);
          res.status(500).json({
            msg: "Internal Server Error...",
          });
        }
      };

      
        
        // const { password } = result.rows[0];
        // const isPwdValid = await bcrypt.compare(body.password, password);
        // if (!isPwdValid) {
        //     return (res.status(401).json({
        //         msg: "Email atau Password Salah!",
        //     }));
        // };

        //buat token
//         jwt.sign(
//             result.rows[0],
//             jwtSecret,
//             {
//                 expiresIn: "5m",
//             },
//             (err, token) => {
//                 if (err) throw err;
//                 res.status(200).json({
//                     msg: "Selamat Datang",
//                     token,
//                 })
//             });
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({
//             msg: "Internal Server Error",
//         });
//     }
// };

const privateAccess = (req, res) => {
    const { id, email } = req.authInfo;
    res.status(200).json({
        payload: { id, email },
        msg: "OK",
    })
};

const insertUsers = async (req, res) => {
    const client = await db.connect();
    try {
        const { email, password, phone_number } = req.body;
        const verificationResult = await authModels.userVerification(email);
        if (verificationResult.rows.length > 0) {
            return res.status(400).json({
                msg: "email has been registered!"
            })
        }

        await client.query("BEGIN");
        const hashedPassword = await bcrypt.hash(password, 10);
        const data = { email, hashedPassword, phone_number };
        const insertUsers = await authModels.insertUsers(client, data);
        const subId = insertUsers.rows[0].id;
        // const result = await authModels.insertUsers(client, subId, email);
        // console.log(result);
        // const userId = result.rows[0];
        await authModels.insertDetailUsers(client, subId, email);
        await client.query("COMMIT");
        client.release();
        res.status(200).json({
            message: "OK",
            data: insertUsers.rows,
        });
    } catch (err) {
        console.log(err.message);
        await client.query("ROLLBACK");
        client.release();
        return res.status(500).json({
            msg: "Internal Server Error!"
        })
    }
};

const forgotPass = async (req, res) => {
    try {
        const { body } = req;
        const checkEmail = await authModels.getAccount(body.email);
        if (checkEmail.rows.length > 1) {
            res.status(401).json({
                msg: "Email Not Register...",
            });
        }
        const userId = checkEmail.rows[0].id;
        const randomChars = "0123456789qwertyuiopASDFGHJKLzXcVbNm";
        let otpCode = "";
        for (let i = 0; i < 5; i++) {
            otpCode += randomChars[Math.floor(Math.random() * randomChars.length)];
        }
        const result = await authModels.forgotPass(userId, otpCode);
        console.log("CODE OTP : ", result.rows[0].otp_code);
        res.status(200).json({
            msg: "Created OTP Code...",
            data: result.rows[0].otp_code,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

const editPassbyForgot = async (req, res) => {
    try {
        const { body } = req;
        const checkOtp = await authModels.getUserbyForgot(body);
        if (checkOtp.rows.length < 1) {
            res.status(403).json({
                msg: "Kode OTP Wrong.!",
            });
            // console.log(await authModels.getUserbyForgot(body))
            return;
        }
        console.log(checkOtp)
        const userId = checkOtp.rows[0].id;
        console.log(userId)
        // const saltRounds = await bcrypt.genSalt(10)
        // console.log(saltRounds)
        const myPassword = body.password;
        const mySalt = await bcrypt.genSalt(10)
        console.log(myPassword)
        console.log(mySalt)
        const hashedPassword = await bcrypt.hash(myPassword, mySalt);
        console.log(hashedPassword)
        await authModels.editPassword(hashedPassword, userId);
        console.log("OK sekarang sudah selesai");
        res.status(200).json({
            msg: "Password Updated...",
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server Error...",
        });
    }
};

const logout = async (req, res) => {
    try {
        await authModels.logout(req.authInfo.id);
        console.log(req.authInfo);
      res.status(200).json({
        msg: "You Have Been Logout...",
    });
    return
    } catch (err) {
      console.log(err);
      res.status(500).json({
        msg: "Internal Server Error...",
      });
    }
  };



module.exports = { login, privateAccess, insertUsers, forgotPass, editPassbyForgot, logout };