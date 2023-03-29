const express = require("express");
const morgan = require("morgan");

const app = express()
const PORT = 8080;

app.use(morgan(":method :url :status :res[content-length] = :response-time ms"));

//parser untuk body
app.use(express.urlencoded({ extended : false})); //form-urlencoded
app.use(express.json()); //raw json

const masterRouter = require("./src/routers");

app.use(masterRouter);

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    console.log(`Welcome`);
});