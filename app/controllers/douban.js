const DoubanService = require("../services/douban")

class DoubanController {
    async login(ctx) {
        let res = await DoubanService.login()
        ctx.body = res
    }
    async account(ctx) {
        let res = await DoubanService.accountHtml()
        ctx.body = res
    }
    async movieCollect(ctx) {
        let res = await DoubanService.movieCollect(ctx.request.query)
        let data = await DoubanService.movieDataFormat(res)
        ctx.body = data
    }
    async people(ctx) {
        let res = await DoubanService.people(ctx.request.query)
        let data = await DoubanService.peopleDataFormat(res)
        ctx.body = data
    }
}

module.exports = new DoubanController();