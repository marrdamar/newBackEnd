const express = require("express");

const app = express()
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
    console.log(`Welcome`);
});