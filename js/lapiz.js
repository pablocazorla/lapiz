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
		idCounter = 0,

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
			}
		},

		/*
		 * Canvas Class
		*/
		cnv = function(canvas){
			return this.init(canvas);
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
		init : function(shapeFunction, options){					
			return this.reset().shape(shapeFunction, options);
		},
	};

	/*
	 * Sprite Definition
	*/
	spr.prototype = {
		init : function(shapeFunction, options){					
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
		append : function(){
			return this;
		},
		appendTo : function(){
			return this;
		},
		transform : function(coordinates){

		}
	};

	/*
	 * Lapiz
	*/
	var lapiz = {		
		sprite : function(shapeFunction,options){
			return new spr(shapeFunction,options);
		}
	};

	window.lapiz = lapiz;
})();

kt = function(str){
	console.log(str);
};