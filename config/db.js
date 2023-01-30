const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

let connectDB = ()=> {
    mongoose.connect('mongodb+srv://test:test@cluster0.bmoghx8.mongodb.net/demo?retryWrites=true&w=majority');
    // mongoose.connect('mongodb://localhost:27017/todo_app');
}

module.exports = connectDB;