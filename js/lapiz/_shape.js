/* SHAPE *****************************/
var PI = Math.PI,
	halfPI = 0.5 * Math.PI,
	twoPI = 2 * Math.PI;

lapiz.shape = {
	rectangle: function(x, y, w, h) {
		var x = x || lapiz.canvas.centerX - 80,
			y = y || lapiz.canvas.centerY - 50,
			w = w || 160,
			h = h || 100;

		lapiz.draw
			.beginPath()
			.rect(x, y, w, h)
			.closePath()
			.fill()
			.stroke();
		return lapiz.shape;
	},
	square: function(x, y, w) {
		var x = x || lapiz.canvas.centerX - 50,
			y = y || lapiz.canvas.centerY - 50,
			w = w || 100;
		return lapiz.shape.rectangle(x, y, w, w);
	},
	rectangleRounded: function(x, y, w, h, r, r2, r3, r4) {
		var x = x || lapiz.canvas.centerX - 80,
			y = y || lapiz.canvas.centerY - 50,
			w = w || 160,
			h = h || 100,
			r1 = r || 20,
			r2 = r2 || r1,
			r3 = r3 || r1,
			r4 = r4 || r1;

		lapiz.draw
			.beginPath()
			.moveTo(x, y + r1)
			.arcTo(x, y, x + r1, y, r1)
			.lineTo(x + w - r2, y)
			.arcTo(x + w, y, x + w, y + r2, r2)
			.lineTo(x + w, y + h - r3)
			.arcTo(x + w, y + h, x + w - r3, y + h, r3)
			.lineTo(x + r4, y + h)
			.arcTo(x, y + h, x, y + h - r4, r4)
			.lineTo(x, y + r1)
			.closePath()
			.fill()
			.stroke();
		return lapiz.shape;
	},
	circle: function(x, y, r) {
		var x = x || lapiz.canvas.centerX,
			y = y || lapiz.canvas.centerY,
			r = r || 40;

		lapiz.draw
			.beginPath()
			.arc(x, y, r, 0, twoPI, false)
			.closePath()
			.fill()
			.stroke();
		return lapiz.shape;
	},
	ellipse: function(x, y, w, h) {
		var x = x || lapiz.canvas.centerX,
			y = y || lapiz.canvas.centerY,
			w = w || 160,
			h = h || 80,
			r = 3.7;
		var curve = [{
			cp1: {
				x: x - w / 2,
				y: y - h / r
			},
			cp2: {
				x: x - w / r,
				y: y - h / 2
			},
			p: {
				x: x,
				y: y - h / 2
			}
		}, {
			cp1: {
				x: x + w / r,
				y: y - h / 2
			},
			cp2: {
				x: x + w / 2,
				y: y - h / r
			},
			p: {
				x: x + w / 2,
				y: y
			}
		}, {
			cp1: {
				x: x + w / 2,
				y: y + h / r
			},
			cp2: {
				x: x + w / r,
				y: y + h / 2
			},
			p: {
				x: x,
				y: y + h / 2
			}
		}, {
			cp1: {
				x: x - w / r,
				y: y + h / 2
			},
			cp2: {
				x: x - w / 2,
				y: y + h / r
			},
			p: {
				x: x - w / 2,
				y: y
			}
		}];

		lapiz.draw
			.beginPath()
			.moveTo(curve[3].p.x, curve[3].p.y);

		for (var i = 0; i < 4; i++) {
			lapiz.draw
				.bezierCurveTo(curve[i].cp1.x, curve[i].cp1.y, curve[i].cp2.x, curve[i].cp2.y, curve[i].p.x, curve[i].p.y);
		}
		lapiz.draw
			.closePath()
			.fill()
			.stroke();
		return lapiz.shape;
	},
	polygon: function(x, y, r, s, a) {
		var x = x || lapiz.canvas.centerX,
			y = y || lapiz.canvas.centerY,
			r = r || 60,
			s = s || 5,
			a = a || 0;
		var sideAngle = twoPI / s;
		lapiz.draw
			.beginPath()
			.moveTo(x +  r * Math.sin(a+PI), y +  r *  Math.cos(a+PI));
		for (var i = 0; i < s; i++) {
			lapiz.draw
				.lineTo(x +  r * Math.sin(i * sideAngle + a+PI), y +  r *  Math.cos(i * sideAngle + a+PI));
		}

		lapiz.draw
			.closePath()
			.fill()
			.stroke();
		return lapiz.shape;
	},
	triangle:function(x, y, r, a){
		var x = x || lapiz.canvas.centerX,
			y = y || lapiz.canvas.centerY,
			r = r || 60,
			a = a || 0;
		return lapiz.shape.polygon(x, y, r, 3, a) ;
	},
	line:function(x1,y1,x2,y2){
		var x1 = x1  || lapiz.canvas.centerX - 50,
			y1 = y1  || lapiz.canvas.centerY,
			x2 = x2  || lapiz.canvas.centerX + 50,
			y2 = y2  || lapiz.canvas.centerY;

		lapiz.draw
			.beginPath()
			.moveTo(x1,y1)
			.lineTo(x2,y2)
			.closePath()
			.stroke();
		return lapiz.shape;
	},
	lineHorizontal:function(x,y,w){
		var x = x || lapiz.canvas.centerX - 50,
			y = y  || lapiz.canvas.centerY,
			w = w || 100,
			x2 = x + w,
			y2 = y;
			
		return lapiz.shape.line(x,y,x2,y2);
	},
	lineVertical:function(x,y,h){
		var x = x || lapiz.canvas.centerX,
			y = y  || lapiz.canvas.centerY - 50,
			h = h || 100,
			x2 = x,
			y2 = y + h;
			
		return lapiz.shape.line(x,y,x2,y2);
	},
	path:function(str){
		return lapiz.shape;
	}

}

/* end SHAPE *****************************/