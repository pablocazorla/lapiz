var cosa1 = lapiz.sprite('Rectangle',{
	fillStyle : 'red'
});
cosa1.appendTo('my-canvas');
var cosa2 = lapiz.sprite('Rectangle',{
	fillStyle : 'blue',
	strokeStyle : '#FF0',
	width : 60,
	height : 40
});
var cosa3 = lapiz.sprite('Rectangle',{
	fillStyle : '#FF0',
	x : -70,
	y : -15,
	width : 140,
	height : 25
});
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