require('dotenv').config({path:'../.env'});

const Koa = require("koa");
const koaBody = require('koa-body');
const parameter = require("koa-parameter");
const error = require("koa-json-error");
const routing = require("./routes");
const cors = require('koa2-cors');

const app = new Koa();

app.use(koaBody());
app.use(cors());
app.use(
    error({
        postFormat: (e, { stack, ...rest }) =>
            process.env.NODE_ENV === "production" ? rest : { stack, ...rest }
    })
);
app.use(parameter(app));
routing(app);

app.listen(3000);