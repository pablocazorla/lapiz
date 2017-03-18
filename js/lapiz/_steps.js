/* STEPS *****************************/

var onAllLoaded = function(handler) {
	var timerWaitToLoad = setInterval(function() {
		var allImagesLoaded = true;
		for (var a in imageBuffer) {
			if (imageBuffer[a] === null) {
				allImagesLoaded = false;
			}
		}
		if (allImagesLoaded) {
			handler();
			clearInterval(timerWaitToLoad);
		}
	}, 60);
};

var waitPreload = false;

lapiz.preload = function(callback) {
	waitPreload = true;
	callback.apply(lapiz, []);
	return lapiz;
};

var waitSetup = false;

lapiz.setup = function(callback) {
	waitSetup = true;
	if (waitPreload) {
		onAllLoaded(function() {
			waitPreload = false;
			callback.apply(lapiz, []);
			waitSetup = false;
		});
	} else {
		callback.apply(lapiz, []);
		waitSetup = false;
	}
	return lapiz;
};

window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function(f) {
	return setTimeout(f, 1000 / 60)
}

lapiz.render = function(callback) {

	var frameFunction = function() {
		callback.apply(lapiz, []);
		requestAnimationFrame(frameFunction);
	};

	if (waitPreload && !waitSetup) {
		onAllLoaded(function() {
			waitPreload = false;
		});
	}

	var timerWaitToRender = setInterval(function() {
		if (!waitPreload && !waitSetup) {
			frameFunction();
			clearInterval(timerWaitToRender);
		}
	}, 60);

	return lapiz;
}

/* end STEPS *****************************/