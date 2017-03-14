var request = require("request");
var cheerio = require("cheerio");
var fs = require("fs");

request({
    url: "http://blog.infographics.tw",
    methid: "GET"
}, function (e,r,b){
    if(e || !b){ return; }
    var $ = cheerio.load(b);
    var result = [];
    var titles = $("li.item h2");
    for(var i=0;i<titles.length;i++){
        result.push($(titles[i]).text());
    }
    fs.writeFileSync("result.json", JSON.stringify(result));

}




);
