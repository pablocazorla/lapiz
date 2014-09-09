var ma = false;
if (!ma) {
	var myButton = lapiz.button({
		x: 200,
		y: 100
	});

	myButton.appendTo('my-canvas');



	var rd = lapiz.sprite(function() {
		lapiz.Rectangle();
	}).transform({
		x: 50,
		y: 300
	});



	rd.appendTo('my-canvas');

	var count = 0;


	myButton.click(function() {
		rd.transform({
			y: 300
		}).animate({
			y: 450
		}, 400, function() {
			console.log(this.x);
		});

	});
} else {


	mathFormula(function(p,res,elast) {
		var elasticity = 2,
						resolution = elasticity * 3,
						c = Math.pow(1 - p, elasticity),
						d = 1 - c * Math.abs(Math.cos((p) * Math.PI * resolution * Math.pow(p, 1/elasticity)));
					if (isNaN(d)) {
						d = p;
					}
					return d;
	});


}