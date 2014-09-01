// LAPIZ
;(function(){

	var
		/*
		 * Utils *******************************************************************************************************
		*/
		// Console
		k = function(str){
			try{console.log(str);}catch(e){};			
		},
		// extend objects
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
		 * Private variables *******************************************************************************************************
		*/

		// Context
		c,

		// if use Sprites
		spriteMode = false,

		// Counter ti generate differents IDs.
		idCounter = 0,

		defOptions = {
			x : 10,
			y : 10,
			fillStyle : '#808080',
			fillStroke : '#000'
		}

		/*
		 * Private handlers *******************************************************************************************************
		*/
		// Canvas List handler.
		canvasList = {
			list: [],
			length: 0,			
			find : function(selection){
				var idSelection = (typeof selection == 'string') ? selection : this.nodeId(selection),
						canvasToReturn = false;
				for(var i=0;i<this.length;i++){
					if(this.list[i].id == idSelection){
						canvasToReturn = this.list[i];
					}
				}
				return canvasToReturn;
			},
			nodeId : function(node){
				var idCanvas = node.getAttribute('id');
				if(idCanvas == '' || idCanvas == undefined){
					idCanvas = 'canvas-'+idCounter;
					idCounter++;
					node.setAttribute('id',idCanvas);				
				}
				return idCanvas;
			},
			newCanvas : function(selection){
				var idSelection = (typeof selection == 'string') ? selection : this.nodeId(selection),
					nc = new cnv(idSelection);
				this.list.push(nc);
				this.length++;
				return nc;
			},
			getNumSprites : function(){
				var num = 0;
				for(var i=0;i<this.length;i++){
					num += this.list[i].length;				
				}
				return num;
			},
			render : function(){
				for(var i=0;i<this.length;i++){
					this.list[i].render();				
				}
			}
		},

		

		/*
		 * Private Classes *******************************************************************************************************
		*/
		// Canvas Class
		cnv = function(selection){
			return this.init(selection);
		},

		// Sprite Class
		spr = function(shapeFunction,options){
			return this.init(shapeFunction,options);
		};

	/*
	 * Private Classes Definitions *******************************************************************************************************
	*/
	// Canvas Class Definition
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
			lapiz.verifySpriteMode();
			return this;
		},
		detach : function(sprite){
			if(typeof sprite.spriteType != 'undefined'){
				for(var i = 0; i < this.length; i++){
					if(this.childs[i].id == sprite.id){
						sprite.parent = null;
						this.childs.splice(i,1);
						this.length--;
						lapiz.verifySpriteMode();
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

	// Sprite Class Definition
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
		shape : function(shapeFunction){			
			this.shp = shapeFunction || function(){};
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
	 * Public Lapiz *******************************************************************************************************
	*/
	var lapiz = {
		timeFrameRender : null,
		init : function(){		
			return this;
		},	
		sprite : function(shapeFunction,options){			
			return new spr(shapeFunction,options);
		},
		getCanvas : function(selection){
			var preCanvas = canvasList.find(selection);
			if(preCanvas){
				return preCanvas;
			}else{
				var newCanvas = canvasList.newCanvas(selection);
				return newCanvas;
			}
		},
		verifySpriteMode : function(){
			var numSprites = canvasList.getNumSprites();
			if(numSprites > 0){
				if(this.timeFrameRender == null){
					spriteMode = true;
					this.timeFrameRender = setInterval(function(){
						canvasList.render();
					},20);
				}
			}else{
				if(this.timeFrameRender != null){
					spriteMode = false;
					clearInterval(this.timeFrameRender);
					this.timeFrameRender = null;
				}
			}
			return this;
		},

		// Drawing		
		setStyles = function(o){
			for(var a in o){
				if(typeof c[a] != 'undefined'){
					c[a] = o[a];
				}
			}
			return this;
		},
		beginPath : function(){
			c.beginPath();
			return this;
		},
		moveTo : function(x,y){
			c.moveTo(x,y);
			return this;
		},
		lineTo : function(x,y){
			c.moveTo(x,y);
			return this;
		},
		fill : function(){
			c.fill();
			return this;
		},
		stroke : function(){
			c.stroke();
			return this;
		},
		closePath : function(){
			c.closePath();
			return this;
		},

		// Shapes

		Rectangle : function(custom){
			var o = extend(defOptions,{
				width: 100,
				height : 50
			},custom);

			lapiz
			.setStyles(o)
			.beginPath()
			.moveTo(o.x,o.y)
			.lineTo(o.x+o.width,o.y)
			.lineTo(o.x+o.width,o.y+o.height)
			.lineTo(o.x,o.y+o.height)
			.lineTo(o.x,o.y)
			.fill()
			.stroke()
			.closePath();

			return this;
		},

		mostrar : function(){
			return this;
		}
	};

	window.lapiz = lapiz.init();
})();