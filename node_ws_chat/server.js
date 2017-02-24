var http = require("http");
var port = 8000;

var server = http.createServer(function(req,res){
    res.write("hello world!");
    res.end();
});

server.listen(port,function(){
    console.log("server is listening on port: "+port);    
});

