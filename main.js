

let operations = new Map(); // collection of operations

operations.set("(", 0);  //key - type of the operation 
operations.set(")", 1);  // value - priority
operations.set("+", 2);
operations.set("-", 2);
operations.set("*", 3);
operations.set("/", 3);


let operationStack = [];
let resultStack = [];


let _expressionStr = "ab+hpl*+*cd/*f+";//"(a+b)*(h+p*l)*(c/d)+f";   //"(a+b)*c";   //process.argv[1];  // user string from cmd
//_expressionStr = _expressionStr.toString();
let bracketCount = 0;
let operandCount = 0;
let operationsCount = 0;

let isKyr = /[а-яё]/i.test(_expressionStr);
let isLat = /[a-z]/i.test(_expressionStr);
let invSym = false;
for (let i = 0; i < _expressionStr.length; i++) {
    if (!(operations.has(_expressionStr[i]))) {
        if (/[^\d\sA-Z]/gi.test(_expressionStr[i])) {
            invSym = true;
        }
    }
}
    


let openBracket = false;
let closeBracket = false;

let toRPN = true;



for (let k = 1; k < _expressionStr.length; k++) {
    if (!(operations.has(_expressionStr[k-1])) && !(operations.has(_expressionStr[k]))) {
        toRPN = false;
    }
}
if (toRPN) {
    for (let i = 0; i < _expressionStr.length; i++) {
        if (_expressionStr[i] === "(" || _expressionStr[i] === ")") { 
            bracketCount++;
        }
        if (isLat) {
            if (!(operations.has(_expressionStr[i]))) {
                operandCount++;
                if (operandCount == 2) {
                    throw "Exception: operation pass";
                }
            }
        }
        if (operations.has(_expressionStr[i])) {
            if (_expressionStr[i] !== "(" && _expressionStr[i] !== ")") {
                operationsCount++;
                operandCount = 0;
            }
        }
        if (_expressionStr[i] === "(") {
            openBracket = true;
        } else if (_expressionStr[i] === ")") {
            if (!openBracket) {
                throw "Exception: invalid brackets direction";
            } else {
                closeBracket = true;
                openBracket = false;
            }
        }
        if (isKyr || invSym) {
            throw "Exception: invalid symbol(-s)"; 
        }
        
        

        if (!(operations.has(_expressionStr[i]))) {
            resultStack.push(_expressionStr[i]);        //if symbol with index "i" is operand - push this into resultStack
        } else if (operations.has(_expressionStr[i])) {
            if (operationStack.length == 0) {
                operationStack.push(_expressionStr[i]);     //if operationStack is empty - push operator into operationStack
            } else if(_expressionStr[i] === ")"){        
                let bracketIndex = operationStack.indexOf("(");     //index of first "("
                let temp = operationStack.length - 1;       //last index of the operationStack
    
                for(let i = temp; i > bracketIndex; i--) {
                    resultStack.push(operationStack.pop());        //delete and push into result from last to first "("
                }
                operationStack.pop();
    
            } else {
                let currentPririty = operations.get(_expressionStr[i]);        //pririty of the operator with index "i"
    
                let lastIndex = operationStack.length - 1;
                let prevOperator = operationStack[lastIndex];       //previous operator in the stack with operations
                let prevPririty = operations.get(prevOperator);        //priority of the previous operator
                
                if (currentPririty <= prevPririty && _expressionStr[i] != "(") {        //if priority of the operation with index "i" is greater than priority of the prev operator
                    let j = operationStack.length;
                    while(j!=0) {
                        resultStack.push(operationStack.pop());     //delete operation from operationStack and push into resultStack
                        if (prevPririty < currentPririty) {
                            break;
                        }
                        j--;
                    }
                    operationStack.push(_expressionStr[i]);     //push operation with index "i"
                } else {
                    operationStack.push(_expressionStr[i]);
                }
    
            }
        }
    
    }
    } else {
        let counterStep = _expressionStr.length;
        resultStack.push("(");
        for (let i = 0; i < _expressionStr.length; i++) {
            if (_expressionStr[i] === "(" || _expressionStr[i] === ")") { 
                bracketCount++;
            }
            if (isLat) {
                if (!(operations.has(_expressionStr[i]))) {
                    operandCount++;
                }
            }
            if (operations.has(_expressionStr[i])) {
                if (_expressionStr[i] !== "(" && _expressionStr[i] !== ")") {
                    operationsCount++;
                    operandCount = 0;
                }
            }
            if (_expressionStr[i] === "(") {
                openBracket = true;
            } else if (_expressionStr[i] === ")") {
                if (!openBracket) {
                    throw "Exception: invalid brackets direction";
                } else {
                    closeBracket = true;
                    openBracket = false;
                }
            }
            if (isKyr || invSym) {
                throw "Exception: invalid symbol(-s)"
            }

            if (!(operations.has(_expressionStr[i]))) {
                resultStack.push(_expressionStr[i]);
            } else {
                if (resultStack.length >= 3) {
                    let last = resultStack.pop();
                    let prev = resultStack.pop();
    
                    let temp ="(" + prev + _expressionStr[i] + last + ")";
                    resultStack.push(temp);
                    //resultStack.unshift("(");
                } else {
                    operationStack.push(_expressionStr[i]);
                }
                
            }
        }
    }

 
if (bracketCount % 2 != 0) {
    throw "Exception: bracket pass";
}

if (operandCount > operationsCount + 1) {
    throw "Exception: operation pass";
}

if (operationStack.length != 0) {
    for (let i = 0; i <= operationStack.length; i++) {
        resultStack.push(operationStack.pop());
    }
}

let answer = "";

for (let i = 0; i < resultStack.length; i++) {
    if (resultStack[i] != ")" && resultStack[i] != "(") {
        answer += resultStack[i];
    }
    else if (!toRPN) {
        answer += resultStack[i];
    }
}

console.log("main.js" + " " + _expressionStr + " " + "-->" + " " + answer);