/*
    初始化，创建用户表、添加管理员
 */

require('dotenv').config({path:'../.env'});

const md5 = require("blueimp-md5");
const User = require("./models/user");

async function init() {
    let user = await User.sync({force: true})
    if(!user) {
        console.log('Init fail!');
        process.exit();
    }
    return User.create(
        {
            username: 'admin',
            password: md5('admin' + process.env.ADMIN_DEFAULT_PASSWORD),
        });
}

init().then(() => {
    process.exit();
});