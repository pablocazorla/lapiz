/* DRAW *****************************/
lapiz.draw = {
	beginPath: function() {
		lapiz.ctx.beginPath();
		return lapiz.draw;
	},
	closePath: function() {
		lapiz.ctx.closePath();
		return lapiz.draw;
	},
	fill: function() {
		lapiz.ctx.fill();
		return lapiz.draw;
	},
	stroke: function() {
		if(strokeWidth > 0){
			lapiz.ctx.stroke();
		}		
		return lapiz.draw;
	},
	moveTo: function(x,y) {
		lapiz.ctx.moveTo(x,y);
		return lapiz.draw;
	},
	lineTo: function(x,y) {
		lapiz.ctx.lineTo(x,y);
		return lapiz.draw;
	},
	arcTo: function(x1,y1,x2,y2,radius) {
		lapiz.ctx.arcTo(x1,y1,x2,y2,radius);
		return lapiz.draw;
	},
	quadraticCurveTo: function(xp,yp,x,y) {
		lapiz.ctx.quadraticCurveTo(xp,yp,x,y);
		return lapiz.draw;
	},
	bezierCurveTo: function(xp1,yp1,xp2,yp2,x,y) {
		lapiz.ctx.bezierCurveTo(xp1,yp1,xp2,yp2,x,y);
		return lapiz.draw;
	},
	arc: function(x,y,startAngle,endAngle,anticlockwise) {
		lapiz.ctx.arc(x,y,startAngle,endAngle,anticlockwise);
		return lapiz.draw;
	},
	rect: function(x,y,w,h) {
		lapiz.ctx.rect(x,y,w,h);
		return lapiz.draw;
	},
	isPointInPath: function(x,y) {
		return lapiz.ctx.isPointInPath(x,y);
	}
}

/* end DRAW *****************************/