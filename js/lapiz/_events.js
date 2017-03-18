/* EVENTS *****************************/

utils.on = function(eventTarget, eventType, eventHandler){
	var arrayEvents = eventType.split(' ');
	for(var i = 0; i<arrayEvents.length;i++){
		eventTarget.addEventListener(arrayEvents[i], eventHandler,false);
	}	
};

// window events
lapiz.onResize = function(eventHandler){
	utils.on(window,'resize',eventHandler);
	return lapiz;
}
lapiz.onResize(utils.updateWindow);

