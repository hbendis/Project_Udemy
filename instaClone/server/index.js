const express = require("express");
const app = express();
const mongoose = require("mongoose");
const PORT = 5000;
const bcrypt = require('bcryptjs')
const { MONGOURI } = require("./keys");



require('./models/user')
require('./models/posts')
app.use(express.json())
app.use(require("./routes/auth"));
app.use(require("./routes/post"));



mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
// .then(() => console.log("connection to database Establish"));
mongoose.connection.on("connected", () => {
  console.log("Connected to mongo DATA BASE");
});
mongoose.connection.on("error", (err) => {
  console.log("Error connecting", err);
});

app.listen(PORT, () => {
  console.log("The server is running successful on port", PORT);
});
