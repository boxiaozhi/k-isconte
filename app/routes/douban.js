const Router = require("koa-router")
const router = new Router({ prefix: "/douban" })

const DoubanController = require("../controllers/douban")

router.get("/login", DoubanController.login)
router.get("/account", DoubanController.account)
router.get("/movie/collect", DoubanController.movieCollect)
router.get("/people", DoubanController.people)

module.exports = router