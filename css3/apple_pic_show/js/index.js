window.onload=function(){

	var oBox=document.getElementById('box');

	var oImgList=document.getElementById('imgList');
	var aLi=oImgList.getElementsByTagName('li');
	var aImg=oImgList.getElementsByTagName("img");
	var iInterval=100;
	var iLeft=-iInterval;
	var iWidth=300;
	var iMid=Math.floor(aLi.length/2);

	var iHeight=0;
	var iListLeft=0;
	var zIndex=5;


	for(var i=0;i<aLi.length;i++){

		iLeft+=iInterval;

		if(i<iMid){

			setCss(aLi[i],{'left':iLeft+'px','width':iWidth+'px','-webkit-transform':'rotateY(45deg) translateZ(-100px)'});

		}else if(i>iMid){

			setCss(aLi[i],{'left':iLeft+'px','width':iWidth+'px','-webkit-transform':'rotateY(-45deg) translateZ(-100px)','z-index':zIndex});

			zIndex--;

		}else{

			iLeft+=iInterval;

			setCss(aLi[i],{'left':iLeft+'px','width':iWidth+'px','-webkit-transform':'translateZ(200px)','z-index':6});
			iListLeft=document.documentElement.clientWidth/2-aImg[i].clientWidth/2-iLeft;
			iLeft+=iInterval;

			iStarNow=i; // 记录中间的

		}

		iHeight=Math.max(iHeight,aImg[i].offsetHeight);

		aLi[i].index=i;
		aLi[i].onclick=function(){
            
			var iLeft=-(this.index-iStarNow)*iInterval
			fnTab(aImg,iInterval,iLeft,this.index)
		}

		
	}


	setCss(oImgList,{'height':iHeight+'px','top':(document.documentElement.clientHeight-iHeight)/2+"px",'left':iListLeft+"px"});


	function fnTab(aImg,iInterval,iLeft,iNow){
			var zIndex=5;

			iLeft-=iInterval;
			for(var i=0;i<aImg.length;i++){

				iLeft+=iInterval;

				if(i<iNow){
					setCss(aLi[i],{'left':iLeft+'px','-webkit-transform':'rotateY(45deg) translateZ(-100px)'});


				}else if(i>iNow){

					setCss(aLi[i],{'left':iLeft+'px','-webkit-transform':'rotateY(-45deg) translateZ(-100px)','z-index':zIndex});

					zIndex--;

				}else{

					iLeft+=iInterval;

					setCss(aLi[i],{'left':iLeft+'px','-webkit-transform':'translateZ(200px)','z-index':6});

					iLeft+=iInterval;


				}


			}
			
		}




}

	