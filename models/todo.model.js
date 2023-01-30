const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
    {
        todo: {
            type: String,
            required: true,
        },
        status: {
            type: Boolean,
            required: true
        },
        author_id: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Todo = mongoose.model('todo', todoSchema);

module.exports = Todo;