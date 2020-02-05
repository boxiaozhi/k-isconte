const { query } = require('../untils/asyncDB')

class UserModel {
    async findOne(ctx) {
        const name = ctx.username
        const password = ctx.password
        let sql = "SELECT * FROM users WHERE `username`='"+name+"' AND `password`='"+password+"'";
        const res = await query(sql)
        return res
    }
}

module.exports = new UserModel();