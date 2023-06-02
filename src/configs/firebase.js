const { initializeApp, applicationDefault } = require("firebase/app");

const firebase = initializeApp({
    credential:applicationDefault(),
})

module.exports = firebase;