// JavaScript Document
	function bindEvent(obj,events,fn)
	{
		if(obj.addEventListener){
		   obj.addEventListener(events,fn,false);
		}
		else{
		   obj.attachEvent('on'+events,fn);
		}
	}
	bindEvent(window,'load',function(){
		/*首页gif图*/
		var oBanner=document.getElementById('i_banner_btn');
		var oBannerLeft=oBanner.getElementsByTagName('img')[0];
		var oBannerRight=oBanner.getElementsByTagName('img')[1];
		var oPLeft=oBanner.getElementsByTagName('p')[0];
		var oPRight=oBanner.getElementsByTagName('p')[1];
	
		oBannerLeft.onmouseover=function(){
			this.src="images/left_btn_h.gif";
			oPLeft.style.backgroundPosition='0 -110px'
		}
		oBannerLeft.onmouseout=function(){
			this.src="images/left_btn.jpg";
			oPLeft.style.backgroundPosition='0 0'
	
		}
		
		oBannerRight.onmouseover=function(){
			this.src="images/right_btn_h.gif";
			oPRight.style.backgroundPosition='0 -330px'
	
		}
		oBannerRight.onmouseout=function(){
			this.src="images/right_btn.jpg";
			oPRight.style.backgroundPosition='0 -220px'
	
		}
		
		/*end 首页gif图*/
			
	})

	
	

