const Sequelize = require('sequelize');

const sequelize = new Sequelize('class', 'root', '123456', {
    dialect: 'mysql',
    host: 'localhost',
    port: '4306',
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

const Lesson = sequelize.define('lessons', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER(11)
        },
        name: Sequelize.STRING(20),
        start: Sequelize.INTEGER(11),
        end: Sequelize.INTEGER(11),
        day: Sequelize.STRING(5),
        time: Sequelize.STRING(10),
        place: Sequelize.STRING(10),
        teacher: Sequelize.STRING(10),
        class: Sequelize.INTEGER(11),
        major: Sequelize.STRING(5)
    }, {
        timestamps: false
    }
);

//发送班级课表数据
exports.getLessons = (major) => {
    return Lesson.findAll({
        where: {
            major: major,
        }
    });
};