const express = require('express');
const todolistRouter = express.Router();
const { v4: uuidv4 } = require('uuid');

const tasks = [];

// middleware that is specific to this router
todolistRouter.use(function timeLog(req, res, next) {
  console.log('Time: ', Date.now());
  next();
});

todolistRouter.get('/', (req, res) => {
  res.json(tasks);
});

todolistRouter.get('/:id', (req, res) => {
    const taskId = req.params.id
    const task = tasks.find((currentTask) => currentTask.id === taskId)
    if (!task) {
        res.status(404).send('Task not found.');
        return;
    }
    res.json(task);
});

// define the about route
todolistRouter.post('/', (req, res) => {
    const body = req.body
    if (!body.message) {
        res.status(400).send('Message field is missing.')
    }
    const task = {
        id: uuidv4(),
        message: body.message,
    }
    tasks.push(task);
    res.status(201).json({
        message: 'Task created with success.',
        task,
    });
});

// define the about route
todolistRouter.delete('/:id', (req, res) => {
    const taskId = req.params.id
    const task = tasks.find((currentTask) => currentTask.id === taskId)
    if (!task) {
        res.status(404).send('Task not found.');
        return;
    }
    let index = null;
    tasks.some((currentTask, currentIndex) => {
        if (currentTask.id === taskId) {
            index = currentIndex;
            return true;
        }
    })
    if (index === null) {
        res.status(404).send('Task not found.');
        return;
    }
    tasks.splice(index, 1); 
    res.status(200).send({
        message: 'Task deleted with success.',
        task,
    });
});

module.exports = todolistRouter;