function popup(message) {
    alert(message);
}
function helloworld(){
    console.log("hello world");
}

helloworld();
// var arr = [1, "2", "string", "true", "false"];
// for (var i=0; i<arr.length; i++){
//     console.log(arr[i]);
// }

cleanest_cities = ["Tokyo", "Kyoto", "Osaka", "Hiroshima", "Nagasaki"];

helloworld();


for (var i=0; i<=5; i++){
    if (cleanest_cities[i] == "Karachi") {
        console.log("Tokyo is the cleanest city in Japan");
        // break;
    }
    else{
        console.log(cleanest_cities[i] + " is not the cleanest city in Japan");
    }
}

helloworld();


function sum(a=10, b=30){
    console.log(a + b);
}


function greet(name){
    console.log("Hello, " + name);
}

var name1 = prompt("Enter your name");

greet(name1);

