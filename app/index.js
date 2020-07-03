require('dotenv').config({path:'../.env'});

const Koa = require("koa");
const koaBody = require('koa-body');
const parameter = require("koa-parameter");
const error = require("koa-json-error");
const routing = require("./routes");
const cors = require('koa2-cors');

const { errorFormat } = require("./untils/error")

const app = new Koa();

app.use(parameter(app));
app.use(koaBody());
app.use(cors());
app.use(
    error({
        postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === "production" ? rest : { stack, ...rest },
        format: errorFormat
    }),
);

global.basePath = __dirname

routing(app);

let server = app.listen(3000);

const WebSocket = require('ws');
const WebSocketApi = require('./untils/ws');
const wss = new WebSocket.Server({
    server
});
WebSocketApi(wss);

global.wssockets = new Map();
global.wss = wss;