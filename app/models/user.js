const { query } = require('../untils/asyncDB')

class UserModel {
    async findOne(ctx) {
        const name = ctx.username
        const password = ctx.password
        let sql = "SELECT * FROM user WHERE `username`='"+name+"' AND `password`='"+password+"'";
        console.log(sql)
        const res = await query(sql)
        return res
    }
}

module.exports = new UserModel();