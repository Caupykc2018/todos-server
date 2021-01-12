'use strict';

const controller = require('./auth.controller');

module.exports = Router => {
  const router = new Router();

  router
  .post('/login', controller.login)
  .post('/register', controller.register);

  return router;
};