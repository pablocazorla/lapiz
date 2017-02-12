/* CANVAS *****************************/
lapiz.ctx = null;

var canvas = {
	node:null,
	ctx:null,
	width:0,
	height:0,
	select:function(id_or_node){
		if(typeof id_or_node === 'string'){
			var cnv = document.getElementById(id_or_node);
		}else{
			var cnv = id_or_node;
		}
		
		this.node = cnv;
		this.width = cnv.width;
		this.height = cnv.height;
		lapiz.ctx = cnv.getContext('2d');
		return lapiz;
	},
	create:function(width,height,context){
		var cont = context || document.body;
		var cnv = document.createElement('canvas');
		cnv.width = width;
		cnv.height = height;
		cont.appendChild(cnv);

		this.select(cnv);
		return lapiz;
	}
};
lapiz.canvas = canvas;

/* end CANVAS *****************************/