const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const errorHandler = require('./middleware/error.middleware');
const applyApiMiddleware = require('./api');

const server = new Koa();

require("./models/connection")();
  

server
  .use(errorHandler)
  .use(bodyParser())
  .use(async (ctx, next) => {
    console.log(ctx)
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-type');
    if(ctx.request.method == "OPTIONS") {
      ctx.status = 204;
      return;
    }
    await next()
  });

applyApiMiddleware(server);

module.exports = server;
