const Router = require("koa-router");
const router = new Router({ prefix: "/one" });

const OneController = require("../controllers/one")

router.get("/token", OneController.token);
router.get("/ajaxlist", OneController.ajaxlist);
router.get("/random", OneController.random)

router.post("/sync", OneController.sync)
router.post("/store", OneController.store)

module.exports = router;