;(function () {	
	'use strict';
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
			BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
			iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
			Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
			Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
			any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};

	var getHeight = function() {
		var extraHeight = 50;

		if ( isMobile.any() ) extraHeight = 50;
		
		setTimeout(function(){
			$('#fh5co-main').stop().animate({
				'height': $('.fh5co-tab-content.active').height() + extraHeight
			});
		}, 200);
	};
	var tabContainer = function() {
		getHeight();
		$(window).resize(function(){
			getHeight();
		})
	};
	var changelang = function(){
		var mylang = document.getElementsByTagName('html')[0].getAttribute('lang');
		if (mylang=='en') {
				$('.lang-ro').hide();
				$('.lang-en').show();
		}
		else {
				$('.lang-ro').show();
				$('.lang-en').hide();
		}
	};
	var subTabClickTrigger = function() {
		$('.fh5co-subtab-menu a').on('click', function(event) {
			event.preventDefault();
			var $this = $(this);

			// add/remove active class
			$('.fh5co-subtab-menu li').removeClass('active');
			$this.closest('li').addClass('active');
			
			var attribute = $this.attr('id');
			switch(attribute) {
			    case 'encryption':
					History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '#encryption');
					break;
				case 'decryption':
					History.pushState({state:3,rand:Math.random()}, 'Eminote - Decrypt', '#decryption');
					break;
			};	
		});
	};
	var tabClickTrigger = function() {
		$('.fh5co-tab-menu a').on('click', function(event) {
			event.preventDefault();
			var $this = $(this),
				data = $this.data('tab');
			
			// add/remove active class
			$('.fh5co-tab-menu li').removeClass('active');
			$this.closest('li').addClass('active');

			$('.fh5co-tab-content.active').addClass('animated fadeOutDown');

			setTimeout(function(){
				$('.fh5co-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
				$('.fh5co-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
				getHeight();
			}, 500);

			var attribute = $this.attr('id');
			switch(attribute) {
			    case 'eminote':
					History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '#encryption');
					break;
			    case 'settings':
					History.pushState({state:2,rand:Math.random()}, 'Eminote - Settings', '#settings');
					break;
				case 'about':
					History.pushState({state:4,rand:Math.random()}, 'Eminote - About', '#about');
					break;
				case 'lang':
					var clickedValue = $(this).find("div").attr("class");
					document.getElementsByTagName('html')[0].setAttribute('lang',clickedValue);
					var iteration=$(this).data('iteration')||1
					switch ( iteration) {
						case 1:
							$("#target").html("English");
							$(this).find("div").removeClass().addClass("en");
							$('.fh5co-tab-menu li').removeClass('active');
							$('.home').parent('li').addClass('active');
							break;
						
						case 2:
							$("#target").html("Română");
							$(this).find("div").removeClass().addClass("ro");
							$('.fh5co-tab-menu li').removeClass('active');
							$('.home').parent('li').addClass('active');
							break;
					}
					iteration++;
					if (iteration>2) iteration=1
					$(this).data('iteration',iteration)
					$("#lang").blur();
					changelang();
					break;
			};
		});
	};
	var closeAlertClickTrigger = function() {
		$("#close").on("click", function(event) {
			event.preventDefault();
			$(this).closest(".alert").hide();
		});
	};
	// Document on load.
	$(function(){
		changelang();
		closeAlertClickTrigger();
		tabContainer();
		tabClickTrigger();  
		subTabClickTrigger();
		
		History.Adapter.bind(window,'popstate',function(){ // Note: We are using statechange instead of popstate
			// Log the State
			var res = History.getHash();
			var $this = $('#' + res); // Note: We are using History.getState() instead of event.state
				// add/remove active class
				// IF we are in HOME, remove any ACTIVE class and add it to HOME and submenu	
				if ((res=='encryption') || (res=='decryption')) {									
					$('.fh5co-tab-menu li').removeClass('active');
					$('.fh5co-subtab-menu li').removeClass('active');
					$this.closest('li').addClass('active');
					$('#eminote').closest('li').addClass('active');
					var	data = '1';
				} else { // ELSE remove any ACTIVE class from the main tab menu and add it relevant tab
					var	data = $this.data('tab');
					$('.fh5co-tab-menu li').removeClass('active');
					$this.closest('li').addClass('active');
				}
				// some animations to add active class to the relevant content
				$('.fh5co-tab-content.active').addClass('animated fadeOutDown');
				setTimeout(function(){
					$('.fh5co-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
					$('.fh5co-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
					getHeight();
				}, 500);
		});
		var identifier = window.location.hash;
		if(identifier != "") {
			$(identifier).click();
		}
			
	});
}());

