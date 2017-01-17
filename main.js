
var tasksInfo = {
    countTasks: 0,
    tasks: []
};

function Task(taskDescription) {
	this.taskDescription = taskDescription;
	this.taskStatus = "unchecked";
};


$(function(){
	if (tasksOfStorage = JSON.parse(localStorage.getItem("info"))) {
		for (var i = 0; i < tasksOfStorage.countTasks; i++) {
			var description = tasksOfStorage.tasks[i].taskDescription;
			renderTask(description);
			/*if(tasksOfStorage.tasks[i].taskStatus == "checked"){
				$(this).find("input:checkbox").prop("checked", true);
				$(this).parent().addClass("task-done");
			}*/
		}
	}
});


$("a#add").on('click', function(){
	var tempValue = $(".description").val();
	if(tempValue){
		createTask(tempValue);
		renderTask(tempValue);
		$(".description").val('');
	}else{
		$(".description").addClass("error");
	}

});


$("a#del-all").on('click', function(){
	$('.task').remove();
	localStorage.info = undefined;
	tasksInfo.tasks = [];
	tasksInfo.countTasks = 0;
});

$('.tasks-container').on('click', '.btn-del', function(e){
    description = $(this).parent().children()[1].innerHTML;
    deleteTask(description);
    $(this).parent().remove();
});



//checked:true
$('.tasks-container').on('click', 'input:checkbox', function(e){
    $(this).parent().toggleClass("task-done");
    var content = $(this).parent().children()[1].innerHTML;
    isChecked(content);
    console.log($(this).prop("checked"));

});


function isChecked(content){
    if($(this).prop("checked") == true){
    	stage = "unchecked";
    	$(this).prop("checked", false);
    	console.log($(this).prop("checked"));

    }else{
    	stage = "checked";
    	$(this).prop("checked", true);
    	console.log($(this).prop("checked"));
    }

    var tasksInfoOfStorage = JSON.parse(localStorage.getItem("info"));
	for(var i = 0; i < tasksInfoOfStorage.countTasks; i++){
		if(content == tasksInfoOfStorage.tasks[i].taskDescription){
			tasksInfoOfStorage.tasks[i].taskStatus = stage;
			var newObj = JSON.stringify(tasksInfoOfStorage); 
			localStorage.setItem("info", newObj);
			break;
		}
	}
}





function createTask(taskDescription) {
	var newTask = new Task(taskDescription);

	tasksInfo.tasks.push(newTask);
	tasksInfo.countTasks += 1;

	if(localStorage.info == 'undefined'){
		var newObj = JSON.stringify(tasksInfo); 
		localStorage.setItem("info", newObj);
		var returnObj = JSON.parse(localStorage.getItem("info")); 
	}else{
		var tasksInfoOfStorage = JSON.parse(localStorage.getItem("info"));
		tasksInfoOfStorage.tasks.push(newTask);
		tasksInfoOfStorage.countTasks += 1;

		var newObj = JSON.stringify(tasksInfoOfStorage); 
		localStorage.setItem("info", newObj);
		var returnObj = JSON.parse(localStorage.getItem("info"));
	}
} 


function renderTask(description){
	$('<div class="task"></div>').appendTo(".tasks-container");
	$('<span></span>').appendTo(".task:last-child");
	$('.tasks-container').find(".task:last-child").find("span").text(description);

	$('<input type="checkbox" name="check">').insertBefore($('.tasks-container').find(":last-child").find("span"));
	$('.tasks-container').find("input").addClass("checkbox");

	$('<a></a>').insertAfter($('.tasks-container').find(":last-child").find("span"));
	$('.tasks-container').find(":last-child").find("a").text("Del");
	$('.tasks-container').find(":last-child").find("a").addClass("btn-del");


}


function deleteTask(content){
	var tasksInfoOfStorage = JSON.parse(localStorage.getItem("info"));
	for(var i = 0; i < tasksInfoOfStorage.countTasks; i++){
		if(content == tasksInfoOfStorage.tasks[i].taskDescription){
			tasksInfoOfStorage.tasks.splice(i, 1);
			tasksInfoOfStorage.countTasks -= 1;
			var newObj = JSON.stringify(tasksInfoOfStorage); 
			localStorage.setItem("info", newObj);
			break;
		}
	}
}

$('.check').on('click', function(){
  $(this).toggleClass('active');
});