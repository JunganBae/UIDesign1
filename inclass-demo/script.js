document.querySelectorAll('.item').forEach(function(item) {
	item.addEventListener('click', function() {
		this.classList.toggle('active');
	});
});

//---------------------------
// setup show hide all button
//---------------------------
document.querySelector('#showhide').addEventListener('click', function() {
	const items = document.querySelectorAll('.item');
	items.forEach(function(item) {
		item.classList.toggle('active');
	});
});

//------------------------------------
// adds a a darkmode class to the body
//------------------------------------
document.querySelector('#darkmode').addEventListener('click', function() {
	document.getElementsByTagName('body')[0].classList.toggle('darkmode');
});
