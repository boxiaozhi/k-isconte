const rp = require('request-promise')
const OneService = require("../services/one")

class OneController {
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