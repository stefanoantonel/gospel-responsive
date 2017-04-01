window.onload = function() {

	/* fade in the gospel*/
	var text = document.getElementById("gospel");
	var msg = text.innerText;
	text.classList.toggle("hidden");
	text.classList.toggle("fadeIn");
	text.innerHTML = msg;

	/** making the audio player*/
	var text = document.getElementById("reflexion");
	var msg = text.innerText;
	var el = document.createElement( 'html' );
	var source = msg;
	var audio = "<audio controls><source src='"+source+"' type='audio/mpeg'>Your browser does not support the audio element.</audio>";
	text.innerHTML = audio;
	text.classList.toggle("hidden");
	text.classList.toggle("fadeIn");
};

