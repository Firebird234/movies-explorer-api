const { JWT_SECRET, NODE_ENV } = process.env;

const jwt = require('jsonwebtoken');
const { secretKeyDev } = require('../const/config');
const { authorizationMessage } = require('../const/constants');
const { Authorization } = require('../errors/Authorization');

const jwtKey = NODE_ENV === 'production' ? JWT_SECRET : secretKeyDev;

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return next(new Authorization(authorizationMessage));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, jwtKey);
  } catch (err) {
    return next(new Authorization(authorizationMessage));
  }
  req.user = payload.id;
  return next();
};

// module.exports.auth = (req, res, next) => {
//   const authorization = req.cookies.token;

//   if (!authorization) {
//     return next(new Authorization());
//   }
//   let payload;
//   try {
//     payload = jwt.verify(authorization, 'abrakadabra,kurwa');
//   } catch (err) {
//     return next(new Authorization());
//   }

//   req.user = payload;
//   return next();
// };
