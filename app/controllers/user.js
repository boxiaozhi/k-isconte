const jsonwebtoken = require("jsonwebtoken")
const md5 = require("blueimp-md5")
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const User = require("../models/user")

class UserController {
    constructor() {
    }

    async sync(ctx) {
        ctx.verifyParams({
            f: { type: "string", required: false, default: false },
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
                info: {
                    username: res.username,
                    created_at: res.created_at,
                    updated_at: res.updated_at,
                }
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

    //获取登录信息
    async info(ctx) {
        const username = ctx.state.jwtdata.username;
        let res = await User.findOne({
            where: {
                username: username,
            }
        });
        ctx.body = {
            status: 200,
            message: '',
            data: {
                id: res.id,
                username: res.username,
                created_at: res.created_at,
                updated_at: res.updated_at,
            }
        }
    }

    /**
     * 获取配置信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async getSetting(ctx) {
        const username = ctx.state.jwtdata.username;
        const adapter = new FileSync('./db/lowdb/user_setting.json');
        const db = low(adapter);

        db.defaults({
            setting: []
        }).write()
        let setting = db.get('setting')
            .find({ username: username})
            .value();
        ctx.body = {
            status: 200,
            message: '',
            data: setting
        }
    }

    /**
     * 添加或更新配置信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async addOrUpdateSetting(ctx) {
        const username = ctx.state.jwtdata.username;
        const setting = ctx.request.body
        const adapter = new FileSync('./db/lowdb/user_setting.json');
        const db = low(adapter);

        setting.username = username
        let res = db.get('setting')
            .find({ username: username})
            .value();
        if (!res) {
            res = db.get('setting')
                .push(setting)
                .write();
        } else {
            res = db.get('setting')
                .find({ username: username})
                .assign(setting)
                .write();
        }
        ctx.body = {
            status: 200,
            message: '',
            data: res
        }
    }
}

module.exports = new UserController();