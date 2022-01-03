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

app.use('/public', express.static('public'))
app.use('/profile', express.static('/src/assets/user'))
app.use('/banner', express.static('/src/assets/banner'));


app.listen(
  port,
  console.log(`This server is running on port ${port}`),
  (err) => {
    if (err) {
      throw err;
    }
  }
);
