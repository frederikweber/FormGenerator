$(document).ready(function(){
	$("#selectables div").draggable({
		revert: "invalid",
		helper: "clone", 
		opacity: 0.5,
		connectToSortable: "#finalForm"
	});

	$("#finalForm").sortable({
		revert: true,
		change: function(event, ui){
			$("#firstElement").hide("slow");	
		}
	});
});