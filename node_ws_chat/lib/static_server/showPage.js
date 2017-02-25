var fs = require("fs");




function home(req,res){
    fs.readFile("./public/index.html",function(err,data){        
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);

})
}

function blog(req,res){

fs.readFile("./public/pages/blog.html",function(err,data){        
        res.writeHead(200,{"Content-Type":"text/html"});
        res.end(data);
    })
}

exports.home = home;
exports.blog = blog;
