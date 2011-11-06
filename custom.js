$(document).ready(function(){
	$("#newElementButton").button().click(function(){
		$("#modalForm").dialog("open");
	});
	
	$("#accord").accordion({
		autoHeight: false
	});
	
	$("#modalForm").dialog({
		autoOpen: false,
		buttons: {
			"Add": function(){
				addElement();
			}
		},
		modal: true,
		width: 600
	});
	
	$("#addOptionButton").button().click(function(){
		var input = $("#formSelectAdd");
		$("#finalSelectForm").append("<option>" + input.val() + "</option>");
		input.val("");
	});
	
	function addElement(){
		var active = $("#accord").accordion("option", "active");
		var row = $("<tr />");
		//Input
		if(active == 0){
			row.append("<td>Input</td>");
			row.append("<td>" + $("#formInputName").val() + "</td>");
			row.append("<td>" + $("#formInputValue").val() + "</td>");
		} else if(active == 1){
			row.append("<td>Select</td>");
			row.append("<td>" + $("#formSelectName").val() + "</td>");
			var text = "";
			$("#finalSelectForm option").each(function(){
				text = text + "<span>" + $(this).text() + "</span><br />";
			});
			row.append("<td>" + text + "</td>");
		}
		$("#finalForm table").append(row);
		$("#modalForm").dialog("close");
		$("#modalForm input").val("");
		$("#finalSelectForm").empty();
	}
});