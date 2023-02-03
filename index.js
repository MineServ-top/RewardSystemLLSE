const config = require('./config.json')
const server = require('http')
const { parse } = require('querystring')
var SHA256 = require("crypto-js/sha256")

server.createServer((req,res)=>{
    let buf = ''
    req.on("data",(c)=>{
        buf += c.toString()
    })
    req.on("end",()=>{
        var map = parse(buf)
        if(checkSign(map.project,map.username,map.timestamp,map.signature)==true){
            main(map.project,map.username,map.timestamp,map.signature)
            res.end('done')
        }
        else{
            res.statusCode = 500
            res.end('error')
        }
    })
}).listen(config.WebServerPort)
function checkSign(project,username,timestamp,signature){
    var hash = SHA256(project+'.'+config.SecretKey+'.'+timestamp+'.'+username)
    if(hash == signature){
        return true
    }
    else{
        return false
    }
}

function main(proj,user,time,sign){
    if(config.LiteLoader.Command1 !== "null"){
        console.log(time+" | Running command | "+config.LiteLoader.Command1.replaceAll('$user',user))
        mc.runCmdEx(config.LiteLoader.Command1.replaceAll('$user',user))
    }
    if(config.LiteLoader.Command2 !== "null"){
        console.log(time+" | Running command | "+config.LiteLoader.Command2.replaceAll('$user',user))
        mc.runCmdEx(config.LiteLoader.Command2.replaceAll('$user',user))
    }
    if(config.LiteLoader.Command3 !== "null"){
        console.log(time+" | Running command | "+config.LiteLoader.Command3.replaceAll('$user',user))
        mc.runCmdEx(config.LiteLoader.Command3.replaceAll('$user',user))
    }
}