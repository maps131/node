const Koa = require('koa'),
    app = new Koa(),
    router = require('./public/router'),
    render = require('koa-art-template'),
    bodyParser = require('koa-bodyparser'),
    serve = require('koa-static'),
    path = require('path');

    render(app,{
        root:path.join(__dirname,'view'),
        extname:'.html',
        debug: process.env.NODE_ENV !== 'production'
    })

    app.use(bodyParser());
    app.use(serve(__dirname + "/public"));
    app.use(router.routes()).use(router.allowedMethods());

app.listen(3000)
console.log('[demo] start-quick is starting at port 3000')

module.exports = app