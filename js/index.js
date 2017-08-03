// an array of IDs associated with the calculator buttons
var buttonIDs = ["AC", "CE", "div", "mul", "7", "8", "9", "sub", "4", "5", "6", "add", "1", "2", "3", "mod", "0", "decimal", "equal"];
// an array of symbols associated with the calculator buttons
var buttonSymbols = ["AC", "CE", "/", "*", "7", "8", "9", "-", "4", "5", "6", "+", "1", "2", "3", "%", "0", ".", "="];

// array of operators for convenient referencing
var operators = ["add", "div", "mod", "mul", "sub"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

var array = []; // array of operations as symbols
var array2 = [] // array of operations as IDs

var currToken = ""; // useful for decimal edge-casing

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
        var id = this.id;
        var index = buttonIDs.indexOf(id);
        var symbol = buttonSymbols[index];
        if(this.id === "AC"){
            clearResult();
            clearArray();
            $("#display").val("0");
            currToken = "";
        }
        else if(this.id === "CE"){
            clearResult();
            array.pop();
            array2.pop();
            var newString = "";
            for(var i = 0; i < array.length; i++){
                newString += array[i];
            }
            $("#display").val(newString);
            currToken = "";
        }
        else if(this.id === "equal"){
            currToken = "";
            var string = "";
            for(var i = 0; i < array.length; i++){
                string+= array[i];
            }
            $("#result").val(eval(string));
            $("#display").val(eval(string));
            array = [eval(string)];
            currToken = eval(string);
        
        }
        else if(operators.includes(this.id) && array.length === 0){
            // do nothing    
        }
        else if((operators.includes(peek(array2))) && (operators.includes(this.id))){
            currToken = "";
            array.pop();
            array2.pop();
            
            var index = buttonIDs.indexOf(this.id);
            var symbol = buttonSymbols[index];
            
            array.push(symbol);
            array2.push(this.id);
            
            $("#result").val(symbol);
            
            var newString = array.join("");
            $("#display").val(newString);
        }
        else if(numbers.includes(this.id)){
            if(Number.isFinite(parseFloat(currToken)) || peek(array) === "." || (array.length === 0) ||
              operators.includes(peek(array2))){
                currToken += this.id;
                array.push(this.id);    // symbol and ID are identical for numbers; only different for operators/decimal
                array2.push(this.id);
                var val = $("#display").val();
                if(array.length === 1){
                    $("#display").val(this.id);
                }
                else{
                    $("#display").val(val + this.id);
                }
                $("#result").val(this.id);
            }
            
        }
        else if(this.id === "decimal"){
            if((Number.isFinite(parseFloat(currToken)) || (""+currToken === "")) && !(currToken+"").includes(".")){
                alert("hahah");
                currToken+=symbol;
                array.push(symbol);
                array2.push(this.id);
                var val = $("#display").val();
                $("#display").val(val + symbol);
                $("#result").val(symbol);
            }
        }
        else{
            if(operators.includes(this.id) && peek(array) !== "."){
                currToken = "";
                array.push(symbol);
                array2.push(this.id);
                var val = $("#display").val();
                $("#display").val(val + symbol);
                $("#result").val(symbol);
            }
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

function peek(array){
    if(array.length > 0){
        return array[array.length - 1];
    }
}