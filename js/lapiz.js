// LAPIZ
;
(function() {

	var
	/*
	 * Utils *******************************************************************************************************
	 */
	// Console
		k = function(str) {
			try {
				console.log(str);
			} catch (e) {};
		},
		// extend objects
		extend = function() {
			var dest = {},
				ext = function(destination, source) {
					var source = source || {};
					for (var property in source) {
						if (source[property] && source[property].constructor && source[property].constructor === Object) {
							destination[property] = destination[property] || {};
							arguments.callee(destination[property], source[property]);
						} else {
							destination[property] = source[property];
						}
					}
					return destination;
				};
			for (i = 0; i < arguments.length; i++) {
				dest = ext(dest, arguments[i]);
			}
			return dest;
		},
		// DOM Event Handler
		on = function(eventTarget, eventType, eventHandler) {
			eventTarget.node.addEventListener(eventType, eventHandler, false);
		},

		/*
		 * Private variables *******************************************************************************************************
		 */

		// Context
		c,

		// overMouse
		overMouse = false,
		eventMouseInfo = {
			type: null,
			x: 0,
			y: 0
		},

		// if use Sprites
		spriteMode = false,

		// Counter ti generate differents IDs.
		idCounter = 0,

		defOptions = {
			x: 10,
			y: 10,
			fillStyle: '#808080',
			fillStroke: '#000'
		},

		// Mouse Event list
		MouseEventList = ['click', 'mousedown', 'mouseup', 'mousemove'],

		/*
		 * Private handlers *******************************************************************************************************
		 */
		// Canvas List handler.
		canvasList = {
			list: [],
			length: 0,
			find: function(selection) {
				var idSelection = (typeof selection == 'string') ? selection : this.nodeId(selection),
					canvasToReturn = false;
				for (var i = 0; i < this.length; i++) {
					if (this.list[i].id == idSelection) {
						canvasToReturn = this.list[i];
					}
				}
				return canvasToReturn;
			},
			nodeId: function(node) {
				var idCanvas = node.getAttribute('id');
				if (idCanvas == '' || idCanvas == undefined) {
					idCanvas = 'canvas-' + idCounter;
					idCounter++;
					node.setAttribute('id', idCanvas);
				}
				return idCanvas;
			},
			newCanvas: function(selection) {
				var idSelection = (typeof selection == 'string') ? selection : this.nodeId(selection),
					nc = new cnv(idSelection);
				this.list.push(nc);
				this.length++;
				return nc;
			},
			getNumSprites: function() {
				var num = 0;
				for (var i = 0; i < this.length; i++) {
					num += this.list[i].length;
				}
				return num;
			},
			render: function() {
				for (var i = 0; i < this.length; i++) {
					this.list[i].render();
				}
			}
		},

		/*
		 * Private Classes *******************************************************************************************************
		 */
		// Canvas Class
		cnv = function(selection) {
			return this.init(selection);
		},

		// Sprite Class
		spr = function(shapeFunction, options) {
			return this.init(shapeFunction, options);
		};

	/*
	 * Private Classes Definitions *******************************************************************************************************
	 */
	// Canvas Class Definition
	cnv.prototype = {
		type: 'canvas',
		init: function(selection) {
			this.node = document.getElementById(selection);
			this.id = selection;
			if (this.node != undefined) {
				// Context
				this.context = this.node.getContext('2d');
				this.eventInfo = {
					type: null,
					x: 0,
					y: 0
				}
				this.setMouseEvents();

			} else {
				k('There is not canvas with id: ' + selection + '.');
			}
			this.childs = [];
			this.length = 0;

			return this;
		},
		append: function(sprite) {
			if (sprite.parent != null) {
				sprite.parent.detach(sprite);
			}
			this.childs.push(sprite);
			this.length++;
			sprite.parent = this;
			sprite.parentCanvas = this;
			sprite.updateParentCanvasForChilds();
			lapiz.verifySpriteMode();
			return this;
		},
		detach: function(sprite) {
			if (sprite.type == 'sprite') {
				for (var i = 0; i < this.length; i++) {
					if (this.childs[i].id == sprite.id) {
						sprite.parent = null;
						this.childs.splice(i, 1);
						this.length--;
						lapiz.verifySpriteMode();
					}
				}
			}
			return this;
		},
		render: function() {
			lapiz.width = this.node.width;
			lapiz.height = this.node.height;
			c = this.context;
			c.setTransform(1, 0, 0, 1, 0, 0);
			c.clearRect(0, 0, this.node.width, this.node.height);
			for (var i = 0; i < this.length; i++) {
				c.setTransform(1, 0, 0, 1, 0, 0);

				this.childs[i].render();
			}
			this.eventInfo.type = null;
		},
		// Mouse Events
		setMouseEvents: function() {
			var self = this;
			for (var i = 0; i < MouseEventList.length; i++) {
				on(self, MouseEventList[i], function(evt) {
					var rect = self.node.getBoundingClientRect();
					self.eventInfo = {
						type: evt.type,
						x: Math.round(evt.clientX - rect.left),
						y: Math.round(evt.clientY - rect.top)
					};
				});
			}
			return this;
		},
		cursor: function(styleCursor) {
			this.node.style.cursor = styleCursor;
			return this;
		}
	};

	// Sprite Class Definition
	spr.prototype = {
		type: 'sprite',
		init: function(shapeFunction) {
			this.id = 'spr-' + idCounter;
			idCounter++;
			return this.reset().shape(shapeFunction);
		},
		reset: function() {
			this.shp = null;
			this.x = 0;
			this.y = 0;
			this.xScale = 1;
			this.yScale = 1;
			this.rotation = 0;
			this.parent = null;
			this.parentCanvas = null;
			this.childs = [];
			this.length = 0;
			this.mouseEvents = false;
			this.mouseEventList = [];
			this.overMouse = false;
			this.preOverMouse = false;

			return this;
		},
		shape: function(shapeFunction) {
			this.shp = shapeFunction || function() {};
			return this;
		},
		updateParentCanvasForChilds: function() {
			for (var i = 0; i < this.length; i++) {
				this.childs[i].parentCanvas = this.parentCanvas;
				this.childs[i].updateParentCanvasForChilds();
			}
			return this;
		},
		append: function(sprite) {
			if (sprite.type == 'sprite') {
				if (sprite.parent != null) {
					sprite.parent.detach(sprite);
				}
				this.childs.push(sprite);
				this.length++;
				sprite.parent = this;
				sprite.parentCanvas = this.parentCanvas;
				sprite.updateParentCanvasForChilds();
			}
			return this;
		},
		appendTo: function(spriteOrCanvas) {
			if (spriteOrCanvas.type == 'sprite') {
				//Sprite
				spriteOrCanvas.append(this);
			} else {
				//Canvas
				lapiz.getCanvas(spriteOrCanvas).append(this);
			}
			return this;
		},
		detach: function(sprite) {
			if (sprite.type == 'sprite') {
				for (var i = 0; i < this.length; i++) {
					if (this.childs[i].id == sprite.id) {
						sprite.parent = null;
						sprite.parentCanvas = null;
						sprite.updateParentCanvasForChilds();
						this.childs.splice(i, 1);
						this.length--;
					}
				}
			}
			return this;
		},
		transform: function(coordinates) {
			for (var a in coordinates) {
				if (typeof this[a] != 'undefined') {
					this[a] = coordinates[a];
				}
			}
			return this;
		},
		blowOverMouse: function() {
			if (this.parent != null) {
				if (this.parent.type == 'sprite') {
					this.parent.overMouse = true;
					this.parent.blowOverMouse();
				}
			}
		},
		render: function() {
			var self = this,
				rotRadians = this.rotation * Math.PI / 180;
			// Set Coordinates
			c.translate(this.x, this.y);
			c.rotate(rotRadians);
			c.scale(this.xScale, this.yScale);
			for (var ef = 0; ef < this.enterFrameEvent.length; ef++) {
				this.enterFrameEvent.handlers[ef].apply(this, [self]);
			}

			// Render
			overMouse = false;

			eventMouseInfo.type = this.parentCanvas.eventInfo.type;
			eventMouseInfo.x = this.parentCanvas.eventInfo.x;
			eventMouseInfo.y = this.parentCanvas.eventInfo.y;

			this.shp();
			this.overMouse = overMouse;

			if (overMouse) {
				this.blowOverMouse();
			}

			// Render Childs
			for (var i = 0; i < this.length; i++) {
				this.childs[i].render();
			}

			this.fireEvents();
			this.preOverMouse = this.overMouse;
			// Restore Coordinates
			c.scale(1 / this.xScale, 1 / this.yScale);
			c.rotate(-rotRadians);
			c.translate(-this.x, -this.y);

			return this;
		},
		enterFrameEvent: {
			handlers: [],
			length: 0
		},
		onEnterFrame: function(handler) {
			this.enterFrameEvent.handlers.push(handler);
			this.enterFrameEvent.length++;
			return this;
		},
		// Mouse Events
		on: function(eventName, handler) {
			this.mouseEventList.push({
				type: eventName,
				handler: handler
			});
			return this;
		},
		click: function(handler) {
			return this.on('click', handler);
		},
		mousemove: function(handler) {
			return this.on('mousemove', handler);
		},
		mousedown: function(handler) {
			return this.on('mousedown', handler);
		},
		mouseup: function(handler) {
			return this.on('mouseup', handler);
		},
		mouseover: function(handler) {
			return this.on('mouseover', handler);
		},
		mouseout: function(handler) {
			return this.on('mouseout', handler);
		},
		hover: function(handlerOver, handlerOut) {
			this.on('mouseover', handlerOver);
			if (handlerOut) {
				this.on('mouseout', handlerOut);
			}
			return this;
		},
		fireEvents: function() {
			if (this.parentCanvas != null) {
				var self = this;
				for (var i = 0; i < this.mouseEventList.length; i++) {
					if (self.overMouse) {
						switch (this.mouseEventList[i].type) {
							case 'mouseover':
								if (!self.preOverMouse && self.overMouse) {
									eventMouseInfo.type = 'mouseover';
									this.mouseEventList[i].handler.apply(self, [eventMouseInfo]);
								}
								break;
							case 'mouseup':
								if (eventMouseInfo.type == 'click' || eventMouseInfo.type == 'mouseup') {
									eventMouseInfo.type = 'mouseup';
									this.mouseEventList[i].handler.apply(self, [eventMouseInfo]);
								}
								break;
							default:
								if (eventMouseInfo.type == this.mouseEventList[i].type) {
									this.mouseEventList[i].handler.apply(self, [eventMouseInfo]);
								}
						}
					} else {
						if (self.preOverMouse && this.mouseEventList[i].type == 'mouseout') {
							eventMouseInfo.type = 'mouseout';
							this.mouseEventList[i].handler.apply(self, [eventMouseInfo]);
						}
					}
				}
			}
			return this;
		}
	};

	/*
	 * Public Lapiz *******************************************************************************************************
	 */
	var lapiz = {
		timeFrameRender: null,
		width: 0,
		height: 0,
		extendObject: extend,
		init: function() {
			var cnv = document.getElementsByTagName('canvas');
			if (cnv.length > 0) {
				this.setCanvas(cnv[0]);
			}

			return this;
		},
		sprite: function(shapeFunction, options) {
			return new spr(shapeFunction, options);
		},
		getCanvas: function(selection) {
			var preCanvas = canvasList.find(selection);
			if (preCanvas) {
				return preCanvas;
			} else {
				var newCanvas = canvasList.newCanvas(selection);
				return newCanvas;
			}
		},
		setCanvas: function(selection) {
			var theCanvas = this.getCanvas(selection);
			c = theCanvas.context;
			this.width = theCanvas.node.width;
			this.height = theCanvas.node.height;
			return this;
		},
		verifySpriteMode: function() {
			var numSprites = canvasList.getNumSprites();
			if (numSprites > 0) {
				if (this.timeFrameRender == null) {
					spriteMode = true;
					this.timeFrameRender = setInterval(function() {
						canvasList.render();
					}, 20);
				}
			} else {
				if (this.timeFrameRender != null) {
					spriteMode = false;
					clearInterval(this.timeFrameRender);
					this.timeFrameRender = null;
				}
			}
			return this;
		},

		// Drawing		
		setStyles: function(o) {
			for (var a in o) {
				if (typeof c[a] != 'undefined') {
					c[a] = o[a];
				}
			}
			return this;
		},
		beginPath: function() {
			c.beginPath();
			return this;
		},
		moveTo: function(x, y) {
			c.moveTo(x, y);
			return this;
		},
		lineTo: function(x, y) {
			c.lineTo(x, y);
			return this;
		},
		arc: function(x, y, radius, startAngle, endAngle, counterClockwise) {
			c.arc(x, y, radius, startAngle, endAngle, counterClockwise);
			return this;
		},
		fill: function() {
			c.fill();
			return this;
		},
		stroke: function() {
			c.stroke();
			return this;
		},
		closePath: function() {
			c.closePath();
			return this;
		},
		rect: function(x, y, width, height) {
			c.rect(x, y, width, height);
			return this;
		},
		fillStyle: function(f) {
			c.fillStyle = f;
			return this;
		},
		fillText: function(text, x, y) {
			c.fillText(text, x, y);
			return this;
		},
		textBaseline: function(tb) {
			c.textBaseline = tb;
			return this;
		},
		measureText: function(text) {
			return c.measureText(text);
		},

		// Shapes
		endShape: function() {
			this.fill().stroke();
			if (c.isPointInPath(eventMouseInfo.x, eventMouseInfo.y)) {
				overMouse = true;
			}

			return this;
		},
		Rectangle: function(custom) {
			var o = extend(defOptions, {
				width: 100,
				height: 50
			}, custom);
			this
				.setStyles(o)
				.beginPath()
				.rect(o.x, o.y, o.width, o.height)
				.closePath()
				.endShape();
			return this;
		},
		Circle: function(custom) {
			var o = extend(defOptions, {
				radius: 20
			}, custom);
			this
				.setStyles(o)
				.beginPath()
				.arc(o.x, o.y, o.radius, 0, Math.PI * 2)
				.closePath()
				.endShape();
			return this;
		},

		mostrar: function() {
			return this;
		},
		esta: function() {
			return true;
		}
	};

	window.lapiz = lapiz.init();
})();