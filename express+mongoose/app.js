var express = require('express'),
    router = require('./public/router'),
    bodyParser = require('body-parser'),
    app = express(),
    session = require('express-session');
    

app.engine('html',require('express-art-template'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.all("*",function(req,res,next){
    res.header('Access-Control-Allow-Origin', "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header('Access-Control-Allow-Credentials', true);
    res.header("X-Powered-By", ' 3.2.1');
    next();
})

app.use(router)

app.listen(5000,function(){
    console.log('server has start...')
})

module.exports = app
