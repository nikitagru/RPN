let operations = new Map(); // collection of operands

operations.set("(", 0);  //key - type of the operation 
operations.set(")", 1);  // value - proirity
operations.set("+", 2);
operations.set("-", 2);
operations.set("*", 3);
operations.set("/", 3);


let operationStack = [];
let resultStack = [];


let _expressionStr = "(a+b)*(c/d)+f";   //process.argv[1];  // user string from cmd
//_expressionStr = _expressionStr.toString();

for (let i = 0; i < _expressionStr.length; i++) {
    
    if (!(operations.has(_expressionStr[i]))) {
        resultStack.push(_expressionStr[i]);        //if symbol with index "i" is operand - push this into resultStack
    } else if (operations.has(_expressionStr[i])) {
        if (operationStack.length == 0) {
            operationStack.push(_expressionStr[i]);     //if operationStack is empty - push operator into operationStack
        } else if(_expressionStr[i] === ")"){        
            let bracketIndex = operationStack.indexOf("(");     //index of first "("
            let temp = operationStack.length - 1;       //last index of the operationStack

            for(let i = 0; i <= bracketIndex; i++) {
                resultStack.push(operationStack.pop());
            }
            operationStack.pop();
            // while(operationStack[temp] != operationStack[bracketIndex]) {       //delete and push into result from last to first "("
            //     resultStack.push(operationStack.pop());
            // }

        } else {
            let currentPririty = operations.get(_expressionStr[i]);        //pririty of the operator with index "i"

            let lastIndex = operationStack.length - 1;
            let prevOperator = operationStack[lastIndex];       //previous operator in the stack with operations
            let prevPririty = operations.get(prevOperator);        //priority of the previous operator
            
            if (currentPririty <= prevPririty) {        //if priority of the operation with index "i" is high than priority of the prev operator
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

if (operationStack.length != 0) {
    for (let i = 0; i < operationStack.length; i++) {
        resultStack.push(operationStack.pop());
    }
}

let answer = "";

for (let i = 0; i < resultStack.length; i++) {
    answer += resultStack[i];
}

console.log(answer);