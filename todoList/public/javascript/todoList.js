var todos = [];
var xmlhttp = new XMLHttpRequest();
var insertStuff = "";
var deleteStuff = "";
function post(path,params,method){
    method = method || "post";
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params){
        if(params.hasOwnProperty(key)){
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value",params[key]);
            form.appendChild(hiddenField);
        }
    }
    document.body.append(form);
    form.submit();
}

function remove() {
    //console.log("11111");
    var id = this.getAttribute('id');
    var task = todos[id].data;
    deleteStuff = "op="+"delete"+"&data="+task;
    show("/MYSQL",deleteStuff,function(){
        recAjax(function(){
            render();
        });
    });
}

function add(callback) {
    //console.log("11111");
    var task = document.getElementById('task').value;
    document.getElementById("task").value = "";
    insertStuff = "op="+"insert"+"&data="+task;
    callback();
}

function show(reqType,data,callback) {
    //console.log("22222");
    xmlhttp.open("POST",reqType,true);
    xmlhttp.send(data);
    callback(); 
}   

function recAjax(callback){
    //console.log("33333");
    xmlhttp.onreadystatechange = function(){
        if(xmlhttp.readyState==4 && xmlhttp.status==200){
            todos = JSON.parse(xmlhttp.responseText);
            callback();
        }
         
    }
}

function render(){
    //console.log("44444");
    document.getElementById('todos').innerHTML = "";
    var html = '<ul>';
    for(var i=0; i<todos.length; i++) {
        html += '<li>' + todos[i].data + '<button class="remove" id="' + i  + '">x</button></li>';
    };
    html += '</ul>';
 
    document.getElementById('todos').innerHTML = html;
 
    var buttons = document.getElementsByClassName('remove');
    for (var i=0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', remove);
    };
}


document.getElementById('add').addEventListener('click', function(){
    add(function(){
        show("/MYSQL",insertStuff,function(){
            recAjax(function(){
                render();
            });
        });
    });
});

show("/selectDB"," ",function(){
    recAjax(function(){
        render();
    });
});
