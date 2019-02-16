import 'babel-polyfill';

import express from 'express';
import bodyParser from 'body-parser'
import passport from 'passport';
import App from '@client/App';
import '@env';

const contacts = require("./routes/api/contacts");
const proposals = require("./routes/api/proposals");

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport middleware
app.use(passport.initialize());

// Pasport Config
require('./passport')(passport);

// Use Routes
app.use("/api/contacts", contacts);
app.use("/api/proposals", proposals);

app.use(express.static('build/public'));

const initialState = {}
const store = configure(initialState);

app.get('*', (req, res) => {
  const context = {};

  const content = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
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
