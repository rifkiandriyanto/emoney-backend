const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { port } = require('./src/configs');
const mainNavigation = require('./src/routes');

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.use('/', mainNavigation);

app.listen(
  port,
  console.log(`This server is running on port ${port}`),
  (err) => {
    if (err) {
      throw err;
    }
  }
);
