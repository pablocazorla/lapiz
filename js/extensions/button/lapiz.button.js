;
(function() {
	lapiz.button = function(options) {
		

		var cfg = {
				text: 'Button',
				x: 0,
				y: 0,
				style: {
					common: {
						'padding': '8px 15px',
						'fillStyle': {
							'0': 'black',
							'1': 'green'
						},
						'strokeStyle': '#666',
						'lineWidth': 1,
						'color': '#EEE',
						'font': '16px sans-serif',
						'textBaseline': 'middle',
						'textAlign': 'center',
						'borderRadius': '10px'
					},
					hover: {
						'fillStyle': {
							'0': 'yellow',
							'1': 'red'
						},
						'strokeStyle': '#00F'
					},
					active: {
						'fillStyle': {
							'0': 'orange',
							'1': 'black'
						},
						'strokeStyle': '#00F'
					},
					disabled: {
						'fillStyle': '#888',
						'strokeStyle': '#00F',
						'color': '#AAA'
					}
				}
			},
			enabledBtn = true,
			sty = 'common',

			btn = lapiz.sprite();

		/**********************************************************/
		btn._draw = function() {
			var prop = lapiz.extendObject(cfg.style.common, cfg.style[sty]),
				padding = lapiz.stringNumberToArray(prop.padding),
				br = lapiz.stringNumberToArray(prop.borderRadius);

			prop.width = lapiz.setStyles({
				'font': prop.font
			}).textWidth(cfg.text) + padding[3] + padding[1],
			prop.height = parseInt(prop.font) + padding[0] + padding[2];

			prop.fillStyle = lapiz.linearGradient(0, 0, 0, prop.height, prop.fillStyle).returnValue();


			btn.shape(function() {
				lapiz
					.Rectangle(prop)
					.fillStyle(prop.color)
					.fillText(cfg.text, prop.width / 2, prop.height / 2);
			});
			return btn;
		};
		btn.update = function(opt) {
			cfg = lapiz.extendObject(cfg, opt);
			btn.x = cfg.x;
			btn.y = cfg.y;
			btn._draw();
			return btn;
		};
		btn.disabledProp = false;
		btn.disabled = function(opt) {
			if (typeof opt == 'boolean') {
				btn.disabledProp = opt;
				if (opt) {
					sty = 'disabled';
					btn._draw();
				} else {
					sty = 'common';
					btn._draw();
				}
				return btn;
			} else {
				return btn.disabledProp;
			}
		};
		btn.text = function(txt) {
			if(typeof txt == 'undefined'){
				return cfg.text;
			}else{
				cfg.text = txt;
				return btn._draw();
			}
		}

		/**********************************************************/
		btn.update(options)
			.hover(function() {
				if (!btn.disabledProp) {
					sty = 'hover';
					btn._draw().parentCanvas.cursor('pointer');
				};
			}, function() {
				if (!btn.disabledProp) {
					sty = 'common';
					btn._draw().parentCanvas.cursor('default');
				};
			})
			.mousedown(function() {
				if (!btn.disabledProp) {
					sty = 'active';
					btn._draw();
				};
			})
			.mouseup(function() {
				if (!btn.disabledProp) {
					sty = 'hover';
					btn._draw();
				};
			});

		return btn;
	};
})();