const dotenv = require('dotenv').config()
const express = require("express");
const app = express();
const http = require('http').createServer(app);
// const io = require('socket.io')(http);
const bodyParser = require("body-parser");
const path = require("path");
const api = require("./server/routes/api.js");
const errorHandler = require('./server/middlewares/errorHandler/errorHandler')
const config = require('./config/config')
// const dbSetup = require('./server/db/dbSetup')
// const http = require('http').createServer(app);
// const io = require('socket.io')(http);
const controller = require('./server/middlewares/controllers/controller')
const queries = require('./server/db/queries')

const PORT = 8080
const io2 = require('./server/socket/socket')
// .listen(app)

  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
  next()
})


app.use("/", api);
app.use(errorHandler)


app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// app.use((req, res) => res.sendFile(INDEX, { root: __dirname }))
http.listen(process.env.PORT || PORT, function () {
    console.log('listening on *:8080');
});