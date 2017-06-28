function resizeIntroCover () {
	var intro_banner = document.getElementById('intro');
	var intro_cover = document.getElementById('intro_cover');

	var window_height = window.innerHeight;
	if (window_height < intro_banner.style.height) {
		// Just let it go to the top and grow the cover
		intro_cover.style.height = intro_banner
		return;
	}
}

function resize () {
}

window.onload = resize;
