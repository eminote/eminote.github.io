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
				History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '?encrypt');
		}
		else {
				$('.lang-ro').show();
				$('.lang-en').hide();
				History.pushState({state:1,rand:Math.random()}, 'Eminote - Criptează', '?criptează');
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
			var mylang = document.getElementsByTagName('html')[0].getAttribute('lang');
			switch(attribute) {
			    case 'Encryption':
					if (mylang =='en'){
						History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '?encrypt');
					} else {
						History.pushState({state:1,rand:Math.random()}, 'Eminote - Criptează', '?criptează');
					}
			        break;
				case 'Decryption':
					if (mylang =='en'){
						History.pushState({state:3,rand:Math.random()}, 'Eminote - Decrypt', '?decrypt');
					} else {
						History.pushState({state:3,rand:Math.random()}, 'Eminote - Decriptează', '?decriptează');
					}
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
			var mylang = document.getElementsByTagName('html')[0].getAttribute('lang');
			switch(attribute) {
			    case 'Eminote':
					if (mylang =='en'){
						History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '?encrypt');
					} else {
						History.pushState({state:1,rand:Math.random()}, 'Eminote - Criptează', '?criptează');
					}
			        break;
			    case 'Settings':
					if (mylang=='en'){
						History.pushState({state:2,rand:Math.random()}, 'Eminote - Settings', '?settings');
					} else {
						History.pushState({state:2,rand:Math.random()}, 'Eminote - Setări', '?setări');
					}
			        break;
				case 'About':
					if (mylang=='en'){
						History.pushState({state:4,rand:Math.random()}, 'Eminote - About', '?about');
					} else {
						History.pushState({state:4,rand:Math.random()}, 'Eminote - Despre', '?despre');
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
		// Bind to StateChange Event
		History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
			var State = History.getState(); // Note: We are using History.getState() instead of event.state
			//For back and forward arrows on browser, title is the only way to know at which page we are.
			var res = State.title.split(" "); 
			switch(res[2]) {
				case 'Criptează':
					res[2] = 'Encryption';
					break;
				case 'Encrypt':
					res[2] = 'Encryption';
					break;
				case 'Decrypt':
					res[2] = 'Decryption';
					break;
				case 'Setări':
					res[2] = 'Settings';
					break;
				case 'Decriptează':
					res[2] = 'Decryption';
					break;
				case 'Despre':
					res[2] = 'About';
					break;
				case undefined:
					res[2] = 'Encrypt';
					break;
			}
				var $this = $('#' + res[2]);	
				// add/remove active class
				// IF we are in HOME, remove any ACTIVE class and add it to HOME and submenu	
				if ((res[2]=='Encryption') || (res[2]=='Decryption')) {									
					$('.fh5co-tab-menu li').removeClass('active');
					$('.fh5co-subtab-menu li').removeClass('active');
					$this.closest('li').addClass('active');
					$('.home').closest('li').addClass('active');
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

