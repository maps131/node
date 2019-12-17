var express = require('express'),
msg = require('./mongooser.js'),
md5 = require('blueimp-md5');
var router = express.Router()

router.get('/',function(req,res){
    msg.find(function(err,msgs){
        if(err){
            return res.status('500').send('server error')
        }else{
            if(req.session.info){
                console.log(req.session.info)
            }
            console.log(msgs)
            res.render('index.html',{
                infomation:msgs
            })
        }
    })
})
 
router.get('/news',function(req,res){
    res.render('news.html')   
})

router.post('/news',function(req,res){
    //存入数据库
    var data = new msg(req.body)
    data.save(req.body,function(err){
        if(err){
            console.log('保存失败')
        }else{
            req.session.info = data;
            console.log(md5(md5(data.name)+'%asd123'))
            console.log('成功')
            res.redirect('/')
        }
    })
})

router.get('/edit',function(req,res){
    var id = req.query.id.replace(/"/g,'')
    msg.findById(id,function(err,msgs){
        if(err){
            return res.status('500').send('server error')
        }else{
            res.render('edit.html',{
                infomation:msgs
            })
        }
    })
})

router.post('/edit',function(req,res){
    var id = req.body.id.replace(/"/g,'');
    msg.findByIdAndUpdate(id,req.body,function(err,ret){
        if(err){
            console.log('更新失败')
        }else{
            console.log('更新成功')
            res.redirect('/')
        }
    })
})

router.get('/delete',function(req,res){
    var id = req.query.id.replace(/"/g,'')
    msg.findByIdAndDelete(id,function(err,ret){
        if(err){
            console.log('更新失败')
        }else{
            console.log('更新成功')
            res.redirect('/')
        }
    })
})

module.exports = router

