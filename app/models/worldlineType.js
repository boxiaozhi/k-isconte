const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class WorldlineType extends Model {}

WorldlineType.init(
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
        code: {
            type: Sequelize.STRING,
            comment: '简码',
        },
        source_type: {
            type: Sequelize.STRING,
            comment: '来源类型',
        }
    },
    {
        sequelize,
        modelName: 'worldlineType',
        tableName: 'worldline_types',
    });

module.exports = WorldlineType;