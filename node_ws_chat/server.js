var http    = require("http");
var fs      = require("fs")
var url     = require("url");
var router   = require("./lib/static_server/route")
var port = 8000;

function onRequest(req,res){ 
    
    var pathname = url.parse(req.url).pathname;
    
    router.route(pathname,req,res);
/*
    fs.readFile("./public/index.html",function(err,data){
        res.write(data);
        res.end();
    });
*/
    
}

var server = http.createServer(onRequest);

server.listen(port,function(){
    console.log("server is listening on port: "+port);    
});

