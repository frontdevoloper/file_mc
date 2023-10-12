const authJwt = require('../middleware/authjwt');
const controller = require('../controllers/task.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post('/api/tasks/all', [authJwt.verifyToken], controller.findTaskAll);

    app.post('/api/tasks/add', [authJwt.verifyToken], controller.createTask);

    app.post('/api/tasks/update', [authJwt.verifyToken], controller.updateTask)

}