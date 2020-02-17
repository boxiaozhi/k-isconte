const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class User extends Model {}

User.init(
{
        username: {
            type: Sequelize.STRING,
            comment: '用户名',
        },
        password: {
            type: Sequelize.STRING,
            comment: '密码',
        }
    },
{
    sequelize,
    modelName: 'user',
    tableName: 'users',
});

module.exports = User;