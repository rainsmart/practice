
	window.onload=function(){
		//产生1~11的随机数,点中后变成qq.png
		//产生0~770的随机数 存掉下来的位置
		var oStar=document.getElementById('star');
		var oRestar=document.getElementById('restar')
		var oBox=document.getElementById('box_box')
		var win=0;
		var lose=0;
		var faceTimer=null;
		var oGet=document.getElementById('get');
		var oLose=document.getElementById('lost');
		var oGamebox=document.getElementById('game_box');
		var tSpeed=1;
		var iGuan=document.getElementById('guan');
		var oScore=iGuan.getElementsByTagName('i')[0];
		var iScore=parseInt(oScore.innerHTML);
		oStar.onclick=startface;

		function startface(){
			clearInterval(faceTimer);
			fallDown();
			faceTimer=setInterval(fallDown,2000);
			this.innerHTML="游戏中..."
			iScore+=1
			oScore.innerHTML=iScore;
				
		}
		function fallDown(){
			var oImg=document.createElement('img');
			var iImgSrc=Math.round(Math.random()*10+1);
			var iImgPos=Math.round(Math.random()*770);

			oImg.src="img_qq/"+iImgSrc+".png"
			oImg.style.left=iImgPos+'px';
			oBox.appendChild(oImg);

			startMove(oImg,{"top":500},tSpeed);

			oGet.innerHTML=win;
			oLose.innerHTML=lose;


			function startMove(obj,json,iSpeed,fn){
				clearInterval(obj.timer);
				var iCur=0;

				obj.timer=setInterval(function(){
					var bBtn=true;
					for(var attr in json){

						var iTarget=json[attr];
						iCur=parseInt(css(obj,attr));
						if(iCur<iTarget){
							document.title=iCur+":"+iTarget+":"+css(obj,attr)
							bBtn=false;
							obj.style[attr]=iCur+iSpeed+"px";
							// alert(1);
							obj.onclick=function(){
								obj.onclick=null;
								clearInterval(obj.timer);
								this.src="img_qq/qq.png";
								var that=this;
								setTimeout(function(){
								oBox.removeChild(that);}
								,300);
								win+=1;
								if(win%5==0){
									tSpeed+=1;
								}
								if(win%5==0&&win!=0){
									setTimeout(function(){
										lose=0;
										win=0;
										oGet.innerHTML=win;
										oLose.innerHTML=lose;
										if(confirm('下一关？')){
											oStar.innerHTML="游戏中...";
											startface();
										}else{
											oStar.innerHTML="开始游戏";
											tSpeed=1;
											iScore=0;
											oScore.innerHTML=iScore;
											clearInterval(faceTimer)
										}

									},300)

								}
								
			
								
							}

						}
					}

					if(bBtn){
						clearInterval(obj.timer);
						oBox.removeChild(obj);
						shake(oGamebox);
						lose+=1;
						fn&&fn.call(obj);

						if(lose==10) {
							clearInterval(obj.timer);
							tSpeed=1;
							setTimeout(function(){
								lose=0;
								win=0;
								oGet.innerHTML=win;
								oLose.innerHTML=lose;
								if(confirm('再来一次~')){
								oStar.innerHTML="游戏中...";
									startface();
									iScore--;
								}else{
									oStar.innerHTML="开始游戏";
									iScore=0;
									oScore.innerHTML=iScore;
									clearInterval(faceTimer)
								}

							},300)	
						}
					}
					
				},30)
				
			}
			
		}
			
		function css(obj, attr) {
			if (obj.currentStyle) {
				return obj.currentStyle[attr];
			} else {
				return getComputedStyle(obj, false)[attr];
			}
		}	

		function shake(obj){
			var aShake=['top','left'];
			var i=0;

			var shakeTimer=setInterval(function(){
				obj.style[aShake[i%2]]=(i++%4<2?0:4)+"px";
				if(i>=12){
					clearInterval(shakeTimer)
				}
			},30)

			
		}
		// 阻止拖拽图片打开

		document.ondragstart=function(){
			return false;
		}
		
	}


	//  问题：当直接让页面内容为空时，之前或者之后的定时器还存在；怎么清除？？
