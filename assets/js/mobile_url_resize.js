var background_div = jQuery(".background-image");

// Set the height of the background image to be 60px more than the height of
// the window, so that it doesn't jump on resize when the URL bar on mobile
// disappears.

// $(window).resize(resizeBackground);
function resizeBackgroundForMobile() {
  background_div.height($(window).height() + 60);
}

if ($(window).width() < 480) {
  resizeBackgroundForMobile();
}
