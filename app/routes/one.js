const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/one" });

const OneController = require("../controllers/one")

const auth = jwt({ secret: process.env.TOKEN_KEY });

router.get("/token", OneController.token);
router.get("/ajaxlist", OneController.ajaxlist);

module.exports = router;