document.getElementById("Encrypt").addEventListener("click", function() {
    gotoNode(result.name);
}, false);

function urlset(page){
	switch(page) {
    case 'Encrypt':
		if ((document.getElementsByTagName('html')[0].getAttribute('lang');)=='en'){
			History.pushState({state:1,rand:Math.random()}, 'Eminote - Encrypt', '?encrypt');
		} else {
			History.pushState({state:1,rand:Math.random()}, 'Eminote - Cripteazã', '?cripteazã');
		}
        break;
    case 'Settings':
			History.go(1);
        break;
	} 
};