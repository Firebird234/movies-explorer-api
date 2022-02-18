const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
// const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./middlewares/rate-limiter');
// const validator = require('validator');
// const movieRouter = require('./routers/movieRouter');
// const userRouter = require('./routers/userRouter');
// const { login } = require('./controllers/userControllers/login');
// const { createUser } = require('./controllers/userControllers/createUser');
// const { auth } = require('./middlewares/auth');
// const { ValError } = require('./errors/ValError');
const { NoSuchRouteError } = require('./errors/NoSuchRouteError');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { cors } = require('./middlewares/cors');
const routes = require('./routes/index');

mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();
app.use(helmet());

app.use(limiter);
app.use(cors);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

app.use(requestLogger);

app.use('/', routes);

// app.post(
//   '/signin',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(6).max(20),
//       name: Joi.string().min(2).max(30),
//     }),
//   }),
//   login,
// );
// app.post(
//   '/signup',
//   celebrate({
//     body: Joi.object().keys({
//       email: Joi.string().required().email(),
//       password: Joi.string().required().min(6).max(20),
//       name: Joi.string().min(2).max(30),
//     }),
//   }),
//   createUser,
// );

// app.use(auth);

// app.use('/', movieRouter);
// app.use('/', userRouter);
app.use((req, res, next) => {
  // res.status(404).send({ message: 'Чет ниработает ничо, ну соре тогда' });
  next(new NoSuchRouteError());
});

app.use(errorLogger);
app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode === undefined ? 500 : err.statusCode).send({
    message: `${err.message} thats it, ${err}`,
  });
  next();
});

app.listen(3000, () => {
  console.log('ПОРТ ЕБОШИТ КАК КОНЬ');
});
