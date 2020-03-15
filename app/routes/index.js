const jwt = require("koa-jwt");
const fs = require("fs");

module.exports = app => {
    fs.readdirSync(__dirname).forEach(file => {
        if (file === "index.js") {
            return;
        }
        const route = require(`./${file}`);

        app.use(jwt({ secret: process.env.TOKEN_KEY, key: 'jwtdata' })
            .unless({
                path: [
                    /^\/users\/login/,
                    /^\/douban/,
                    /^\/one\/(random|ajaxlist|token)/,
                    /^\/yuque/,
                    /^\/system/,
                    /^\/about/,
                    /^\/websocket/,
                    /^\/software/,
                ]
            }));

        app.use(route.routes()).use(route.allowedMethods());
    })
}