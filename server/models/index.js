const config = require('../config/db.config');

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user.modal.js')(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.task = require('./task.model')(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles"
});

db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.user.hasMany(db.task, { as: 'tasks' });
db.task.belongsTo(db.user, {
    foreignKey: 'userId',
    as: 'user'
})

db.ROLES = ["user", "admin"];

module.exports = db;

