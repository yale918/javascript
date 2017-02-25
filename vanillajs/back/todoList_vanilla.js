function TaskList() {
    "use strict";
    var appVersion = '1.0.0v';

    function setAppStatus($status) {

        var $appStatusElm = document.querySelector(".app-status");

        $appStatusElm.textContent = $status;        


    }

    function addTask() {

        var $addNewTask = document.querySelector("#add-new-task");

        $addNewTask.addEventListener("keypress", function (e) {
            
           
            
            if (e.which == 13) {
                var taskName = this.value;
                
                appendNewTask(taskName);
                
                this.value = '';
            }

            return false;

        });


    }
    
    function appendNewTask (taskName) {
        
        var $taskList = document.querySelector("#tasks-list");
        var $taskElm = document.createElement("li");
        var $btnsWrapper = document.createElement("div");
        var $deleteBtn = document.createElement('a');        
        var $moveUpBtn = document.createElement('a');       
        var $moveDownBtn = document.createElement('a');
        var $taskNameElm = document.createElement('span');
        var hrefAttr = document.createAttribute("href");
        var buttons = [];
        
        hrefAttr.nodeValue ="#";
        
        $taskElm.appendChild($taskNameElm);        
        $taskNameElm.textContent = taskName;        
        $taskList.appendChild($taskElm);
        $taskElm.appendChild($btnsWrapper);
        
        setTimeout(function () {
            $taskElm.classList.add("remove-border");
        }, 300);
        
        
        $deleteBtn.textContent = "Delete";        
        var $deleteBtnHref = hrefAttr.cloneNode(true);
        $deleteBtn.setAttributeNode($deleteBtnHref);
        

        
        $moveUpBtn.textContent = "Move up";  
        var $moveUpBtnHref = hrefAttr.cloneNode(true);
        $moveUpBtn.setAttributeNode($moveUpBtnHref);
        
        $moveDownBtn.textContent = "Move down";  
        var $moveDownBtnHref = hrefAttr.cloneNode(true);
        $moveDownBtn.setAttributeNode($moveDownBtnHref);
        
        buttons = [$deleteBtn, $moveDownBtn, $moveUpBtn];
        
        buttons.forEach(function (btn) {
            $taskElm.querySelector('div').appendChild(btn);
        });
        
        $deleteBtn.addEventListener('click', function (e) {
            e.path[3].removeChild(e.path[2]);
            setAppStatus("Task " + taskName + " has been removed");
        })
        
        setAppStatus("Task " + taskName + " has been recorded");

    }

    this.start = function () {
        var $versionElm = document.querySelector(".main-header  .version");


        $versionElm.textContent = appVersion;

        addTask();

        setAppStatus("Ready To Use");

    };
}


var app = new TaskList();
app.start();
