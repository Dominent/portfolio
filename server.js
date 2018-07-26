const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');

const contacts = require("./routes/api/contacts");

const config = require('./configuration/config');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
const db = config.mongo.uri;

// Connect to MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Pasport Config
require('./configuration/passport')(passport);

// Use Routes
app.use("/api/contacts", contacts);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('./client/build'));

  app.get('*', (req, res) =>  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server runing on port: ${port}`));
