/* IMAGE *****************************/

var imageBuffer = {};

lapiz.image = {
	load: function(name, url) {

		imageBuffer[name] = null;

		var img = new Image();

		img.src = url;
		
		utils.on(img,'load error',function(){
			imageBuffer[name] = img; 
		});
	
		return lapiz.image;
	},
	get:function(name){
		return imageBuffer[name];
	}
};

/* end IMAGE *****************************/