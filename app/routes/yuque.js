const Router = require("koa-router")
const router = new Router({ prefix: "/yuque" })

const YuqueController = require("../controllers/yuque")

router.get("/docs", YuqueController.docs)
router.get("/docs/:id", YuqueController.docDetail)

module.exports = router