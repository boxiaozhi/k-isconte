const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,  {
    host: process.env.DB_HOST,    //数据库地址,默认本机
    port:process.env.DB_PORT,
    dialect: 'mysql',
    pool: {   //连接池设置
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 10000
    },
    define: {
        // `timestamps` 字段指定是否将创建 `createdAt` 和 `updatedAt` 字段.
        // 该值默认为 true, 但是当前设定为 false
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        paranoid: true,
        deletedAt: 'deleted_at',
    },
    timezone: '+08:00' //for writing to database
});

module.exports = sequelize;