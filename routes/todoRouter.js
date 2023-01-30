const { Router } = require('express');
const User = require('../models/user.model');
const Todo = require('../models/todo.model');
const authorize = require('../middleware/authorization');

const router = Router();  

router.get('/', authorize, async(req, res)=> {
    try {
        let { _id } = req.user;
        let todos = await Todo.find({ author_id: _id });
        res.send({
            success: true, 
            todos: todos
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

router.delete('/:id', authorize, async(req, res)=> {
    try {
        let id = req.params.id;
        let todo = await Todo.findOneAndDelete({ _id: id });
        res.send({
            success: true,
            message: 'Todo deleted Successfully'
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

router.post('/', authorize, async(req, res)=> {
    try {
        let { _id } = req.user;
        let {todo, status} = req.body;

        let response = await Todo.create({
            todo,
            status,
            author_id: _id
        });
        res.send({
            success: true,
            message: 'Todo added successfully',
            data: response
        })
    } catch (err) {
        res.send({
            success: false,
            message: err.message
        })
    }
})

module.exports = router;