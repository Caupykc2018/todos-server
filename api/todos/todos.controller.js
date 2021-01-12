'use strict';

const {Todo, User} = require("../../models");

exports.getAll = async ctx => {
    const userId = ctx.request.header["user-id"];

    if(!userId) {
        ctx.body = "No user"
    }

    const todos = await Todo.find({userId: userId});

    ctx.body = todos;
};

exports.create = async ctx => {
    const userId = ctx.request.header["user-id"];
    const { title } = ctx.request.body;

    if(!userId) {
        ctx.body = "No user";
    }

    const user = await User.findOne({_id: userId});

    if(!user) {
        ctx.body = "Incorrect userId";
    }

    if(!title) {
        ctx.body = "No title";
    }

    const todo = await Todo.create({title: title, userId: userId});

    ctx.body = todo;
}

exports.deleteOneById = async ctx => {
    const userId = ctx.request.header["user-id"];
    const {todoId} = ctx.params

    console.log(todoId);
    
    if(!userId) {
        ctx.body = "No user";
    }

    const todo = await Todo.findOneAndDelete({_id: todoId});

    ctx.body = todo;
}

exports.deleteAllByParams = async ctx => {
    
}

exports.updateOneById = async ctx => {
    const userId = ctx.request.header["user-id"];
    const {todoId} = ctx.params;

    const {isCompleted} = ctx.request.body;
    
    if(!userId) {
        ctx.body = "No user";
    }

    const todo = await Todo.findByIdAndUpdate({_id: todoId}, {isCompleted: isCompleted}, {new: true});

    ctx.body = todo;
};
