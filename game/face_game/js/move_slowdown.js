function startMove(obj,json,fn){
	clearInterval(obj.timer);
	var iCur=0;
	var iSpeed=0;
	obj.timer=setInterval(function(){

		var bBtn=true;

		for(var attr in json){

			var iTarget=json[attr];

			if(attr == "opacity"){
				iCur=Math.round(css(obj,"opacity")*100)
			}else{
				iCur=parseInt(css(obj,attr))
			}

			iSpeed=(iTarget-iCur)/8
			iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed)
			
			if(iCur!=iTarget){
				bBtn=false;
				if(attr == "opacity"){
					obj.style.opacity=(iCur+iSpeed)/100;
					obj.style.filter="alpha(opacity="+(iCur+iSpeed)+")";
				}else{
					obj.style[attr]=iCur+iSpeed+'px';
				}
				
			}
			
			
		}


		if(bBtn){
			
			clearInterval(obj.timer);
			fn&&fn.call(obj);
		}	
		
	},30)
}

function css(obj, attr) {
	if (obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}