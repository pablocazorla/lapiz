;
(function() {
	lapiz.button = function(options) {

		var cfg = {
				text: 'Button',
				x: 0,
				y: 0,
				style: {
					common: {
						'paddingTop': 8,
						'paddingBottom': 8,
						'paddingLeft': 15,
						'paddingRight': 15,
						'backgroundColor': '#02F',
						'borderColor': '#F00',
						'borderWidth': 2,
						'color': '#999',
						'fontFamily': 'sans-serif',
						'fontSize': 16
					},
					hover: {
						'backgroundColor': '#0DF',
						'borderColor': '#00F'
					},
					active: {
						'backgroundColor': '#022',
						'borderColor': '#00F'
					},
					disabled: {
						'backgroundColor': '#888',
						'borderColor': '#00F',
						'textColor': '#AAA'
					}
				}
			},
			enabledBtn = true,

			btn = lapiz.sprite();

		/**********************************************************/
		btn._draw = function(sty) {
			var prop = lapiz.extendObject(cfg.style.common, cfg.style[sty]);
			var metr = lapiz
				.setStyles({
					'font': prop.fontSize + 'px ' + prop.fontFamily
				}).measureText(cfg.text),
				w = metr.width + prop.paddingLeft + prop.paddingRight,
				h = prop.fontSize + prop.paddingTop + prop.paddingBottom;

			btn.shape(function() {
				//background
				lapiz
					.setStyles({
						'fillStyle': prop.backgroundColor,
						'strokeStyle': prop.borderColor,
						'lineWidth': prop.borderWidth,
						'font': prop.fontSize + 'px ' + prop.fontFamily,
						'textBaseline': 'middle',
						'textAlign': 'center'
					})
					.beginPath()
					.moveTo(0, 0)
					.lineTo(w, 0)
					.lineTo(w, h)
					.lineTo(0, h)
					.lineTo(0, 0)
					.closePath()
					.endShape()
					.fillStyle(prop.color)
					.fillText(cfg.text, w / 2, h / 2);

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