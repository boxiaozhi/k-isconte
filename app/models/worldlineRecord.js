const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class WorldlineRecord extends Model {}

WorldlineRecord.init(
    {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        software_id: {
            type: Sequelize.INTEGER(11),
            comment: '主表ID',
        },
        version: {
            type: Sequelize.STRING,
            comment: '版本号',
        },
        data: {
            type: Sequelize.JSON,
            comment: '抓取数据',
        },
    },
    {
        sequelize,
        modelName: 'worldline_record',
        tableName: 'worldline_records',
    });

module.exports = WorldlineRecord;