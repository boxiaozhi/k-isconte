const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/one" });

const OneController = require("../controllers/one")

router.get("/token", OneController.token);
router.get("/ajaxlist", OneController.ajaxlist);
router.post("/sync", OneController.sync)

module.exports = router;