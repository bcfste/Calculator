const screen = document.querySelector('.screen');
let calcValues = [];


/* Selects all items with the class button, and pushes them to an array which displays on the screen*/
const buttons = Array.from(document.querySelectorAll('.button'));
buttons.forEach(button => button.addEventListener('click', function (e){
    const target = e.target.dataset.value; 
    calcValues.push(target);
    screen.textContent = calcValues.join(''); //removes commas when displaying on screen.
}));


function add (a,b) {
	return a+b;
}

function subtract (a,b) {
	return a-b;
}

function multiply (a,b){
    return a*b;
}

function divide (a,b){
    let result = ""
    if (a === 0 || b === 0){
        result = "ERROR";
    } else {
        result = a/b;
    }
    return result;
}

function operate (a,b,operand){
 let result;
    if (operand === "*"){
        result = multiply(a,b);
    } else if (operand === "/"){
        result = divide(a,b);
    } else if (operand === "+"){
        result = add(a,b);
    } else {
        result = subtract(a,b);
    }
 return result;
}

let copyValues = [];
let operandValues = [];
/* Equals feature that checks if element is Not a number*/
const equals = document.querySelector('.equals');
equals.addEventListener('click', function(e){
    calcValues.push('&'); // pushes operand at the end to add value.
    let value = "";
    if (calcValues.every(operandCheck) === true){                  //if only operands are in the array, then this only pushes the operands to alow the error messages to process alter on.
        calcValues.forEach(operand => operandValues.push(operand));
    } else {
         calcValues.forEach(operand => {
            if (operandCheck(operand) === false){
                value += operand; 
            } else {
                copyValues.push(Number(value)); // converts to String to number
                operandValues.push(operand);
                value = "";
                
            }
         });
    }
    
    operandValues.pop(); // pops the check operand at the end of the array.
    console.log(operandValues);
    console.log(copyValues);
    if (copyValues.length < 1){
        calcValues = [];
        calcValues.push("ERROR");
    } else if(operandValues.length < 1) {
        calcValues.push(copyValues[0]); //returns the user input number.
        
    } else {
        calcValues = [];
        let firstValue = 0; //sets array values for calc list for looping through operands.
        let secondValue = 1;
        /* goes through each operand and calls first value or second value from copy value.*/
        operandValues.forEach (operand => {
            calcValues.push(operate(copyValues[firstValue],copyValues[secondValue],operand));
            copyValues[secondValue] = operate(copyValues[firstValue],copyValues[secondValue],operand);
            firstValue++;
            secondValue++;
        });

    }
    copyValues = []; // empties the arrays afer it is finished.
    operandValues = [];
    screen.textContent = calcValues[calcValues.length-1]; 
 
})
    

const clear = document.querySelector('.clear');
clear.addEventListener('click', function (e){
    calcValues = [];
    copyValue = [];
    operandValues = [];
    screen.textContent = calcValues.join('');
})

function operandCheck (operand){
  let result = false;
    if (operand === "*" || operand === "+" || operand === "-" || operand === "/" || operand ==="&"){
        result = true;
    }
    return result;
}