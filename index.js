const express = require("express");

const app = express()
const PORT = 8080;

app.get("/", (req,res) => {
    const path = require("path");
    res.status(200).sendFile(path.join(__dirname, "/src/html/welcome.html"))
})

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    console.log(`Welcome`);
});