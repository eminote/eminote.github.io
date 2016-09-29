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
		var extraHeight = 110;

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
				History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '?encrypt');
		}
		else {
				$('.lang-ro').show();
				$('.lang-en').hide();
				History.pushState({state:1,rand:Math.random()}, 'Eminote - Criptează', '?criptează');
		}
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
			//
			var mylang = document.getElementsByTagName('html')[0].getAttribute('lang');
			switch(attribute) {
			    case 'Encrypt':
					if (mylang =='en'){
						History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '?encrypt');
					} else {
						History.pushState({state:1,rand:Math.random()}, 'Eminote - Criptează', '?criptează');
					}
			        break;
			    case 'Settings':
					if (mylang=='en'){
						History.pushState({state:2}, 'Eminote - Settings', '?settings');
					} else {
						History.pushState({state:2}, 'Eminote - Setări', '?setări');
					}
			        break;
				case 'Help':
					if (mylang=='en'){
						History.pushState({state:3}, 'Eminote - Help', '?help');
					} else {
						History.pushState({state:3}, 'Eminote - Ajutor', '?ajutor');
					}
			        break;
				case 'About':
					if (mylang=='en'){
						History.pushState({state:4}, 'Eminote - About', '?about');
					} else {
						History.pushState({state:4}, 'Eminote - Despre', '?despre');
					}
			        break;
				case 'Lang':
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
					$(".lang").blur();
					changelang();
					break;
			};	
		})
	};
	// Document on load.
	$(function(){
		changelang();
		// Bind to StateChange Event
		History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
			var State = History.getState(); // Note: We are using History.getState() instead of event.state
			var res = State.title.split(" ");
			switch(res[2]) {
				case 'Criptează':
					res[2] = 'Encrypt';
					break;
				case 'Setări':
					res[2] = 'Settings';
					break;
				case 'Ajutor':
					res[2] = 'Help';
					break;
				case 'Despre':
					res[2] = 'About';
					break;
				case undefined:
					res[2] = 'Encrypt';
					break;
			}
				var $this = $('#' + res[2]);
				var	data = $this.data('tab');
				// add/remove active class
				$('.fh5co-tab-menu li').removeClass('active');
				$this.closest('li').addClass('active');

				$('.fh5co-tab-content.active').addClass('animated fadeOutDown');

				setTimeout(function(){
					$('.fh5co-tab-content.active').removeClass('active animated fadeOutDown fadeInUp');
					$('.fh5co-tab-content[data-content="'+data+'"]').addClass('animated fadeInUp active');
					getHeight();
				}, 500);
		});
		tabContainer();
		tabClickTrigger();        
	});
}());


		
/* $(document).ready(function() {
    // Run btoa('your@email.com') to get yours!
    var base64_email = 'c2ViQHNhdW5pZXIubWU=';
    var base_url = '//forms.brace.io/';
    var action = base_url + atob(base64_email);
    $('#contact-form').attr('action', action);
    
    // For demo purpose, you can remove this
    $('#demo').html(action);
}); */

