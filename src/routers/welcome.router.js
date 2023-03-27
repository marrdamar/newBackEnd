const { Router } = require("express");
const path = require("path");
const welcomeRouter = Router();

//localhost /
welcomeRouter.get("/", (req, res)=>{
    res.status(201).sendFile(path.join(__dirname, "../html/welcome.html"))
})

module.exports = welcomeRouter;