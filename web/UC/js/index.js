// JavaScript Document
window.onload=function(){
	
function getByClass(sClass,parent){
	
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

function removeClass(obj,sClass){
	var aClass=[];
	if(!obj.className){
		return;
	}
	aClass=obj.className.split(' ')
	for(var j=0;j<aClass.length;j++){
		if(aClass[j]==sClass){				
			aClass.splice(j,1)
			obj.className=aClass.join(' ');
			return;
		}
		
	}	
}
function addClass(obj,sClass){
			
	if(!obj.className){
			obj.className=sClass;
			return;
		}
		
		aClass=obj.className.split('');
		for(var j=0;j<aClass.length;j++){
			
			if(aClass[j]==sClass){
			
				return;
			}
		}
		obj.className +=' '+sClass;
}
			
		

function first(parent){
	return parent.firstElementChild||parent.firstChild;
}
function last(parent){
	return parent.lastElementChild||parent.lastChild;
}
function next(obj){
	return obj.nextElementSibling||obj.nextSibling;
}

function prev(obj){
	return obj.previousElementSibling || obj.previousSibling;
}

	/* 轮播图 */
	var oWrap=document.getElementById('bannerWrap');
	var aA=oWrap.getElementsByTagName('a');//按钮
	var oBox=document.getElementById('box');//框
	var oUl=document.getElementById('ul1');
	var aLi=oUl.getElementsByTagName('li');
	var oBigImg=document.getElementById('bigImg');
	var aBigImg=oBigImg.getElementsByTagName('li');
	var iNow=0;//记录框
	var iNow2=0;//记录小图
	var oneWidth=aLi[0].offsetWidth+34;
	var timer=null;

	oUl.innerHTML+=oUl.innerHTML;
	oUl.style.width=aLi.length*oneWidth+'px';
	
	autoPlay();
	
	oWrap.onmouseover=function(){
		clearInterval(timer);	
	}
	
	oWrap.onmouseout=autoPlay;
	
	aA[0].onclick=moveLeft;
	
	aA[1].onclick=moveRight;
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			
			startMove(oBox,{ left:(this.index - iNow2)*oneWidth + 15});
			
			iNow=this.index -iNow2;
			
			toChange();
			
		};
	}
	function moveLeft(){
		if(iNow==0){//框在最左边
			if(iNow2==0){//小图也在最左边
				iNow2=aLi.length/2;
				oUl.style.left=-oUl.offsetWidth/2+'px';
			}
			iNow2--;
			startMove(oUl,{left:-iNow2*oneWidth});
		}else{
			iNow--;
			startMove(oBox,{left:iNow*oneWidth+15});		
		}
		toChange();
	}
	
	function moveRight(){
		if(iNow==4){//框在最右边
			if(iNow2==aLi.length/2){ 
				iNow2=0;
				oUl.style.left=0+'px';
			}
			iNow2++;
			startMove(oUl,{left:-iNow2*oneWidth});
		}else{
			iNow++;
			startMove(oBox,{left:iNow*oneWidth+15});		
		}
	
		toChange();
	}
	
	function toChange(){
		for(var i=0;i<aBigImg.length;i++){
			startMove( aBigImg[i] , { opacity : 0 } );
			aBigImg[i].style.display='none';
		}
		aBigImg[(iNow + iNow2)%7].style.display='block';
		startMove( aBigImg[(iNow + iNow2)%7] , { opacity : 100 } );
		
	}
	
	function autoPlay(){
		clearInterval(timer);
		timer=setInterval(moveRight,2500)
	}
	/* end 轮播图 */	
	
	/* menu */
	
	var oMenu=document.getElementById('menu');
	var aMenuLi=oMenu.getElementsByTagName('li');
	for(var i=0;i<aMenuLi.length;i++)
	{
		aMenuLi[i].onmouseover=function()
		{
			addClass(this,'active');
		}

		aMenuLi[i].onmouseout=function()
		{
			removeClass(this,'active');
		}
	}
	/* end menu */
	
	/* 下滑按钮 */
	
	var oBtnBox=document.getElementById('h_content_footer');
	var oBtn=getByClass('h_p3',oBtnBox)[0];
	var oWordBox=document.getElementById('h_box');
	var oP=getByClass('h_p2',oWordBox)[0];
	var oIcon=getByClass('h_p3',oWordBox)[0];
	var oOver=false;
	//alert(oBtn);
	//alert(oP2);
	
	oBtn.onmouseover=function(){
		if(!oOver){
			
			startMove(oP,{height: 0},function(){
				oIcon.style.backgroundPosition='-17px 0';	
			});
		
		}else{
			startMove(oP,{height: 22},function(){
				
				oIcon.style.backgroundPosition='0 0';
			});
		
		}
		oOver=!oOver;
	}
	
	/* end 下滑按钮*/
	
	/* 网站导航*/
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