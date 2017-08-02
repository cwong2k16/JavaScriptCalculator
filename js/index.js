// an array of IDs associated with the calculator buttons
var buttonIDs = ["AC", "CE", "div", "mul", "7", "8", "9", "sub", "4", "5", "6", "add", "1", "2", "3", "mod", "0", "decimal", "equal"];
// an array of symbols associated with the calculator buttons
var buttonSymbols = ["AC", "CE", "÷", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "%", "0", ".", "="];

var array = []; // array of operations

$(document).ready(function(){
    
    // begin loop to generate html buttons and their IDs/properties onto the calculator UI
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
  } // end of generation
    
    // eventhandling stuff
    $("button").click(function(){
        if(this.id === "AC"){
            clearResult();
            clearArray();
            $("#display").val("0");
        }
        else if(this.id === "CE"){
            clearResult();
        }
        else if(this.id === "equal"){
            var string = "";
            for(var i = 0; i < array.length; i++){
                string+= array[i];
            }
            alert(eval(string));
        }
        else{
            var id = this.id;
            var index = buttonIDs.indexOf(id);
            var symbol = buttonSymbols[index];
            array.push(symbol);
            var val = $("#display").val();
            $("#display").val(val + symbol);
            $("#result").val(symbol);
        }
    });
});

//functions useful for clean code/modular design
function getOperate(token){
    if(token === "div"){
        return "/";
    }
    else if(token === "mul"){
        return "*";
    }
    else if(token === "sub"){
        return "-";
    }
    else if(token === "add"){
        return "+";
    }
    else if(operator === "mod"){
        return "%";
    }
}

function clearResult(){
    $("#result").val("0");
}

function clearArray(){
    array = [];
}