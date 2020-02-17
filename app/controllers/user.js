const jsonwebtoken = require("jsonwebtoken")
const md5 = require("blueimp-md5")
const User = require("../models/user")

class UserController {
    async sync(ctx) {
        ctx.verifyParams({
            f: { type: "boolean", required: false, default: false },
        })
        let force = Boolean(ctx.request.body.f)
        let user = await User.sync({force: force})
        let res = user.create(
            {
                username: 'admin',
                password: md5(process.env.ADMIN_DEFAULT_PASSWORD),
            }
        )
        let resStr = res ? 'success' : 'fail'
        ctx.body = {
            status: 200,
            message: '',
            data: {
                res: resStr,
            },
        }
    }

    async create(ctx) {
        ctx.verifyParams({
            username: { type: "string", required: true },
            password: { type: "string", required: true }
        })
        const username = ctx.request.body.username.trim()
        const password = md5(username+ctx.request.body.password.trim())

        let findRes = await User.findOne({
            where: {
                username: username,
            }
        })
        if(findRes) {
            ctx.throw(401, "用户名已存在");
        }
        let res = await User.create({
            username: username,
            password: password,
        })

        ctx.body = {
            status: 200,
            message: '',
            data: {
                id: res.id,
                username: res.username,
            }
        }
    }

    async find(ctx) {
        ctx.verifyParams({
            username: { type: "string", required: true },
        });
        const username = ctx.request.query.username

        let res = await User.findOne({
            where: {
                username: username,
            }
        })
        if(!res) {
            ctx.throw(401, "用户不存在");
        }
        ctx.body = {
            status: 200,
            message: '',
            data: {
                id: res.id,
                username: username,
            }
        }
    }

    async login(ctx) {
        ctx.verifyParams({
            username: { type: "string", required: true },
            password: { type: "string", required: true }
        });
        const username = ctx.request.body.username
        const password = ctx.request.body.password

        let res = await User.findOne({
            where: {
                username: username,
                password: md5(username+password)
            }
        })
        if (!res) {
            ctx.throw(401, "用户名或密码不正确");
        }
        let id = res.id
        const token = jsonwebtoken.sign({ id, username }, process.env.TOKEN_KEY, { expiresIn: "1d" });
        ctx.body = {
            status: 200,
            message: '',
            data: {
                token: token,
            }
        }
    }

    async resetPassword(ctx) {
        ctx.verifyParams({
            password: { type: "string", required: true }
        });
        const username = ctx.state.jwtdata.username;
        const password = ctx.request.body.password;

        let res = await User.findOne({
            where: {
                username: username,
            }
        });

        res.password =md5(username+password);
        let saveRes = res.save();
        ctx.body = {
            status: 200,
            message: '',
            data: {
                res: saveRes ? 'success' : 'fail'
            }
        }
    }
}

module.exports = new UserController();