const md5 = require("blueimp-md5")
const UserApiToken = require("../models/userApiToken")

class UserApiTokenController {
    async sync(ctx) {
        let res = await UserApiToken.sync({force: true})
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
        const jwtdata = ctx.state.jwtdata
        let findRes = await UserApiToken.findOne({
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
}

module.exports = new UserController();