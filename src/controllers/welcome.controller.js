const path = require("path");
const welcomePage = (req, res)=>{
    res.status(201).sendFile(path.join(__dirname, "../html/welcome.html"));
};

module.exports =  {
    welcomePage,
};