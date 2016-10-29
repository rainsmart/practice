// JavaScript Document
	/* 网站地图 */
window.onload=function(){
	
	var oMapNav=document.getElementById('map_nav');
	var oMap=document.getElementById('map');
	var oShow=false;
	oMapNav.onclick=function(){
		if(!oShow){
			oMap.style.display='block';
		}else{
			oMap.style.display='none';
		}
		oShow=!oShow;
	
	}
	
	

	/* end网站地图 *
	
	/* 在线咨询*/
	
	var oCon=document.getElementById('onlineCon');
	var oMask = document.getElementById('mask');
	var oChatBox = document.getElementById('chatBox');
	var oDel=document.getElementById('del');
	
	oCon.style.top=viewH()/2+'px';
	
	oCon.onclick=function(){
		oMask.style.display='block';
		oChatBox.style.display='block';
		boxSite();
		window.onresize=window.onscroll=boxSite;
			
		oCon.style.top=viewH/2+'px';
		oDel.onclick=function(){
			oMask.style.display='none';
			oChatBox.style.display='none';
		}
	};
	
	function boxSite(){
		var iH=Math.max(viewH(),scrollH());
		var iLeft = Math.ceil((viewW()-oChatBox.offsetWidth)/2);
		var iTop = Math.ceil((viewH()-oChatBox.offsetHeight)/2 + scrollY());
		move(oChatBox,{left:iLeft,top:iTop});
		oMask.style.height=iH+'px';
	};
		
	function viewW(){
		return document.documentElement.clientWidth;	
	}
	
	function viewH(){
		return document.documentElement.clientHeight;
	}
	
	function scrollX(){
	
		return 	document.body.scrollLeft || document.documentElement.scrollLeft;
		
	}
	
	function scrollY(){
	
		return 	document.body.scrollTop || document.documentElement.scrollTop;
	
	}
	
	function scrollH(){
		return document.body.scrollHeight;	
	}
	
	/* end在线咨询*/
	/* 返回顶部按钮 */
	
	var oGoTop=document.getElementById('goTop');
	var timer=null;
	
	oGoTop.onclick=function(){
		startMove(0);
	}
	window.onscroll=function(){
		showBtn();
	}
	function showBtn(){
		if(scrollY()>=50){
			oGoTop.style.display='block';
		}else{
			oGoTop.style.display='none';
		}
	}
	function startMove(iTarget){
		clearInterval(timer);
		timer=setInterval(function(){
			var iSpeed=(iTarget-scrollY())/8;
			iSpeed=Math.floor(iSpeed);
			if(iTarget==scrollY()){
				clearInterval(timer);
			}else{
				document.body.scrollTop=document.documentElement.scrollTop=scrollY()+iSpeed;
				showBtn();
			}
			
		},30)
		
	
	}
	
	/* end 返回顶部按钮 */
}
	