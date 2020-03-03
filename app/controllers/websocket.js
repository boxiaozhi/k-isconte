class WebsocketController {
    /**
     * 获取配置信息
     * @param ctx
     * @returns {Promise<void>}
     */
    async count(ctx) {
        ctx.body = {
            status: 200,
            message: '',
            data: wssockets.size
        }
    }

    async send(ctx) {
        let message = ctx.request.query.msg
        if (wssockets.size > 0) {
            await wssockets.forEach((item) => {
                item.send(message)
            })
        }
        ctx.body = {
            status: 200,
            message: '',
            data: ''
        }
    }

    async close(ctx) {
        let id = ctx.request.query.id
        let current = wssockets.get(id)
        console.log(current)
        console.log(wssockets)
        console.log(wssockets.keys())
        if (current) {
            await current.close()
        }
        ctx.body = {
            status: 200,
            message: '',
            data: ''
        }
    }
}

module.exports = new WebsocketController();