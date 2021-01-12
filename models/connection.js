const mongoose = require("mongoose");

module.exports = async () => {
    await mongoose.connect('mongodb://localhost:27017/todos', {
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useCreateIndex: true,
        useFindAndModify: false
    });
}