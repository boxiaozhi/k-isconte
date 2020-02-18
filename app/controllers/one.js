const rp = require('request-promise')
const OneService = require('../services/one')
const OneModel = require('../models/one')

class OneController {
    async sync(ctx) {
        ctx.verifyParams({
            f: { type: "boolean", required: false, default: false },
        })
        let force = Boolean(ctx.request.body.f)
        let one = await OneModel.sync({force: force})
        let resStr = one ? 'success' : 'fail'
        ctx.body = {
            status: 200,
            message: '',
            data: {
                res: resStr,
            },
        }
    }
    async token(ctx) {
        let token = await OneService.getToken()
        ctx.body = { token: token };
    }
    async ajaxlist(ctx) {
        ctx.verifyParams({
            type: { type: "string", required: true },
            id: { type: "string", required: true }
        })
        const type = ctx.request.query.type
        const id = ctx.request.query.id
        let res = await OneService.ajaxlist(type, id)
        ctx.body = res;
    }
}

module.exports = new OneController();