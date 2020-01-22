const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api.js");
const errorHandler = require('./server/middlewares/errorHandler/errorHandler')
const config = require('./config/config')
const port = 8080
const dbSetup = require('./server/db/dbSetup')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})
// app.use(express.static(path.join(__dirname, 'build')))
app.use("/", api);

// app.use(errorHandler)

// dbSetup.dbSetup()

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
