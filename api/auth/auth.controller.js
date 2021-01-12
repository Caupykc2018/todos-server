'use strict';

const {User} = require("../../models");

exports.login = async ctx => {
  console.log(ctx.request);
  const {login, password } = ctx.request.body;

    const user = await User.findOne({login: login, password: password});
    if(!user) {
        ctx.throw(404, "Incorrect login or password");
    }

    ctx.body = {
        id: user._id,
        login: user.login
    };
};

exports.register = async ctx => {
  const {login, password } = ctx.request.body;

  const user = await User.create({login: login, password: password});

  ctx.body = {
      id: user._id,
      login: user.login
  };
};
