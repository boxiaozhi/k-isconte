const Router = require("koa-router");
const router = new Router({ prefix: "/users" });

const {
    sync,
    create,
    login,
    find,
    resetPassword,
} = require("../controllers/user");

router.post("/sync", sync);
router.post("/create", create);
router.post("/login", login);
router.get("/find", find);
router.post("/resetPassword", resetPassword);

module.exports = router;