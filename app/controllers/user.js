const jsonwebtoken = require("jsonwebtoken");
const { query } = require('../untils/asyncDB')
const User = require("../models/user");

class UserController {
    async create(ctx) {
        ctx.verifyParams({
            username: { type: "string", required: true },
            password: { type: "string", required: true }
        })
        const name = ctx.request.query.username
        const password = ctx.request.query.password

        let sql = "INSERT INTO `user` SET `username`='"+name+"',`password`='"+password+"'";
        const res = await query(sql)
        console.log(res)
        ctx.body = { res: res };
    }
    async login(ctx) {
        ctx.verifyParams({
            username: { type: "string", required: true },
            password: { type: "string", required: true }
        });
        const userInfo = await User.findOne(ctx.request.query);
        console.log(typeof userInfo)
        if (Object.keys(userInfo).length === 0) {
            ctx.throw(401, "用户名或密码不正确");
        }
        const { id, username } = userInfo;
        const token = jsonwebtoken.sign({ id, username }, process.env.TOKEN_KEY, { expiresIn: "1d" });
        ctx.body = { token };
    }
    async getOne(ctx) {
        ctx.body = '333'
    }
}

module.exports = new UserController();