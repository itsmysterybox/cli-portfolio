$(function() {

 	var input = $("input");
 	var resume = $("#resume");

 	var help = "about: Displays the name & designation<br>contact: Displays contact details<br>education: Displays educational details<br>projects: Displays the projects details<br>skills: Displays the skills";

	input.focus();
	
	$(document).click(function() {
	  input.focus();
	});

	$("input").bind('keydown', function(e) {
		if ((e.keyCode || e.which) == 13) {
	    	var command = input.val().toLowerCase().trim();
	    	input.val("");
	    	if (command === 'clear') {
	    		resume.empty();
	    	}
	    	if (command === 'help') {
	    		resume.append('<br><span id="add_here">' + help + '</span><br>');
	    	}

	    	var data;
		    $.getJSON("data.json", function(data) {
		    	data = data.resume;			    
			    $.each(data, function(key, val) {

			    	if (command === 'about' && key === command) {
			    		fetchObject(data.about);
			    	}
			    	
			    	if (command === 'contact' && key === command) {
			    		$.each(data.contact, function(key, val) {				    		
				    		if (toString.call(val) !== '[object Object]') {
				    			resume.append('<br>' + key + ': <a id="a_link" href="' + val + '">' + val + '</a><br>');
				    		}
						})
			    	}

			    	if (command === 'education' && key === command) {
			    		fetchObject(data.education);
			    		fetchObject(data.education.study);
			    	}

			    	// if (command === 'experience' && key === command) {
			    	// 	fetchData(data.experience);
			    	// }

			    	if (command === 'projects' && key === command) {
			    		fetchData(data.projects);
			    	}

			    	if (command === 'skills' && key === command) {
			    		fetchObject(data.skills);
			    	}
				})

				$.each(data.contact, function(key, val) {
					if ((command === 'github' || command === 'stackoverflow' || command === 'pinterest') && key === command) {
	    				resume.append('<br><a id="a_link" href="' + val + '">' + val + '</a><br>');
			    	}
				})
			    
		    }).fail(function(error) {
	            console.log("AJAX ERROR: " + error);
		    });
		    
		    $("html, body").animate({ scrollTop: $("#resume:last").height()});
			// window.scrollTo(0,document.querySelector("#resume").scrollHeight);
		}
		if ((e.keyCode || e.which) == 9) {
			e.preventDefault();
		}
	});

	function fetchObject(value) {
		$.each(value, function(key, val) {
			console.log('the key: ' + key);
    		console.log('the val: ' + val);
    		
    		if (toString.call(val) !== '[object Object]') {
    			resume.append('<br><span id="add_here">' + key + ": " + val + '</span><br>');
    		}
		})
	}

	function fetchData(tag) {
		$.each(tag, function(i) {
			resume.append('<br>');
			fetchObject(tag[i]);
		})
	}

});

