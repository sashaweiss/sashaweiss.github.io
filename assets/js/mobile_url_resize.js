var background_div = jQuery(".background-image");

var og_window_height = $(window).height();

// $(window).resize(resizeBackground);
function resizeBackground() {
  console.log('resizeBackground');
  console.log(background_div);
  background_div.height($(window).height() + 60);
}

resizeBackground();
