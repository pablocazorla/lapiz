;
(function() {
	var c = document.getElementById('my-canvas').getContext('2d'),
		m = 300,
		px = 100,
		py = 50,
		mathFormula = function(f) {
			c.clearRect(0, 0, c.canvas.width, c.canvas.height);

			c.strokeStyle = '#CCC';

			c.beginPath();
			c.moveTo(px, py);
			c.lineTo(px + m, py);
			c.lineTo(px + m, py + m);
			c.stroke();
			c.closePath();
			c.beginPath();
			c.strokeStyle = '#000';
			c.moveTo(px + m, py + m);
			c.lineTo(px, py + m);
			c.lineTo(px, py);
			c.stroke();
			c.closePath();

			c.strokeStyle = '#F00';
			c.lineWidth = 3;

			c.beginPath();
			c.moveTo(px, py+m);

			for (var i = 0; i < m; i++) {
				var r = Math.round(f(i/m)* m) ;
				c.lineTo(px+i, py+m-r);
			}

			c.stroke();
			c.closePath();

		};
	window.mathFormula = mathFormula;
})();