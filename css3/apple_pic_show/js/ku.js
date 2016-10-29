// 滚动高度
     function setTop() {
         
          var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
         
          oDiv.style.top = scrollTop + document.documentElement.clientHeight - oDiv.offsetHeight + 'px';
         
     }

// 获取css属性
     function css(obj, attr) {
          if (obj.currentStyle) {
               return obj.currentStyle[attr];
          } else {
               return getComputedStyle(obj, false)[attr];
          }
     }

// 获取到body的top距离
     function getTop(obj) {
          var iTop = 0;
          while(obj) {
               iTop += obj.offsetTop;
               obj = obj.offsetParent;
          }
          return iTop;
     }


// 获取offsetleft 和offsettop
    
     function getPos(obj) {
         
          var pos = {left:0, top:0};
         
          while (obj) {
               pos.left += obj.offsetLeft;
               pos.top += obj.offsetTop;
               obj = obj.offsetParent;
          }
         
          return pos;
         
     }


// 通过class获取元素
     function getByClass(parent,tagName,sClass){
         
          var aEles=(parent||document).getElementsByTagName(tagName);
          var arr=[];
         
          for(var i=0;i<aEles.length;i++){
         
               aClass=aEles[i].className.split(' ');// aEles里面存的是例如li，ul等等节点。
               for(var j=0;j<aClass.length;j++){
              
                    if(aClass[j]==sClass){
                   
                         arr.push(aEles[i]);// 存在数组中的类型是对象；
                         break
                    }
               }
          }
          return arr;
     }

// 设置css

function setCss(obj, css) {
     for(var attr in css){
        obj.style[attr] = css[attr];
    }
}

// 添加和移除class
     function addClass(obj,className){

          if(obj.className==""){
               obj.className=className;
          }else{
               // 如果原来有class
               // 如果要添加的class在原来的class中不存在
               var arrClassName=obj.className.split(' ');
               var _index=arrIndexOf(arrClassName,className);
               if(_index==-1){
                    obj.className+=" "+className;
               }
          }
     }

     function arrIndexOf(arr,v){
          for(var i=0;i<arr.length;i++){
               if(arr[i]==v){
                    return i;
               }
          }
          return -1;
     }

     function removeClass(obj,className){

          if(obj.className!=''){

               var arrClassName=obj.className.split(' ');
               var _index=arrIndexOf(arrClassName,className);

               if(_index!=-1){

                    arrClassName.splice(_index,1);
                    obj.className=arrClassName.join(' ');
               }

          }

     }


// 绑定事件：
     function bind(obj, evname, fn) {
          if (obj.addEventListener) {
               obj.addEventListener(evname, fn, false);
          } else {
               obj.attachEvent('on' + evname, function() {
                    fn.call(obj);
               });
          }
     }

// 取消绑定事件
     function unbind(obj,evname,fn){

          if(obj.removeEventListener){
               obj.removeEventListener(evname,fn,false);
          }else{
               obj.detachEvent('on'+evname,function(){
                    fn.call(obj)
               })
          }
     }
