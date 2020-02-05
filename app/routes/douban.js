const jwt = require("koa-jwt")
const Router = require("koa-router")
const router = new Router({ prefix: "/douban" })

const DoubanController = require("../controllers/douban")

const auth = jwt({ secret: process.env.TOKEN_KEY })

router.get("/login", DoubanController.login)
router.get("/account", DoubanController.account)
router.get("/movie/collect", DoubanController.movieCollect)
router.get("/people", DoubanController.people)

module.exports = router