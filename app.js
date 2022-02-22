const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rate-limiter');
const { NoSuchRouteError } = require('./errors/NoSuchRouteError');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const routes = require('./routes/index');
const { errHandler } = require('./middlewares/errHandler');
const { mongoUrlProd } = require('./const/config');
const { noSuchRouteMessage } = require('./const/constants');
require('dotenv').config();

const { mongoUrlDev, NODE_ENV } = process.env;
const mongoUrl = NODE_ENV === 'production' ? mongoUrlProd : mongoUrlDev;
mongoose.connect(mongoUrl);

const app = express();
app.use(helmet());

app.use(requestLogger);
app.use(limiter);
app.use(cors);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

app.use(routes);

app.use((req, res, next) => {
  // res.status(404).send({ message: 'Чет ниработает ничо, ну соре тогда' });
  next(new NoSuchRouteError(noSuchRouteMessage));
});

app.use(errorLogger);
app.use(errors());

app.use(errHandler);

app.listen(3000, () => {
  console.log('ПОРТ ЕБОШИТ КАК КОНЬ');
});
