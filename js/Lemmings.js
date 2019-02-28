function Lemmings(div,time,bottom,left,count,width){
  var oThis=this;
  this.etat='tombe';
  this.div=div;
  this.bottom=bottom;
  this.left=left;
  this.time=time;
  this.img=null;
  this.count = count;
  this.width=width;
  this.go=function(){
    div.append('<img src="images/tombe.gif?i='+this.count+'" alt="lemming tombant" class="last" style="position:absolute;bottom:'+this.bottom+'px;left:'+left+'px;"/>');
    this.img=eval($('.last'));
    this.img.removeClass('last');
    this.img.animate({'bottom':'105'},this.time,'linear');
    this.img.hover(function(){
      if(oThis.etat=='tombe'){
        oThis.etat='paraOpen';
        oThis.paraOpen();
      }
    });
    setTimeout(function(){
      if(oThis.etat=='tombe'){
        oThis.etat='mort';
        oThis.mort();
      }
    },this.time);
  },
  this.mort=function(){
    this.img.attr('src','images/ecrase.gif?i='+this.count);
    setTimeout(function(){
      oThis.img.remove();
    },1500);
  },
  this.paraOpen=function(){
    this.img.attr('src','images/paraOpen.gif?i='+this.count);
    setTimeout(function(){
      oThis.img.attr('src','images/paraTombe.gif?i='+oThis.count+'');
    },600);
    vitesseOld = this.bottom/this.time;
    vitesseNew = vitesseOld*0.5;
    bottomY = parseInt(this.img.css('bottom').replace("px",""),10);
    newTime = (bottomY)/vitesseNew;
    this.img.stop().animate({'bottom':'105'},newTime,'linear');
    setTimeout(function(){
      oThis.marche();
    },newTime);
  },
  this.marche=function(){
    this.etat='marche';
    this.img.attr('src','images/marche.gif?i='+this.count);
    newTime=(this.width-this.left)/0.05;
    this.img.animate({'left':this.width-100},newTime,'linear');
    setTimeout(function(){
      oThis.win();
    },newTime);
  },
  this.win=function(){
    this.etat='win';
    this.img.remove();
  }
}