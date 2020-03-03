const Router = require("koa-router");
const router = new Router({ prefix: "/websocket" });

const {
    count,
    send,
    close,
} = require("../controllers/websocket");

router.get("/count", count);
router.get("/send", send);
router.get("/close", close);

module.exports = router;
