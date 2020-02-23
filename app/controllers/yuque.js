const YuqueService = require("../services/yuque")

class YuqueController {
    async docs(ctx) {
        let params = {
            namespace: process.env.YUQUE_NAMESPACE
        }
        let res = await YuqueService.docs(params)
        res = JSON.parse(res)
        ctx.body = {
            status: 200,
            message: '',
            data: res.data,
        }
    }

    async docDetail(ctx) {
        let params = {
            namespace: process.env.YUQUE_NAMESPACE,
            id: ctx.params.id,
        }
        let res = await YuqueService.docDetail(params)
        res = JSON.parse(res)
        ctx.body = {
            status: 200,
            message: '',
            data: res.data,
        }
    }
}

module.exports = new YuqueController();