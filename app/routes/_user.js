const Router = require("koa-router");
const router = new Router({ prefix: "/user" });

const {
    info,
} = require("../controllers/user");

router.get("/", info);

module.exports = router;