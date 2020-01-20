const jwt = require("koa-jwt");
const Router = require("koa-router");
const router = new Router({ prefix: "/users" });

const {
    create,
    login,
    getOne,
} = require("../controllers/user");

const auth = jwt({ secret: process.env.TOKEN_KEY });

router.get("/", create);

router.get("/login", login);

router.get("/getOne", auth, getOne);

module.exports = router;