$(function(){

	function load_contacts(){
		$.getJSON( "/contacts", function( data ) {
	  $.each( data, function( key, val ) {
	  	$("#contact-list").append("<tr>" + "<td>" + val.first_name + " " + val.last_name + "</td>" + "<td>" + val.phone + "</td>" + "<td>" + val.email + "</td>" + "</tr>");
	  });
	});
	}

	var resetForm = function(){
		$.each($("#add-contact-form input"), function(index, value){
			$(value).val("");
		});
	};

	load_contacts();
	$("#add-contact-form").on("submit", function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/contact",
			data: $("#add-contact-form").serialize(),
			success: function(data){
				data=JSON.parse(data);
				$("#contact-list").append("<tr>" + "<td>" + data["first_name"] + " " + data["last_name"] + "</td>" + "<td>" + data["phone"] + "</td>" + "<td>" + data["email"] + "</td>" + "</tr>");
				resetForm();
			}
		});
	});

})