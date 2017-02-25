var showPage = require("./showPage");
var mysql = require("./mysql");


function route(pathname,req,res){
    var handle = {};
    console.log("[log] requestPath: "+pathname);
    
    handle["/"] = showPage.home;
    handle["/blog"] = showPage.blog;
    handle["/mysql"] = mysql.mysqlE;
    
    if(typeof handle[pathname] === 'function')
        handle[pathname](req,res);

    else{
        console.log("404 "+pathname+" not found");
        res.writeHead(200,{"Content-Type":"text/plain"});
        res.end("404 "+pathname+" not found");
    }
    
} 

exports.route = route;
