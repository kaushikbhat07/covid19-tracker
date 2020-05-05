import $ from 'jquery';

$(window).on('load', function () {
	$('#loader').fadeOut();
	$('#loader-icon').fadeOut();

	$(".goto-top-btn").fadeOut();
	
	$(window).scroll(function () {
		if ($(window).scrollTop() > 300) {
			// Show back to top button
			$(".goto-top-btn").fadeIn();

		} else {
			// Hide back to top button
			$(".goto-top-btn").fadeOut();
		}
	})


});