const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../configs/env")

const blacklist = [];

const checkToken = (req, res, next) => {
    //ambil token dari header
    const bearerToken = req.header("Authorization");
    const customHeader = req.header("custom");
    console.log(customHeader, bearerToken);
    //via authorization header berbentuk bearer token
    //bearer token
    //verif token
    if (!bearerToken) return res.status(403).json({
        msg: "Silahkan login terlebih dahulu",
    });
    const token = bearerToken.split(" ")[1]; //[bearer, token]
    jwt.verify(token, jwtSecret, (err, payload) => {
        //jika false, lanjut ke tolak access
        //error jwt (client)
        if(err && err.name) return res.status(403).json({
            msg: err.message,
        });
        //generic error (server)
        if(err) return res.status(500).json({
            msg : "Internal Server Error",
        })
        //jika true, lanjut ke controller
        //attach payload ke object request
        req.authInfo = payload;
        next();
    });
};

const blacklistToken = (req, res, next) => {
    try {
      const bearerToken = req.header("Authorization");
      if (!bearerToken) {
        return res.status(403).json({
          msg: "Please Login...",
        });
      }
      const token = bearerToken.split(" ")[1];
      jwt.verify(token, jwtSecret, (err, payload) => {
        blacklist.push(token);
        console.log(blacklist);
        req.authInfo = payload;
        res.status(200).json({
          msg: "Logout Success...",
        });
        return
      });
      next();
    } catch (error) {
      console.log(error);
  
      res.status(500).json({
        msg: "Internal server Error",
      });
    }
  };

module.exports = {
    checkToken,
    blacklistToken
}