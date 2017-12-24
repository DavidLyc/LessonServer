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

const User = sequelize.define('users', {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Sequelize.INTEGER(11)
        },
        name: Sequelize.STRING(45),
        password: Sequelize.STRING(45),
        class: Sequelize.STRING(10)
    }, {
        timestamps: false
    }
);

//验证登录
exports.validateLogin = (name, password) => {
    return User.findAll({
        limit: 1,
        where: {
            name: name,
            password: password
        }
    });
};

//用户注册
exports.register = (name, password, user_class) => {
    return new Promise((resolve) => {
        User.findAll({
            limit: 1,
            where: {
                name: name
            }
        }).then((result => {
            if (JSON.stringify(result) === '[]') {
                User.create({
                    name: name,
                    password: password,
                    class: user_class
                });
                resolve("ok");
            } else {
                resolve("dup");
            }
        }));
    });
};