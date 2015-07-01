$(function(){

	// load current contacts on page load
	var load_contacts = function(){
		$.getJSON( "/contacts", function( data ) {
	  $.each( data, function( key, val ) {
	  	$("#contact-list").append("<tr>" + "<td>" + val.first_name + " " + val.last_name + "</td>" + "<td>" + val.phone + "</td>" + "<td>" + val.email + "</td>" + "<td>" + "<a class='delete-contact' href='contact/" + val.id + "/delete'><span class='glyphicon glyphicon-remove-sign'></span> </a>" + "</td>"+ "</tr>");
	  	$("#loading-icon").remove();
	  });
	});
	};

	// load contacts when document ready
	load_contacts();

	// reset form after new contact is added (after submit)
	var resetForm = function(){
		$.each($("#add-contact-form input"), function(index, value){
			$(value).val("");
		});
	};

	// on submit, add new contact to database
	$("#add-contact-form").on("submit", function(e){
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "/contact",
			data: $("#add-contact-form").serialize(),
			success: function(data){
				data=JSON.parse(data);
				$("#contact-list").append("<tr>" + "<td>" + data["first_name"] + " " + data["last_name"] + "</td>" + "<td>" + data["phone"] + "</td>" + "<td>" + data["email"] + "</td>" + "<td>" + "<a href='contact/:" + data["id"] + "data-method='put'><span class='glyphicon glyphicon-remove-sign'></span> </a>" + "</td>" + "</tr>");
				$("#myModal").modal('hide');
				resetForm();
			}
		});
	});

	//
	$(document).on("click", ".delete-contact", function(e){
		console.log("Click")
		e.preventDefault();

		$.ajax({
			type: "DELETE",
			url: $(this).attr('href'),
			success: function(response){
				$(this).parent().parent().remove();
			}.bind(this)
		});
	});

	$("#search-submit").on("click", function(e){
		e.preventDefault();
		$.ajax({
			type: "GET",
			url: '/contacts/search',
			data: {search_term: $("#search-term").val()},
			success: function(response){
				$("#contact-list tr").not("#contact-list tr:first-child").hide();
				$.each(JSON.parse(response), function(key, val){
					$("#contact-list").append("<tr>" + "<td>" + val.first_name + " " + val.last_name + "</td>" + "<td>" + val.phone + "</td>" + "<td>" + val.email + "</td>" + "<td>" + "<a class='delete-contact' href='contact/" + val.id + "/delete'><span class='glyphicon glyphicon-remove-sign'></span> </a>" + "</td>"+ "</tr>");
				})
				$("#search-results").text("Search Results");
				$("#search-term").val("");
				$("#all-contacts").attr("type", "button")
			},
			failure: function(response){
			}
		})
	})

	$("#all-contacts").on("click",function(){
		$("#contact-list tr").not("#contact-list tr:first-child").hide();
		$("#search-results").text("");
		$("#all-contacts").attr("type", "hidden")
		load_contacts();
	})

})