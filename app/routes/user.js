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
router.post("/resetPassword", resetPassword);
router.get("/find", find);

router.post("/login", login);

module.exports = router;
