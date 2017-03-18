// APP

var Lap = Lapiz();
Lap.canvas.select('sketch');

// var Lap2 = Lapiz();
// Lap2.canvas.create(600, 30);



Lap
.preload(function() {

		this.image.load('pablin', 'https://cf.geekdo-images.com/images/pic1912529.jpg');


		this.image.load('mickey', 'https://apprecs.org/ios/images/app-icons/256/38/624653112.jpg');

		


	})
	.setup(function() {
		console.log('SETUP');

		// this.style.fill('red');

		// this
		// 	.draw
		// 	.beginPath()
		// 	.moveTo(100, 100)
		// 	.lineTo(100, 300)
		// 	.lineTo(300, 300)
		// 	.lineTo(300, 100)
		// 	.lineTo(100, 100)
		// 	.fill()
		// 	.closePath()

		// 	.and()
		// 	.style.fill('blue')

		// 	.and()
		// 	.shape

		// 	.rectangle()
		// 	.and()
	
		// 	.style.fill('white')

		// 	.and()
		// 	.shape
		// 	.ellipse()

		// 	.and()	
		// 	.style
		// 	.fill('orange')

		// 	.and()
		// 	.shape
		// 	.rectangle(700,40,40,40)

		// 	.and()	
		// 	.style
		// 	.fill('cyan')
		// 	.stroke('magenta')
		// 	.strokeWidth(20)


		// 	.and()
		// 	.shape
		// 	.square(78,78,78)


		// 	.and()	
		// 	.style
		// 	.fill('#29f')
		// 	.strokeWidth(0)


		// 	.and()
		// 	.shape
		// 	.rectangleRounded(310,200,300,200,30)

		// 	.and()	
		// 	.style
		// 	.fill('orange')
		// 	.stroke('grey')
		// 	.strokeWidth(2)

		// 	.and()
		// 	.shape
		// 	.polygon()
		// 	.triangle()

		// 	.and()	
		// 	.style
		// 	.stroke('black')
		// 	.strokeWidth(10)

		// 	.and()
		// 	.shape
		// 	.line(20,20,140,140)

		// 	.and()	
		// 	.style
		// 	.stroke('green')

		// 	.and()
		// 	.shape
		// 	.lineHorizontal()
		// 	.lineVertical()

		// 	.and()	
		// 	.style
		// 	.stroke('blue')
		// 	.strokeWidth(3)

		// 	.and()
		// 	.shape
		// 	.path();


		// var micolor = this.style.createColor('red');

		// this
		// .style
		// .fill(micolor)

		// .and()
		// 	.shape
		// 	.polygon();

		// micolor.val = 'blue';

		// this
		// 	.shape
		// 	.polygon(100,100);

		// micolor.val = 'green';

		// this
		// 	.shape
		// 	.polygon(100,200);


		var texture = this.style.createPattern('mickey');

		this
		.style
		.fill(texture)

		.and()
			.shape
			.rectangle(10,10,256,256);

	})
	// .render(function() {

// });