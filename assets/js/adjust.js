function resizeIntroCover () {
	var intro_banner = $('#intro');
	var intro_cover = $('#intro_cover');
	var window_height = $(window).height();

	var offset = 0.5;
	intro_cover.css('height', intro_banner.height() + window_height * offset);
}

function centerOnClick() {
	var ids = [
		['#intro_link', '#intro'],
		['#about_link', '#about']
	];

	ids.forEach(function (id) {
		$(id[0]).click(function (e) {
			e.preventDefault();

			var div = $(id[1]);
			var diff = (Math.max($(window).height() - div.outerHeight(), 0)) / 2;
			var offset = div.offset().top - diff;
			$(window).scrollTop(offset);
		});
	});
}

function adjust () {
	resizeIntroCover();
	centerOnClick();
}

window.onload = adjust;
