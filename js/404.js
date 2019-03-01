var lang=navigator.language;
var win1Text='<p>Congratulations, you\'ve saved 404 Lemmings!<br/>You can be proud of yourself soldier.<br/><a href="/" style="color:white;">Back to site</a></p><br/>';
var win2_1Text='<p>Thank you in advance for the <b style="font-size:35px;">';
var win2_2Text='</b> Lyou saved Lemmings.<br/>But in order to avoid the massacre in the future, do not put your feet on this page ;)<br/><a href="/" style="color:white;">Back to site</a></p><br/>';
var win3Text='<p>The sacrifice took place before your eyes and you are left with nothing to do.<br/>Respect of all the victims, thank you to leave this page.<br/><a href="/" style="color:white;">Back to site</a></p>';
var errorText='<p>This page is no longer of this world.<br/>Stay on this last result in the sacrifice of  <b style="font-size:20px;">404</b> Lemmings.<br/>Unless you decide to save them all!<br/><span style="font-size:12px;font-style:italic;">Hover over them to bring a parachute.</span></p>';
var backText='<p><a href="/">Return to site<br/><span>(And let them die poor lemmings)</span></a></p>';
var sound=true;
function noselection(target){
  if(typeof target.onselectstart!="undefined"){
    target.onselectstart=function(){
      return false;
    };
  }else if(typeof target.style.MozUserSelect!="undefined"){
    target.style.MozUserSelect="none";
  }else{
    target.onmousedown=function(){
      return false;
    };
  }
}
function formatNumber(n,l){
  len=n.toString().length;
  newN=n;
  for(i=0;i<l-len;i++){
    newN='0'+newN;
  }
  return newN;
}
$(document).ready(function() {
  $('#sound').click(function(){
    if(sound){
      sound=false;
      $('#sound').removeClass('on');
      $('#sound').addClass('off');
      document.getElementById('audiotag3').pause();
    }else{
      sound=true;
      $('#sound').removeClass('off');
      $('#sound').addClass('on');
      document.getElementById('audiotag3').play();
    }
  });
  switch(lang){
    case 'fr' :
      win1Text='<p>Félicitations, vous avez sauvé les 404 Lemmings !<br/>Vous pouvez être fier de vous soldat.<br/><a href="/" style="color:white;">Retour au site</a></p><br/>';
      win2_1Text='<p>Merci d\'avance pour les <b style="font-size:35px;">';
      win2_2Text='</b> Lemmings que vous avez sauvés.<br/>Mais dans le but d\'éviter ce massacre à l\'avenir, ne remettez pas les pieds sur cette page ;)<br/><a href="/" style="color:white;">Retour au site</a></p><br/>';
      win3Text='<p>Le sacrifice a eu lieu devant vos yeux et vous êtes resté sans rien faire.<br/>Par respect de toutes ces victimes, merci de quitter cette page.<br/><a href="/" style="color:white;">Retour au site</a></p>';
      errorText='<p>Cette page n\'est plus de ce monde.<br/>Rester sur cette dernière entraînera le sacrifice de <b style="font-size:20px;">404</b> Lemmings.<br/>A moins que vous décidiez de tous les sauver !<br/><span style="font-size:12px;font-style:italic;">Survolez ces derniers pour les munir d\'un parachute.</span></p>';
      backText='<p><a href="/">Retourner au site<br/><span>(Et laisser ces pauvres lemmings mourir)</span></a></p>';
    break;
    case 'de' :
      win1Text='<p>Herzlichen Glückwunsch, Sie 404 Lemmings gespeichert haben!<br/>Sie können stolz auf sich selbst, Soldat zu sein.<br/><a href="/" style="color:white;">Zurück zur Website</a></p><br/>';
      win2_1Text='<p>Vielen Dank im Voraus für <b style="font-size:35px;">';
      win2_2Text='</b> Lemmings Sie gespeichert.<br/>Aber um das Massaker in der Zukunft zu vermeiden, nicht zu Fuß auf dieser Seite eingestellt ;)<br/><a href="/" style="color:white;">Zurück zur Website</a></p><br/>';
      win3Text='<p>as Opfer fand vor Ihren Augen und Sie ohne etwas zu tun bleibt.<br/>Aus Respekt für alle Opfer, ich danke Ihnen diese Seite verlassen.<br/><a href="/" style="color:white;">Zurück zur Website</a></p>';
      errorText='<p>Diese Seite ist nicht von dieser Welt.<br/>Bleiben Sie auf diesem letzten Ergebnis in der <b style="font-size:20px;">404</b> Opfer des Lemmings.<br/>Es sei denn, Sie entscheiden, sie alle zu retten!<br/><span style="font-size:12px;font-style:italic;">Survolez ces derniers pour les munir d\'un parachute.</span></p>';
      backText='<p><a href="/">Zurück zur Website<br/><span>(Und lassen Sie diese armen Lemminge sterben)</span></a></p>';
    break;
  }
  $('#error').html(errorText);
  $('#back').html(backText);
  bottom=$(window).height();
  width=$(window).width();
  speed=0.1;
  time=bottom/speed;
  count=0;
  deadCount=0;
  winCount=0;
  paraCount=404;
  tabLemmings=[];
  var lemming = setInterval(function(){
    if(count<paraCount){
      count=count+1;
      var lem=new Lemmings($('body'),time,bottom,Math.round(Math.random()*(width-200)),count,width);
      tabLemmings.push(lem);
      lem.go();
    }
    if($('img').length===0){
      $('#back').hide();
      $('#deadCount').hide();
      $('#sound').hide();
      $('#paraCount').hide();
      if(winCount==paraCount){
        $('#error').html(win1Text);
      }else if(winCount>0){
        $('#error').html(win2_1Text+winCount+win2_2Text);
      }else if(winCount===0){
        $('#error').html(win3Text);
      }
      clearInterval(lemming);
      clearInterval(verif);
    }
  },150);
  var verif = setInterval(function(){
    for(var i=0;i<tabLemmings.length;i++){
      lem=tabLemmings[i];
      if(lem.etat=='mort'){
        if(sound){
          document.getElementById('audiotag2').play();
        }
        deadCount++;
        tabLemmings[i].etat='ok';
      }
      if(lem.etat=='win'){
        if(sound){
          document.getElementById('audiotag1').play();
        }
        winCount++;
        tabLemmings[i].etat='ok';
      }
      if(lem.etat=='paraOpen'){
        paraCount--;
        tabLemmings[i].etat='ok';
      }
      $('#paraCount span').text(formatNumber(paraCount,3));
      $('#deadCount span').text(formatNumber(deadCount,3));
    }
  },149);
});