const rp = require('request-promise')
const OneService = require('../services/one')
const OneModel = require('../models/one')

class OneController {
    async sync(ctx) {
        ctx.verifyParams({
            f: { type: "string", required: false, default: false },
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

    async store(ctx) {
        const type = ctx.request.body.type
        let start = parseInt(ctx.request.body.start)
        const end = ctx.request.body.end
        const force = !!ctx.request.body.f

        let next = true
        let addNum = 0
        let queryNum = 0
        let currentTime = 0
        while (next) {
            let res = await OneService.ajaxlist(type, start)
            res = JSON.parse(res)
            if(res.data.length > 0) {
                for (const item of res.data) {
                    let time  = new Date(item.date)
                    time = time.getTime()
                    if (!currentTime || currentTime > time) {
                        start = item.id
                        currentTime = time
                    }
                    queryNum++
                    let modelRes = await OneModel.findOrCreate({ where: { _id: item.id}, defaults: {
                        category: item.category,
                        title: item.title,
                        date_str: (item.date).replace(/\s/gi, ''),
                        data: item,
                    }})
                    if (modelRes[1]) {
                        addNum++
                    }
                    if(!modelRes[1] && !force) {
                        next = false
                    }
                    if(item.id < end ) {
                        next = false
                    }
                }
            } else {
                next = false
            }
        }
        ctx.body = {
            status: 200,
            message: '',
            data: {
                add_num: addNum,
                query_num: queryNum,
                last_id: start
            },
        }
    }
}

module.exports = new OneController();