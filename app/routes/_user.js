const Router = require("koa-router");
const router = new Router({ prefix: "/user" });

const {
    info,
    getSetting,
    addOrUpdateSetting,
} = require("../controllers/user");

//获取用户
router.get("/", info);
//获取设置信息
router.get("/setting", getSetting)
//更新设置信息
router.post("/setting", addOrUpdateSetting)

module.exports = router;