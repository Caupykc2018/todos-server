'use strict';

const controller = require('./todos.controller');

module.exports = Router => {
  const router = new Router({
    prefix: "/todos"
  });

  router
    .get('/', controller.getAll)
    .post('/', controller.create)
    .del('/:todoId', controller.deleteOneById)
    .put('/:todoId', controller.updateOneById)
    .post('/toggle-all', controller.toggleAll)
    .post('/clear-completed', controller.clearCompleted);

  return router;
};