window.onload = function(){
	var lunbo = new myPic('bannerWrap',7)

	/* 网站导航*/
	var	getByClass = function(sClass,parent){
	
		var aEles=(parent||document).getElementsByTagName('*');
		var arr=[];
		
		for(var i=0;i<aEles.length;i++){
		
			aClass=aEles[i].className.split(' ');// aEles里面存的是例如li，ul等等节点。
			for(var j=0;j<aClass.length;j++){
			
				if(aClass[j]==sClass){
				
					arr.push(aEles[i]);// 存在数组中的类型是对象；
				}
			}
		}
		return arr;
	}
	var oFooter=document.getElementById('footer');
	var oMap=getByClass('copyRight1',oFooter)[0];
	var oMapWrap=getByClass('mapWrap',oFooter)[0];
	var oClick=false;

	oMap.onclick=function(){
		if(!oClick){
			startMove(oMapWrap,{height:0});
		}else{
			startMove(oMapWrap,{height:200});
		
		}
		oClick=!oClick;
	}

	
	
	/* end网站导航*/

	
}