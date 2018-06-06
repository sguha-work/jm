jQuery(document).ready(function($) {
	$('.pageHeader').paroller({
		factor: '-0.5'
	});
	$("html").easeScroll();

	$("#forgetPassword").animatedModal({
		color:'rgba(156,25,25,0.8)',
	});

	// $('.sendOtp').click(function(event) {
	// 	$('#stepOne').css('display', 'none');
	// 	$('#stepTwo').css('display', 'block');
	// });

	// $('.resetPass').click(function(event) {
	// 	$('.close-animatedModal').trigger('click');
	// 	setTimeout(function(){
	// 		$('#stepOne').css('display', 'block');
	// 		$('#stepTwo').css('display', 'none');
	// 	}, 600);
	// });
});