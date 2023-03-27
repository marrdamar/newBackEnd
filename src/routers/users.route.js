const { Router } = require("express");
const db = require("../configs/postgre");
const usersRouter = Router();

//localhost /users
usersRouter.get("/", (req,res) => {
    // const path = require("path");
    // res.status(200).sendFile(path.join(__dirname, "/src/html/welcome.html"))
    db.query("select id, email, phone_number from users", 
    (err, result) => {
        if (err) {
            console.log(err.message);
            res.status(500).json({
                msg: "Internal Server Error",
            });
            return;
        }
        res.status(200).json({
            data: result.rows
        });
    });
});

module.exports = usersRouter;