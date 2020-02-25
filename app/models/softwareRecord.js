const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class SoftwareRecord extends Model {}

SoftwareRecord.init(
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
        modelName: 'software_record',
        tableName: 'software_records',
    });

module.exports = SoftwareRecord;