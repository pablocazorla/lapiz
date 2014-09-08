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
						'fillStyle': '#02F',
						'strokeStyle': '#F00',
						'lineWidth': 4,
						'color': '#999',
						'font': '16px sans-serif',
						'textBaseline': 'middle',
						'textAlign': 'center',
						'borderRadius': '10px'
					},
					hover: {
						'fillStyle': '#0DF',
						'strokeStyle': '#00F'
					},
					active: {
						'fillStyle': '#022',
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

			btn = lapiz.sprite();

		/**********************************************************/
		btn._draw = function(sty) {
			var prop = lapiz.extendObject(cfg.style.common, cfg.style[sty]),
				padding = lapiz.stringNumberToArray(prop.padding),
				br = lapiz.stringNumberToArray(prop.borderRadius),
				metr = lapiz
				.setStyles({
					'font': prop.font
				}).measureText(cfg.text);
			prop.width = metr.width + padding[3] + padding[1],
			prop.height = parseInt(prop.font) + padding[0] + padding[2];

			btn.shape(function() {
				//background
				/*lapiz
					.setStyles(prop)
					.beginPath()
					.moveTo(0, 0)
					.lineTo(w, 0)
					.lineTo(w, h)
					.lineTo(0, h)
					.lineTo(0, 0)
					.closePath()
					.endShape();
					*/

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
			btn._draw('common');
			return btn;
		};
		btn.disabledProp = false;
		btn.disabled = function(opt) {
			if (typeof opt == 'boolean') {
				btn.disabledProp = opt;
				if (opt) {
					btn._draw('disabled');
				} else {
					btn._draw('common');
				}
				return btn;
			} else {
				return btn.disabledProp;
			}
		};

		/**********************************************************/
		btn.update(options)
			.hover(function() {
				if (!btn.disabledProp) {
					btn._draw('hover').parentCanvas.cursor('pointer');
				};
			}, function() {
				if (!btn.disabledProp) {
					btn._draw('common').parentCanvas.cursor('default');
				};
			})
			.mousedown(function() {
				if (!btn.disabledProp) {
					btn._draw('active');
				};
			})
			.mouseup(function() {
				if (!btn.disabledProp) {
					btn._draw('hover');
				};
			});

		return btn;
	};
})();