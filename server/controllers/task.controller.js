const db = require('../models');

const User = db.user;
const Task = db.task;

exports.createTask = (req, res) => {
    return Task.create({
        task: req.body.task,
        criteria: req.body.criteria,
        date: req.body.date,
        userId: req.body.userId
    })
    .then((task) => {
        console.log('>> Created task: ' + JSON.stringify(task, null, 4));
        res.status(200).send(task);
    })
    .catch((error) => {
        return res.status(500).send({
            message: `Ошибка на сервере - ${error.message}`
        })
    })
};

exports.findTaskByID = (req, res) => {
    return Task.findByPk(req.id, { include: ['user'] })
        .then((task) => {
            res.status(200).send(task);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message
            });
        })
}

exports.findTaskAll = (req, res) => {
    console.log('ТЕЛО ЗАПРОСА ' + req.userId)
    return Task.findAll({
        where: {
            userId: req.userId
        }
    })
    .then((tasks) => {
        res.status(200).send(tasks);
    })
    .catch((error) => {
        res.status(500).send({
            message: error.message
        })
    })
} 

exports.updateTask = (req, res) => {
    return Task.update(req.body.updateTask, {
        where: {
            taskId: req.id
        }
    })
    .then(() => {
        res.status(200).send({
            message: 'Вы успешно обновили задачу'
        })
    })
    .catch(() => {
        res.status(500).send({
            message: 'Не удалось обновить задачу'
        })
    })
}