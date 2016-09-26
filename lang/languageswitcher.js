$(document).ready(function() {

	// --- language dropdown --- //

	// turn select into dl
	createDropDown();
	
	var $dropTrigger = $(".dropdown dt div");
	var $languageList = $(".dropdown dd ul");
	
	// open and close list when button is clicked
		$dropTrigger.click(function(){
			var iteration=$(this).data('iteration')||1
			switch ( iteration) {
				case 1:
					$languageList.slideDown(200);
		$dropTrigger.addClass("active");
					break;
				
				case 2:
					$languageList.slideUp(200);
		$(this).removeAttr("class");
					break;
			}
			iteration++;
			if (iteration>2) iteration=1
			$(this).data('iteration',iteration)
		})
	
	// close list when anywhere else on the screen is clicked
	$(document).bind('click', function(e) {
		var $clicked = $(e.target);
		if (! $clicked.parents().hasClass("dropdown"))
			$languageList.slideUp(200);
			$dropTrigger.removeAttr("class");
	});
	
	// when a language is clicked, make the selection and then hide the list
	$(".dropdown dd ul li div").click(function() { 
		var clickedValue = $(this).parent().attr("class");
		var clickedTitle = $(this).find("span").html();	
		document.getElementsByTagName('html')[0].setAttribute('lang',clickedValue);
		changelang();
		$("#target dt").removeClass().addClass(clickedValue);
		$("#target dt span").html(clickedTitle);
		$languageList.slideUp(200);
		$dropTrigger.removeAttr("class");
	});
});

	// actual function to transform select to definition list
	function createDropDown(){
		var $form = $("div#country-select form");
		$form.hide();
		var source = $("#country-options");
		source.removeAttr("autocomplete");
		var selected = source.find("option:selected");
		var options = $("option", source);
		$("#country-select").append('<dl id="target" class="dropdown"></dl>')
		$("#target").append('<dt class="' + selected.val() + '"><div><span class="mylang"><img src="img/' + selected.text() + '.png" alt="' + selected.text() + '"/></span></div></dt>')
		$("#target").append('<dd><ul></ul></dd>')
		options.each(function(){
			$("#target dd ul").append('<li class="' + $(this).val() + '"><div><span class="mylang"><img src="img/' + $(this).text() + '.png" alt="' + $(this).text() + '"/></span></div></li>');
			});
	}
