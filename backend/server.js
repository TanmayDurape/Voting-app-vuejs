var express = require('express');
var server = express();
var routes = require('./routes/routes');
var mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/live-polling-database", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("DB Connectedddd!!!!!!!!!!!");
  })
  .catch((error) => {
    console.log("Error connecting to the database:", error);
  });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(8000, (error) => {
  if (error) {
    console.log("Error starting the server:", error);
  } else {
    console.log("Server started");
  }
});