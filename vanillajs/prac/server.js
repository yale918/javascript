const http = require("http");
const mime = require("mime");
const fs   = require("fs");
const port = 8888;
var   path = "";
var server = http.createServer(function(req,res){
  path = req.url;
  if(path ==="/"){
    console.log("[log] serving: /");
    var absPath = "."+path+"index.html";
    fileServe(absPath,res);
  }
  else{
    console.log("[log] serving: "+path);
    var absPath = "."+path;
    fileServe(absPath,res);
  }

});

server.listen(8888, function(){
  console.log("[log]server listening on port: "+port);
});

function fileServe(absPath,res){
  fs.readFile(absPath,function(err,data){
      if(err) console.log(err);
      else{
        res.writeHead(200,{"Content-Type":mime.lookup(absPath)});
        res.write(data);
        res.end();
      }
  });


}
