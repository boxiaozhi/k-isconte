const Router = require("koa-router");
const router = new Router({ prefix: "/about" });

const {
    setting
} = require("../controllers/about");

router.get("/", setting);

module.exports = router;
