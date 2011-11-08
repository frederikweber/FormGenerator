$(document).ready(function(){
	$("#newElementButton").button().click(function(){
		$("#modalForm").dialog("open");
	});
	
	$("#finalForm tbody").sortable();
	
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
	
	$("#genHtmlModal").dialog({
		autoOpen: false,
		buttons: {
			"Download": function(){
				
			}
		},
		modal: true,
		width: 600
	});
	
	$("#addOptionButton").button().click(function(){
		var input = $("#formSelectAdd");
		$("#finalSelectForm").append("<option>" + input.val() + "</option>");
		input.val("");
		input.focus();
	});
	
	$("#addRadioButton").button().click(function(){
		var input = $("#formRadioAdd");
		$("#finalRadioForm").append('<input type="radio" name="preview" value="' +
			input.val() +
			'" />' + input.val() +
			"<br />");
		input.val("");
		input.focus();
	});
	
	$("#generateHtmlButton").button().click(function(){
		$("#htmlOutput").val(getHtmlFromTable().html());
		$("#genHtmlModal").dialog("open");
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
		} else if(active == 2){
			row.append("<td>Radio</td>");
			row.append("<td>" + $("#formRadioName").val() + "</td>");
			var text = "";
			$("#finalRadioForm input").each(function(){
				text = text + "<span>" + $(this).val() + "</span><br />";
			});
			row.append("<td>" + text + "</td>");
		}
		var span = $('<td><span class="ui-icon ui-icon-trash" /></td>');
		span.find("span").click(function(){
			row.hide("fast", function(){
				row.remove();
			});
		});
		row.append(span);
		$("#finalForm table").append(row);
		$("#modalForm").dialog("close");
		$("#modalForm input").val("");
		$("#finalSelectForm, #finalRadioForm").empty();
	}
	
	function getHtmlFromTable(){
		var form = $("<form />");
		$("#finalForm tbody tr").each(function(){
			var type = "";
			var name = "";
			var value = "";
			$(this).children().each(function(i){
				if(i == 0){
					type = $(this).text();
				} else if(i == 1){
					name = $(this).text();
				} else if(i == 2){
					value = $(this).html();
				}
			});
			if(type == "Input"){
				form.append('<input type="text" name="' +
					name +
					'" value="' +
					value +
					'" />' +
					"<br />");
			} else if(type == "Select"){
				var select = $('<select name="' +
					name +
					'"/>');
				var tempTop = $("<div />");
				tempTop.append(value);
				$(tempTop).find("span").each(function(){
					select.append("<option>" + $(this).text() + "</option>");
				});
				form.append(select);
				form.append("<br />");
			} else if(type == "Radio"){
				var tempTop = $("<div />");
				tempTop.append(value);
				$(tempTop).find("span").each(function(){
					form.append('<input type="radio" name="' +
						name +
						'" value="' +
						$(this).text() +
						'" />' +
						$(this).text() +
						"<br />");
				});
			}
		});
		var topDiv = $("<div />")
		topDiv.append(form);
		return topDiv;
	}
});