var buttonIDs = ["AC", "CE", "div", "mul", "7", "8", "9", "sub", "4", "5", "6", "add", "1", "2", "3", "mod", "0", "decimal", "equal"];
var buttonSymbols = ["AC", "CE", "÷", "×", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "%", "0", ".", "="];

$(document).ready(function(){
  for(var i = 0; i < buttonIDs.length; i++){
      if(i >= 0 && i <= 15){
          var injection;
          if(i === 0 || i === 1 || i === 2 || i === 3){
            injection = "#injection1";
          }
          else if(i === 4 || i === 5 || i === 6 || i === 7){
            injection = "#injection2";
          }
          else if(i === 8 || i === 9 || i === 10 || i === 11){
            injection = "#injection3";
          }
          else{
            injection = "#injection4";
          }
          $(injection).append("<div class='col-md-3'><button id = " + buttonIDs[i] +  " class = 'btn'>" + buttonSymbols[i] + "</button></div>");
      }
      else{
          if(i === 16){
            $("#injection5").append("<div class='col-md-6'><button id = '0' class = 'btn zero'>0</button></div>");
          }
          else{
            $("#injection5").append("<div class='col-md-3'><button id = " + buttonIDs[i] +  " class = 'btn'>" + buttonSymbols[i] + "</button></div>");
          }
      }
  }
});