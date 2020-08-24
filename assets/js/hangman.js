
var answers =["coffee","bottle","plethora","lawyer","pirate","ninja","doctor","finish","bee","sing","shout","juice","message","slick","awards","architect"]

var mysteryWord = document.getElementById("mystery_word");
var message = document.getElementById("result_message");
var counterId = document.getElementById("wrong_counter");
var counterWrong = 0;
var wrongLetters = document.getElementById("wrong_letter");
var randomWord;
var correctAns;
var answerIsSolved = false;
var messageToUser = document.getElementById("message_to_user");
var userChances = 3;

/////////End Screen Variables////////
var winMsg = "Congratulations You Won";
var loseMsg = "You Lose. The Word Was";
var endScreen = document.getElementById('end_screen');
var endMsg = document.getElementById('end_message');
var endImg = document.getElementById('end_message');

//////////////Functions/////////////

var randomNumber = function(x){
   return Math.floor(Math.random() * x);
}

var getRandomWord = function(){
  return answers[randomNumber( (answers.length) )];
}

randomWord = getRandomWord();

var setRandomWord = function(){
  document.getElementById('the-word').innerHTML = getRandomWord();
  correctAns = randomWord;
}

var checkWin = function(){
  var mystryWordDivs = mysteryWord.getElementsByTagName('div');
  var winCounter = 0;
  for(let i=0; i<mystryWordDivs.length; i++){
    if(mystryWordDivs[i].innerHTML!="?"){
      winCounter++;
    }
  }
  if(winCounter == mystryWordDivs.length){
    playSound("win-audio");
    youWin();
  }
}

var createLetterBoxes = function(){
  for (let i = 0; i < randomWord.length; i++) {
    let answerBox = document.createElement("div");
	  answerBox.setAttribute("id","letter_"+i);
	  answerBox.innerHTML = "?";
	  mysteryWord.appendChild(answerBox);
  }
}

var clearAnswer = function(){
  document.getElementById("letter_guess").value ="";
}

function focusCursorOnGuessBox(){
	document.getElementById('letter_guess').focus();
}

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

var checkLetter = function(){
  messageToUser.innerHTML = "";
  var letterGuess = document.getElementById("letter_guess").value;
	let ansIsWrong = true;
  if( letterGuess == ""){
    messageToUser.innerHTML = "Please Enter A Letter";
  } else {
    for (let n = 0; n < randomWord.length; n++) {
  	  if( letterGuess.toLowerCase() == randomWord[n].toLowerCase() ){
  	    document.getElementById("letter_"+n).innerHTML = letterGuess;
  		  ansIsWrong = false;
  	  }
  	};
    if(ansIsWrong == true){
  	  counterWrong++;
      showPanda(counterWrong);
  	  counterId.innerHTML = counterWrong;
      wrongLetters.innerHTML = wrongLetters.innerHTML+" "+letterGuess;
  	  ansIsWrong = false;
        if(counterWrong >= userChances){
          playSound("lose-audio");
          endScreen("Sorry. You Dead!\n The Word Was "+correctAns);
        }
  	}
  }
  clearAnswer();
  checkWin();
  focusCursorOnGuessBox();
}

var playSound = function(audio){
  document.getElementById(audio).play();
}

var stopSound = function(audio){
  document.getElementById(audio).pause();
  document.getElementById(audio).currentTime = 0;
}

var youWin = function(){
  alert("You Win");
}

/*/////////Screens /////////////*/

var startGame = function(screenId){
  let screen = document.getElementById(screenId);
  screen.remove();
  document.getElementById('letter_guess').focus();
  clearAnswer();
  playSound("background-music");
  mysteryWord.innerHTML="";
  setRandomWord();
  createLetterBoxes();
}

var restartGame = function(){
  let screen = document.getElementById("end-screen");
  screen.remove();
  document.getElementById('letter_guess').focus();
  clearAnswer();
  playSound("background-music");
  mysteryWord.innerHTML="";
  counterWrong = 0;
  var pandaId = document.getElementById("panda");
  wrongLetters.innerHTML="";
  getWord();
  createBoxes();
  pandaId.querySelector('.sleeping').style = "display: block";
  pandaId.querySelector('.falling').style = "display: none";
}

var endScreen = function(txt) {
  stopSound("background-music");
  d = document;
  var endScreen = d.createElement("div");
  var endImg = d.createElement("img");
  endScreen.setAttribute("onClick","restartGame()");
  endScreen.id = "end-screen";
  endScreen.style.display = "block";
  endScreen.classList.add("fade-in");
  endScreen.innerHTML = "<div class='top-leaves'></div><div class='bottom-leaves'></div><div class='inner-alert'><div class='end-image'><img src='assets/img/panda-crying.png'></div><div class='end-message'>"+ txt +"</div><div><button onClick='restartGame()'>Play Again</button></div></div>";
  d.getElementsByTagName("body")[0].appendChild(endScreen);
}

var wait  = function(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
