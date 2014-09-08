var myButton = lapiz.button({
	x : 200,
	y : 100
});

myButton.appendTo('my-canvas');



var rd = lapiz.sprite(function(){	
	lapiz.Rectangle({
		x : 100,
		y : 300
	});
});





rd.appendTo('my-canvas');





myButton.click(function(){
	console.log('va1');
});