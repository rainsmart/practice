// JavaScript Document
window.onload=function(){
	var oPic=document.getElementById('pic');
	var aLi=oPic.children;
	var arr=[];
	var izIndex=2;
	for(var i=0;i<aLi.length;i++){
		arr.push([aLi[i].offsetLeft,aLi[i].offsetTop]);
	
	}
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].style.position='absolute';
		aLi[i].style.left=arr[i][0]+'px';
		aLi[i].style.top=arr[i][1] +'px';
		aLi[i].style.margin=0;
		
		drag(aLi[i]);
	}
	
	function drag(obj){
		obj.onmousedown=function(ev){
			var ev=ev||window.event;
			var disX=0;
			var disY=0;
			obj.style.zIndex=izIndex++;
			disX=ev.clientX-this.offsetLeft;
			disY=ev.clientY-this.offsetTop;
			
			if (obj.setCapture) {
				obj.setCapture();
			}
			
			document.onmousemove=function(ev){
				var ev=ev||window.event;
				var L=ev.clientX-disX;
				var T=ev.clientY-disY;
				document.title=L+':'+T;

				
				obj.style.left=L+'px';
				obj.style.top=T+'px';
				
				
				
			}
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null;
				if(obj.releaseCapture){
					obj.releaseCapture();
				}
				
				var nLi=nearLi(obj);//返回距离最近的图片元素
				
				var tmp='';
				
				if(nLi){//如果存在最近的元素，交换位置
					startMove(nLi,{left:arr[obj.index][0],top:arr[obj.index][1]});
					startMove(obj,{left:arr[nLi.index][0],top:arr[nLi.index][1]});
					
					tmp=obj.index;//交换索引
					obj.index=nLi.index;
					nLi.index=tmp;
				}else{
					startMove(obj,{left:arr[obj.index][0],top:arr[obj.index][1]});
				
				}
			}
			
			return false;
		}
	}
	
	function pz(obj1,obj2){//碰撞检测
		var L1=obj1.offsetLeft;
		var R1=L1+obj1.clientWidth;
		var T1=obj1.offsetTop;
		var B1=T1+obj1.offsetHeight;
		
		var L2=obj2.offsetLeft;
		var R2=L2+obj2.clientWidth;
		var T2=obj2.offsetTop;
		var B2=T2+obj2.offsetHeight;
		
		if(R1<L2||L1>R2||B1<T2||T1>B2){
			return false;
		}else{
			return true;
		}
	
	}
	function dis(obj1,obj2){//计算碰撞到的图片的距离
		var a=obj1.offsetLeft-obj2.offsetLeft;
		var b=obj1.offsetTop-obj2.offsetTop;
		
		return Math.sqrt(Math.pow(a,2)+Math.pow(b,2));
	}
	
	function nearLi(obj){ //找距离最近的图片
		var value=9999;
		var index=-1;
		for(var i=0;i<aLi.length;i++){
			if(pz(obj,aLi[i])&&aLi[i]!=obj){//检测碰撞到的每一个图片,如果返回真，代表和此张图片碰撞上
				var c=dis(obj,aLi[i]);//找距离
				if(c<value){//找距离最短的
					value=c;
					index=i;
				}
			}
		}
		if(index==-1){
			return false;
		}else{
			return aLi[index];
		}
	}
	
}
	


