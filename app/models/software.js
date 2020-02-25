const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class Software extends Model {}

Software.init(
    {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            comment: '名称',
        },
        alias: {
            type: Sequelize.STRING,
            comment: '别名',
        },
        code: {
            type: Sequelize.STRING,
            comment: '简码',
        },
        rules: {
            type: Sequelize.JSON,
            comment: '抓取规则',
        },
        latest_version: {
            type: Sequelize.STRING,
            comment: '最新版本号',
        },
        latest_version_time: {
            type: Sequelize.DATE,
            comment: '最新版本号更新时间',
        }
    },
    {
        sequelize,
        modelName: 'software',
        tableName: 'softwares',
    });

module.exports = Software;