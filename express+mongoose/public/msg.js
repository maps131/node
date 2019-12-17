var fs = require('fs')
var dbpath = 'public/msg.json'

exports.find = function(callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            console.log('读取错误')
        }else{
          callback(null,JSON.parse(data).msg)
        }
    })
}

exports.save = function(info,callback){
    fs.readFile(dbpath,'utf8',function(err,data){
        if(err){
            console.log('读取错误')
        }else{
            var getmsg = JSON.parse(data).msg
            info.id = JSON.parse(data).msg.length + 1           
            getmsg.push(info)
            var filecontent = {
                msg:getmsg
            }
            fs.writeFile(dbpath,JSON.stringify(filecontent),function(err){
                if(err){
                    return callback(err)
                }else{
                    callback(null)
                }
            })
        }
    })
}
