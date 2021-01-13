'use strict';

const {Todo, User} = require("../../models");

exports.getAll = async ctx => {
    const userId = ctx.request.header["user-id"];

    ctx.assert(userId, 401, "No user");

    const todos = await Todo.find({userId: userId});

    ctx.body = todos;
};

exports.create = async ctx => {
    const userId = ctx.request.header["user-id"];
    const { title } = ctx.request.body;

    ctx.assert(userId, 401, "No user");

    const user = await User.findOne({_id: userId});

    ctx.assert(user, 400, "Incorrect userId");

    ctx.assert(user, 400, "No title");

    const todo = await Todo.create({title: title, userId: userId});

    ctx.body = todo;
}

exports.deleteOneById = async ctx => {
    const userId = ctx.request.header["user-id"];
    const {todoId} = ctx.params;

    ctx.assert(userId, 401, "No user");

    const todo = await Todo.findOneAndDelete({_id: todoId});

    ctx.body = todo;
}

exports.updateOneById = async ctx => {
    const userId = ctx.request.header["user-id"];
    const {todoId} = ctx.params;

    const {title, isCompleted} = ctx.request.body;
    
    ctx.assert(userId, 401, "No user");

    const updateData = {};

    if(title) {
        updateData.title = title;
    }

    if(isCompleted) {
        updateData.isCompleted = isCompleted;
    }

    const todo = await Todo.findByIdAndUpdate({_id: todoId}, updateData, {new: true});

    ctx.body = todo;
};

exports.toggleAll = async ctx => {
    const userId = ctx.request.header["user-id"];
    
    ctx.assert(userId, 401, "No user");

    const activeTodos = await Todo.find({isCompleted: false, userId: userId});
    let editedTodos;

    if(activeTodos.length) {
        editedTodos = activeTodos.map(todo => {
            todo.isCompleted = true;
            todo.save();
            return todo;
        });
    }
    else {
        const allTodos = await Todo.find({userId: userId});

        editedTodos = allTodos.map(todo => {
            todo.isCompleted = false;
            todo.save();
            return todo;
        });
    }
    
    ctx.body = editedTodos;
}

exports.clearCompleted = async ctx => {
    const userId = ctx.request.header["user-id"];
    
    ctx.assert(userId, 401, "No user");

    const completedTodos = await Todo.find({isCompleted: true, userId: userId});

    completedTodos.forEach(todo => todo.remove());

    ctx.body = completedTodos;
}
