const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const movieRouter = require('../routers/movieRouter');
const userRouter = require('../routers/userRouter');
const { login } = require('../controllers/userControllers/login');
const { createUser } = require('../controllers/userControllers/createUser');
const { auth } = require('../middlewares/auth');

routes.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(20),
      name: Joi.string().min(2).max(30),
    }),
  }),
  login,
);
routes.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6).max(20),
      name: Joi.string().min(2).max(30),
    }),
  }),
  createUser,
);

routes.use(auth);

routes.use('/', movieRouter);
routes.use('/', userRouter);

module.exports = routes;
