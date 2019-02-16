import 'babel-polyfill';

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require('passport');
const path = require('path');

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");
const files = require("./routes/api/files");

const contacts = require("./routes/api/contacts");
const proposals = require("./routes/api/proposals");

const config = require('./configuration/config');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// // DB Config
// const db = config.mongo.uri;

// // Connect to MongoDB
// mongoose
//   .connect(db)
//   .then(() => console.log("MongoDB Connected"))
//   .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Pasport Config
require('./configuration/passport')(passport);

// Use Routes
app.use("/api/contacts", contacts);
app.use("/api/proposals", proposals);

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('./client/build'));

//   app.get('*', (req, res) =>  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
// }

app.use(express.static('build/public'));

import AppRouter from '../client/app-router';

const initialState = {}
const store = configure(initialState);

app.get('*', (req, res) => {
  const context = {};

  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <AppRouter />
      </StaticRouter>
    </Provider>
  )

  const preloadedState = store.getState();

  res.status(200).send(template({ content, state: preloadedState }))
})

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server runing on port: ${port}`);
});
