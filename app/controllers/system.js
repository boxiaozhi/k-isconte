const YuqueService = require("../services/yuque")

class SystemController {
    async changelog(ctx) {
        let params = {
            namespace: process.env.SYSTEM_CHANGELOG_NAMESPACE,
            id: process.env.SYSTEM_CHANGELOG_ID,
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

module.exports = new SystemController();