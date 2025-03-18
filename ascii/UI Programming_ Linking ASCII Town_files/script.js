$(document).ready(function(){

	/* HOME TOGGLE */

	$('.show-more').click(function(){
		if($(this).html() == 'Show more'){
			$(this).html('Hide more');
		} else {
			$(this).html('Show more');
		}
		$('.more').slideToggle('fast');
	});	

	/* CALENDAR TOGGLE */

	$('ul.calendar .title, ul.calendar .week, ul.calendar .days').click(function(){
		$(this).parent().nextAll('.body').first().toggleClass('show');
	});

	$('.calendar-row.current-week').nextAll('.body').first().addClass('show');


	/* random colors */

	var colors = ['red', 'blue', 'green'];
	
	function getColor() {
		return colors[Math.floor(Math.random() * colors.length)];
	}

	var currentColor = getColor();

	// $('body').addClass(currentColor);

	// $('#menu li').each(function(){
	// 	var currentColor = getColor();
	// 	$(this).addClass(currentColor);
	// });

});