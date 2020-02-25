const Router = require("koa-router")
const router = new Router({ prefix: "/system" })

const SystemController = require("../controllers/system")

router.get("/changelog", SystemController.changelog)

module.exports = router