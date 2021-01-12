'use strict';

const controller = require('./todos.controller');

module.exports = Router => {
  const router = new Router({
    prefix: "/todos"
  });

  router
    .get('/', controller.getAll)
    .post('/', controller.create)
    .del('/', controller.deleteAllByParams)
    .del('/:todoId', controller.deleteOneById)
    .put('/:todoId', controller.updateOneById);

  return router;
};