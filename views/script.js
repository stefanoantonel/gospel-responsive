window.onload = function() {

	var tiny_ajax = function(m,u,c,d){with(new XMLHttpRequest)onreadystatechange=function(){readyState^4||c(this)},open(m,u),send(d)};

	tiny_ajax('get', '/getGospel', function (xhr) {
	   // console.log(xhr.responseText);
	    var text = document.getElementsByClassName("text")[0];
		text.classList.toggle("fadeIn");
	    text.innerHTML = xhr.responseText;
	});
};

