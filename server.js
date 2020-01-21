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
// app.use(express.static(path.join(__dirname, 'build')))
app.use("/", api);
// app.use(errorHandler)

// dbSetup.dbSetup()

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.listen(port, () => console.log(`Server is running on port ${port}`));
