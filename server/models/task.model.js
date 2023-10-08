module.exports = (sequelize, Sequelize) =>{
    const Task = sequelize.define('tasks', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        task: {
            type: Sequelize.STRING
        },
        criteria: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        }      
    });

    return Task;
}