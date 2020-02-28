const Sequelize = require('sequelize');
const sequelize = require('../untils/sequelize')

const Model = Sequelize.Model;
class SoftwareTag extends Model {}

SoftwareTag.init(
    {
        id: {
            type: Sequelize.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING,
            comment: '标签名',
        },
    },
    {
        sequelize,
        modelName: 'software_tag',
        tableName: 'software_tags',
    });

module.exports = SoftwareTag;