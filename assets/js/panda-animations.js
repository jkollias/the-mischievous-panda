 
var showPanda = function(){
  var pandaId = document.getElementById("panda");
  i = counterWrong;
  if(i==0){
    pandaId.querySelector('.sleeping').style = "display: block";
    pandaId.querySelector('.falling').style = "display: none";
  }else if(i==1){
    playSound("panada-yell");
    pandaId.querySelector('.sleeping').style = "display: none";
    pandaId.querySelector('.hanging').style = "display: block";
  }else if(i==2){
    playSound("panada-yell");
    pandaId.querySelector('.hanging').style = "display: none";
    pandaId.querySelector('.hanging2').style = "display: block";
  }else if(i==3){
    playSound("panada-yell");
    pandaId.querySelector('.hanging2').style = "display: none";
    pandaId.querySelector('.falling').style = "display: block";
  }
}