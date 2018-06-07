jQuery(document).ready(function($) {
	$('.pageHeader').paroller({
		factor: '-0.5'
	});
	$("html").easeScroll();

	$("#forgetPassword").animatedModal({
		color:'rgba(156,25,25,0.8)',
	});
});