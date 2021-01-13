'use strict';

const {User} = require("../../models");

exports.login = async ctx => {
  const {login, password} = ctx.request.body;

  const user = await User.findOne({login: login, password: password});
  ctx.assert(user, 404, "Incorrect login or password");

  ctx.body = {
      id: user._id,
      login: user.login
  };
};

exports.register = async ctx => {
  const {login, password } = ctx.request.body;


  try {
    const user = await User.create({login: login, password: password});

    ctx.body = {
      id: user._id,
      login: user.login
    };
  }
  catch(e) {
    ctx.throw(400, "Login is not unique")
  }
};
