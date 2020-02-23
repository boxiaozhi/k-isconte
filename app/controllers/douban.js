const DoubanService = require("../services/douban")

class DoubanController {
    async login(ctx) {
        ctx.body =  await DoubanService.login()
    }
    async account(ctx) {
        ctx.body = await DoubanService.accountHtml()
    }
    async movieCollect(ctx) {
        let res = await DoubanService.movieCollect(ctx.request.query)
        ctx.body = await DoubanService.movieDataFormat(res)
    }
    async people(ctx) {
        let res = await DoubanService.people(ctx.request.query)
        ctx.body = await DoubanService.peopleDataFormat(res)
    }
}

module.exports = new DoubanController();