const db = require('../models');

const User = db.user;
const Task = db.task;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};
  
exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};
  
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.findUserById = (req, res) => {
    return User.findByPk(req.userId, { include: ['tasks'] })
        .then((user) => {
            res.status(200).send(user);
        })
        .catch((error) => {
            res.status(500).send({
                message: error.message
            });
        })
}
  
