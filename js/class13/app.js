

function demo(c, d) {
    return c * d;
    console.log(c * d);
}

// let result = demo(20, 20);
// console.log(result);


// console.log(demo(10, 10));

// function name(){
//     console.log("Hello World");
// }
// alert(name());
// console.log(name());
// document.write(name());

function fname() {
    console.log("Welcome to JavaScript");
}

// fname();
function tellTime() {
    var now = new Date();
    var theHr = now.getHours();
    var theMin = now.getMinutes();
    console.log("Current time: " + theHr + ":" + theMin);
}

function greetuser(greeting) {
    alert(greeting);
}

// var greeting = "Hello there";

// greetuser("Hello " + "Ahmad");


function calcTot(merchTot) {
    var orderTot;
    if (merchTot >= 100) {
        orderTot = merchTot;
    }
    else if (merchTot < 50.01) {
        orderTot = merchTot + 5;
    }
    else {
        orderTot = merchTot + 5 + (.03 * (merchTot - 50));
        
    }
    return orderTot;
}

console.log(calcTot(80));