const Router = require("koa-router");
const router = new Router({ prefix: "/software" });

const SoftwareController = require("../controllers/software")

router.post("/sync", SoftwareController.sync)

router.get("/tags", SoftwareController.tagList)
router.post("/tags", SoftwareController.addTag)
router.put("/tags/:id", SoftwareController.editTag)

router.get('/sogou', SoftwareController.sogouDetail)

module.exports = router;