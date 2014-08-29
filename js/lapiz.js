// LAPIZ
;(function(){

	var
		/*
		 * Utils
		*/
		// Console
		k = function(str){
			try{console.log(str);}catch(e){};			
		},
		// extend
		extend = function(){
			var dest = {},
				ext = function(destination, source) {
				var source = source || {};
				for (var property in source) {
					if (source[property] && source[property].constructor && source[property].constructor === Object) {
						destination[property] = destination[property] || {};
						arguments.callee(destination[property], source[property]);
					}else{
						destination[property] = source[property];
					}
				}
				return destination;
			};
			for(i = 0;i < arguments.length;i++) {
				dest = ext(dest,arguments[i]);
		    }
		    return dest;
		},		
		/*
		 * Private variables
		*/
		canvasList = [],
		canvasListLength = 0,
		idCounter = 0,
		timeRender = null,

		/*
		 * Private methods
		*/
		findCanvasById = function(id){
			var canvasToReturn = false;
			for(var i=0;i<canvasListLength;i++){
				if(canvasList[i].id == id){
					canvasToReturn = canvasList[i];
				}
			}
			return canvasToReturn;
		},
		canvasNodeId = function(node){
			var idCanvas = node.getAttribute('id');
			if(idCanvas == '' || idCanvas == undefined){
				idCanvas = 'canvas-'+idCounter;
				idCounter++;
				node.setAttribute('id',idCanvas);				
			}
			return idCanvas;
		},
		setContextStyle = function(o){
			for(var a in o){
				if(typeof c[a] != 'undefined'){
					c[a] = o[a];
				}
			}
		},

		/*
		 * Shapes
		*/
		shapeOptionsDefault = {
			x : 0,
			y : 0,
			fillStyle : '#FFF',
			strokeStyle : '#000'
		},
		shapes = {
			'circle': function(options){
				var o = extend(shapeOptionsDefault,{
					radius : 10				
				},options);
				setContextStyle(o);
			},
			'rectangle': function(options){
				var o = extend(shapeOptionsDefault,{
					width : 100,
					height : 100
				},options);
				setContextStyle(o);

				c.beginPath();
				c.moveTo(o.x, o.y);
				c.lineTo(o.x+o.width,o.y);
				c.lineTo(o.x+o.width,o.y+o.height);
				c.lineTo(o.x,o.y+o.height);
				c.lineTo(o.x, o.y);
				c.fill();
				c.stroke();
				c.closePath();
			},
		},

		/*
		 * Canvas Class
		*/
		cnv = function(selection){
			return this.init(selection);
		},

		/*
		 * Sprite Class
		*/
		spr = function(shapeFunction,options){
			return this.init(shapeFunction,options);
		};

	/*
	 * Canvas Definition
	*/
	cnv.prototype = {
		init : function(selection){
			this.node = document.getElementById(selection);
			this.id = selection;
			if(this.node != undefined){
				this.context = this.node.getContext('2d');		
			}else{
				k('There is not canvas with id: '+selection+'.');
			}

			this.childs = [];
			this.length = 0;

			return this;			
		},
		append : function(sprite){
			if(sprite.parent != null){
				sprite.parent.detach(sprite);
			}
			this.childs.push(sprite);				
			this.length++;
			sprite.parent = this;
			return this;
		},
		detach : function(sprite){
			if(typeof sprite.spriteType != 'undefined'){
				for(var i = 0; i < this.length; i++){
					if(this.childs[i].id == sprite.id){
						sprite.parent = null;
						this.childs.splice(i,1);
						this.length--;
					}
				}
			}
			return this;
		},
		render : function(){
			c = this.context;
			c.setTransform(1,0,0,1,0,0);
			c.clearRect(0,0,this.node.width,this.node.height);
			for(var i = 0; i < this.length; i++){
				c.setTransform(1,0,0,1,0,0);
				this.childs[i].render();
			}
		}
	};

	/*
	 * Sprite Definition
	*/
	spr.prototype = {
		spriteType : true,
		init : function(shapeFunction, options){
			this.id = 'spr-'+ idCounter;
			idCounter++;
			return this.reset().shape(shapeFunction, options);
		},
		reset : function(){			
			this.shp = null;
			this.x = 0;
			this.y = 0;
			this.xScale = 1;
			this.yScale = 1;
			this.rotation = 0;
			this.parent = null;
			this.childs = [];
			this.length = 0;			

			return this;
		},
		shape : function(shapeFunction, options){
			var shapeFunction = shapeFunction || function(){};
			if(typeof shapeFunction == 'string'){
				if(typeof shapes[shapeFunction.toLowerCase()] == 'function'){
					shapeFunction = shapes[shapeFunction.toLowerCase()];
				}else{
					k('Sorry, there is not a shape named "'+shapeFunction+'".');
				}
			}
			this.shp = function(){shapeFunction(options);};
			return this;
		},
		append : function(sprite){
			if(typeof sprite.spriteType != 'undefined'){
				if(sprite.parent != null){
					sprite.parent.detach(sprite);
				}
				this.childs.push(sprite);				
				this.length++;
				sprite.parent = this;
			}			
			return this;
		},
		appendTo : function(spriteOrCanvas){
			if(typeof spriteOrCanvas.spriteType != 'undefined'){
				//Sprite
				spriteOrCanvas.append(this);
			}else{
				//Canvas
				lapiz.getCanvas(spriteOrCanvas).append(this);
			}
			return this;
		},
		detach : function(sprite){
			if(typeof sprite.spriteType != 'undefined'){
				for(var i = 0; i < this.length; i++){
					if(this.childs[i].id == sprite.id){
						sprite.parent = null;
						this.childs.splice(i,1);
						this.length--;
					}
				}
			}
			return this;
		},
		transform : function(coordinates){

		},
		render : function(){
			var rotRadians = this.rotation * Math.PI/180;
			// Set Coordinates
			c.translate(this.x,this.y);			
			c.rotate(rotRadians);
			c.scale(this.xScale,this.yScale);

			// Render
			this.shp();

			// Render Childs
			for(var i = 0; i < this.length; i++){
				this.childs[i].render();
			}

			// Restore Coordinates
			c.scale(1/this.xScale,1/this.yScale);
			c.rotate(-rotRadians);			
			c.translate(-this.x,-this.y);

			return this;
		}
	};

	/*
	 * Lapiz
	*/
	var lapiz = {
		init : function(){
			if(timeRender == null){
				timeRender = setInterval(function(){
					for(var i = 0; i < canvasListLength; i++){
						canvasList[i].render();
					}
				},20);
			}
			return this;
		},	
		sprite : function(shapeFunction,options){
			return new spr(shapeFunction,options);
		},
		getCanvas : function(selection){
			var idSelection = (typeof selection == 'string') ? selection : canvasNodeId(selection),
				preCanvas = findCanvasById(idSelection);

			if(preCanvas){
				return preCanvas;
			}else{
				var newCanvas = new cnv(idSelection);
				canvasList.push(newCanvas);
				canvasListLength++;
				return newCanvas;
			}
		},
		mostrar : function(){
			
		}
	};

	window.lapiz = lapiz.init();
})();

kt = function(str){
	console.log(str);
};