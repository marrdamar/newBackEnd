const express = require("express");
const morgan = require("morgan");
const cors = require('cors');

const app = express()
const PORT = 9999;

app.use(cors());

app.use(morgan(":method :url :status :res[content-length] = :response-time ms"));

app.use(express.static("public"));


//parser untuk body
app.use(express.urlencoded({ extended : false})); //form-urlencoded
app.use(express.json()); //raw json

const masterRouter = require("./src/routers");

app.use(masterRouter);

app.listen(PORT, '192.168.43.133', () => {
    console.log(`Server is running at ${PORT}`);
    console.log(`Welcome`);
});

module.exports = app;