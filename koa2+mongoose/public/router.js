const koa_router = require('koa-router'),
    msg = require('./mongooser.js')

let router = new koa_router;

router.get('/', async (ctx,next) =>{
    await msg.find(function(err,msgs){
        if(err){
            return res.status('500').send('server error')
        }else{
            // console.log(msgs)
            ctx.render('index', {
                infomation: msgs
            });
            // res.render('index.html',{
            //     infomation:msgs
            // })
        }
    })
}).post('/news',async (ctx,next) =>{
    //存入数据库
    var data = new msg(ctx.request.body)
    data.save(ctx.request.body,function(err){
        if(err){
            console.log('保存失败')
        }else{
            console.log('成功')
            
        }
    })
    await ctx.response.redirect('/')
    // console.log(ctx.request.body)
    // let url = ctx.url
  // 从上下文的request对象中获取
    // let request = ctx.request
    // let req_query = request.query
    // let req_querystring = request.querystring

    // // 从上下文中直接获取
    // let ctx_query = ctx.query
    // let ctx_querystring = ctx.querystring
    // console.log({
    //     url,
    //     req_query,
    //     req_querystring,
    //     ctx_query,
    //     ctx_querystring
    // })
    // ctx.body = {
    //     url,
    //     req_query,
    //     req_querystring,
    //     ctx_query,
    //     ctx_querystring
    // }
}).get('/news',function(ctx,next){
    ctx.render('news')  
}).get('/edit',function(ctx,next){
    var id = ctx.request.query.id.replace(/"/g,'')
    msg.findById(id,function(err,msgs){
        if(err){
            return ctx.status('500').send('server error')
        }else{
            ctx.render('edit.html',{
                infomation:msgs
            })
        }
    })
}).post('/edit',function(ctx,next){
    var id = ctx.request.body.id.replace(/"/g,'');
    msg.findByIdAndUpdate(id,ctx.request.body,function(err,ret){
        if(err){
            console.log('更新失败')
        }else{
            console.log('更新成功')
            ctx.response.redirect('/')
        }
    })
}).get('/delete',async function(ctx,next){
    var id = ctx.request.query.id.replace(/"/g,'')
    msg.findByIdAndDelete(id,function(err,ret){
        if(err){
            console.log('更新失败')
        }else{
            console.log('删除成功')
            // ctx.response.redirect('/')
        }
    })
    await ctx.response.redirect('/')
})
// .post('/delete',function(ctx,next){
//     if(req.body.msg == 'getdata'){
//         msg.find(function(err,msgs){
//             if(err){
//                 return res.status('500').send('server error')
//             }else{
//                 console.log(msgs)
//                 res.json(msgs)
//             }
//         })     
//     }else{
//         var errorInfo = {ret:4,info:'参数错误'}
//         res.json(errorInfo)
//     }
// })

module.exports = router