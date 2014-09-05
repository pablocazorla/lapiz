var posY = 100;
/*lapiz.Rectangle({
	fillStyle : 'red'
})
.setStyles({
	fillStyle : 'rgba(0,0,255,.5)'
})
.beginPath()
.moveTo(100,100)
.lineTo(200,posY)
.lineTo(100,200)
.lineTo(100,100)
.endShape()
.closePath();
*/

var cosa = lapiz.sprite(function(){
	lapiz.Rectangle({
		fillStyle : 'red',
		strokeStyle : 'transparent'		
	})
	.Circle({
		x : 200,
		y : 100
	})
	.Rectangle({
		fillStyle : 'green',
		strokeStyle : 'red',
		x : 50,
		height: 200,
		y:45
	})
	.setStyles({
		fillStyle : 'rgba(0,0,255,.5)'
	})
	.beginPath()
	.moveTo(100,100)
	.lineTo(200,posY)
	.lineTo(100,200)
	.lineTo(100,100)
	.endShape()
	.closePath();
})
.transform({
	x : 200,
	y : 200,
	rotation : 60
})
/*
.onEnterFrame(function(){
	this.rotation++;
	posY++;
})
*/
.appendTo('my-canvas');


cosa2 = lapiz.sprite(function(){
	lapiz.Rectangle({
		fillStyle : '#FF0',
		strokeStyle : 'black'		
	});
}).transform({
	x : 250
});



cosa.append(cosa2).click(function(e){	
	//console.log('soy cosa 1');
})
.mouseup(function(){
	//console.log('muevo');
})
.mouseover(function(){
	//console.log('over');
})
.mouseout(function(){
	//console.log('out');
});



/*var cosa1 = lapiz.sprite();
cosa1.appendTo('my-canvas');
var cosa2 = lapiz.sprite();
var cosa3 = lapiz.sprite();
cosa2.appendTo(cosa1);
cosa3.appendTo(cosa2);
cosa1.x = -5;
cosa1.y = 200;
cosa1.rotation = 45;
cosa2.x = -40;
cosa2.y = -20;
setInterval(function(){
	cosa1.rotation += -.5;
	cosa2.rotation += -1;
	cosa3.rotation += 4;
	cosa1.x += 1;
},30);
*/
/*
{
	'fillStyle':'#FFFFFF',
	'font':'10px sans-serif',
	'globalAlpha':1,
	'globalCompositeOperation':'source-over',
	'lineCap':'butt',
	'lineDashOffset':0,
	'lineJoin':'miter',
	'lineWidth':1,
	'miterLimit':10,
	'shadowBlur':0,
	'shadowColor':'rgba(0, 0, 0, 0)',
	'shadowOffsetX':0,
	'shadowOffsetY':0,
	'strokeStyle':'#000000',
	'textAlign':'start',
	'textBaseline':'alphabetic'
}
*/