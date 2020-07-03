const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class WorldlineRecord extends Model {}

WorldlineRecord.init(
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        type_id: {
            type: Sequelize.INTEGER,
            comment: '主表ID',
        },
        title: {
            type: Sequelize.STRING,
            comment: '标题',
        },
        url: {
            type: Sequelize.STRING,
            comment: '链接',
        },
        ori_created_at: {
            type: Sequelize.BIGINT(11),
            comment: '源创建时间',
        },
        ori_md5: {
            type: Sequelize.STRING,
            comment: '源信息 MD5，用于唯一性处理',
        },
    },
    {
        sequelize,
        modelName: 'worldline_record',
        tableName: 'worldline_records',
    });

module.exports = WorldlineRecord;