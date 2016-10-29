function myPic(){
	this.init.apply(this,arguments)
}
myPic.prototype = {
	init : function(id,picNum){

		var that = this;
		that.picNum = picNum;
		that.wrap = document.getElementById(id);
		that.aBigImg = document.getElementById('bigImg').getElementsByTagName('li');
		that.sImgWrap = document.getElementById('ul1');
		that.aSmallImg = that.sImgWrap.getElementsByTagName('li');
		that.box = document.getElementById('box');
		that.iBoxNow = 0;
		that.iSimgNow = 0;
		that.iSimgWidth = that.aSmallImg[0].offsetWidth + 34;
		that.nextBtn = document.getElementById('next');
		that.prevBtn = document.getElementById('prev');
		that.play();
	},
	play : function(){
		var that = this;
		that.sImgWrap.innerHTML += that.sImgWrap.innerHTML;
		that.sImgWrap.style.width = that.aSmallImg.length * that.iSimgWidth +'px';
		that.autoPlay();
		that.wrap.onmouseover = function(){
			clearInterval(that.timer);
		}
		that.wrap.onmouseout = function(){
			that.autoPlay();
		}
		that.nextBtn.onclick = function(){
			that.doNext();
			that.bigPicChange()
		}
		that.prevBtn.onclick = function(){
			that.doPrev();
			that.bigPicChange()
		}
		for(var i=0;i<that.aSmallImg.length;i++){
			that.aSmallImg[i].index = i;
			that.aSmallImg[i].onclick = function(){
				var index = this.index
				that.doClick(index);
			}
		}
	},
	bigPicChange : function(){
		var that = this;
		for(var i = 0;i<that.aBigImg.length;i++){
			that.startMove(that.aBigImg[i],{'opacity':0})
			that.aBigImg[i].style.display = 'none';
		}
		that.aBigImg[(that.iBoxNow + that.iSimgNow)%that.picNum].style.display = 'block';
		that.startMove(that.aBigImg[(that.iBoxNow + that.iSimgNow)%that.picNum],{'opacity':100})

	},
	doPrev : function(){
		var that = this;
		if(that.iBoxNow == 0){
			if(that.iSimgNow == 0){
				that.iSimgNow = that.picNum;
				that.sImgWrap.style.left = -that.iSimgNow * that.iSimgWidth+'px';
			}
			that.iSimgNow--;
			that.startMove(that.sImgWrap,{'left':-that.iSimgNow * that.iSimgWidth})
		}else{
			that.iBoxNow --;
			that.startMove(that.box,{'left':-that.iBoxNow * that.iSimgWidth + 15})
		}
	},
	doNext : function(){
		var that = this;
		if(that.iBoxNow == 4){
			if(that.iSimgNow == that.picNum){
				that.sImgWrap.style.left = 0 + 'px';
				that.iSimgNow = 0;
			}
			that.iSimgNow++;
			that.startMove(that.sImgWrap,{'left':-that.iSimgNow * that.iSimgWidth})
		}else{
			that.iBoxNow ++;
			that.startMove(that.box,{'left':that.iBoxNow * that.iSimgWidth + 15})
		}
		
	},
	doClick : function(i){
		var that = this;
		that.iBoxNow = i%that.picNum;
		that.startMove(that.box,{'left':that.iBoxNow * that.iSimgWidth + 15})
		that.bigPicChange();
	},
	autoPlay : function(){
		var that = this;
		clearInterval(that.timer);
		that.timer = setInterval(function(){
			that.doNext();
		},1800)
	},
	startMove : function(obj,json,callback){
		var that = this;

		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var bBtn = true;

			for(var attr in json){
				var iCur = 0;
				var iSpeed = 0;

				if(attr == 'opacity'){
					iCur = parseFloat(that.getStyle(obj,attr)).toFixed(2)*100;
				}else{
					iCur = parseInt(that.getStyle(obj,attr))
				}

				iSpeed = ( json[attr] - iCur )/8;
				iSpeed = iSpeed >0 ? Math.ceil(iSpeed):Math.floor(iSpeed);

				if(iCur == json[attr]){
					bBtn = false;
				}
		
				if(bBtn){
					if(attr == 'opacity'){
						obj.style.opacity = (iCur + iSpeed)/100;
					}else{
						obj.style[attr] = iCur + iSpeed + 'px';
					}
				}else{
					clearInterval(obj.timer)
					if(callback){
						callback.call(obj)
					}
				}
			}
		},30)
	},
	getStyle : function(obj,attr){
		if(obj.currenStyle){
			return obj.currenStyle[attr];
		}else{
			return getComputedStyle(obj,false)[attr];
		}
	},
	getByClass : function(sClass,parent){
	
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
	},
	removeClass : function(obj,sClass){
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
	},
	addClass : function(obj,sClass){
			
		if(!obj.className){
			obj.className=sClass;
			return;
		}
			
		aClass=obj.className.split(' ');
		//检查该元素上是否有这个类
		for(var j=0;j<aClass.length;j++){
			if(aClass[j]==sClass){
				return;
			}
		}
		obj.className +=' '+sClass;
	},
	first : function(parent){
		return parent.firstElementChild||parent.firstChild;
	},
	last : function(parent){
		return parent.lastElementChild||parent.lastChild;
	},
	next : function(obj){
		return obj.nextElementSibling||obj.nextSibling;
	},
	prev : function(obj){
		return obj.previousElementSibling || obj.previousSibling;
	}

}