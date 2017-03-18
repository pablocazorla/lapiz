/* STYLE *****************************/

var strokeWidth = 1;

var idFillCounter = 1,
	currentFill = {
		id: 0,
		type: 'color',
		value: '#000'
	},
	updateFill = function(f) {

		if (f.id === currentFill.id) {
			lapiz.style.fill(f);
		}
	};


lapiz.style = {
	fill: function(v) {
		if (typeof v === 'string') {
			lapiz.ctx.fillStyle = v;
			currentFill = lapiz.style.createColor(v);
		} else {
			console.log(v);
			lapiz.ctx.fillStyle = v.value;
			currentFill = v;
		}
		return lapiz.style;
	},
	stroke: function(v) {

		if (typeof v === 'string') {
			lapiz.ctx.strokeStyle = v;
		} else {

		}
		return lapiz.style;
	},
	strokeWidth: function(v) {
		strokeWidth = parseFloat(v);
		lapiz.ctx.lineWidth = strokeWidth;

		return lapiz.style;
	},
	createColor:function(str){
		var c = str || '#000';

		var color = {
			id: idFillCounter++,
			type: 'color',
			value : c,
			get val() {
				return this.value;
			},
			set val(val) {
				this.value = val;
				updateFill(this);
			}
		}
		return color;
	},
	createPattern: function(imageName, repeat, x, y) {
		var repeat = repeat || 'repeat',
			x = x || 0,
			y = y || 0,
			create = function(imageName,repeat){
				return lapiz.ctx.createPattern(imageBuffer[imageName],repeat);
			},
			pattern = create(imageName,repeat);

		var pat = {
			id: idFillCounter++,
			type: 'pattern',
			value:pattern,
			imageName: imageName,
			repeatValue: repeat,
			xOffset: x,
			yOffset: y,
			get image() {
				return this.imageName;
			},
			set image(val) {
				this.imageName = val;
				this.value = create(this.imageName,this.repeatValue);
				updateFill(this);
			},
			get repeat() {
				return this.repeatValue;
			},
			set repeat(val) {
				this.repeatValue = val;
				this.value = create(this.imageName,this.repeatValue);
				updateFill(this);
			},
			get x() {
				return this.xOffset;
			},
			set x(val) {
				this.xOffset = val;
				updateFill(this);
			},
			get y() {
				return this.yOffset;
			},
			set y(val) {
				this.yOffset = val;
				updateFill(this);
			}
		}
		return pat;
	}
}