const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class UserApiToken extends Model {}

UserApiToken.init(
    {
        user_id: {
            type: Sequelize.INTEGER,
            comment: '用户ID',
        },
        token: {
            type: Sequelize.STRING,
            comment: 'TOKEN',
        },
    },
    {
        sequelize,
        modelName: 'user_api_token',
        tableName: 'user_api_tokens',
    });

module.exports = UserApiToken;