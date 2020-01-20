require('dotenv').config({path:'../.env'})

const Koa = require("koa");
const Router = require("koa-router");
const parameter = require("koa-parameter");
const error = require("koa-json-error");
const routing = require("./routes");

const app = new Koa();
const router = new Router();

app.use(
    error({
        postFormat: (e, { stack, ...rest }) =>
            process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
    })
);
app.use(parameter(app));
routing(app);

app.listen(3000);