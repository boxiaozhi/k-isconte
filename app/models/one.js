const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class One extends Model {}

One.init(
    {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        _id: {
            type: Sequelize.INTEGER,
            comment: '原始ID',
        },
        category: {
            type: Sequelize.INTEGER,
            comment: '分类ID',
        },
        title: {
            type: Sequelize.STRING,
            comment: '标题',
        },
        date_str: {
            type: Sequelize.STRING,
            comment: '日期字符',
        },
        date_stamp: {
            type: Sequelize.DATE,
            comment: '日期时间戳',
        },
        data: {
            type: Sequelize.JSON,
            comment: '原始数据',
        }
    },
    {
        sequelize,
        modelName: 'one',
        tableName: 'ones',
    });

module.exports = One;