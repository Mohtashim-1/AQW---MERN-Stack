var cities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"];

// console.log(typeof(cities));

// console.log(cities.length);
// console.log(cities[2])

var mixedArray = ["1", "Bob", "Now is", true];

var name1 = []
name1[0] = "John";
name1[1] = "Test";
name1.push("Doe "); // add a new element to the last of the array
name1.pop(); // remove the last element of the array
name1.shift(); // remove the first element of the array
name1.shift()
name1.unshift("New", "New1", "New2", "New3", "New4", "New5", "New6", "New7", "New8", "New9", "New10"); // add a new element to the first of the array
// name1.splice(0, 2); // remove the element from the array
name1.splice(1, 1, "Test1"); // add a new element to the array
// name1.splice(1, 2, "New", "New"); // add a new element to the array
// console.log(name1)

// console.log(fruits)
// var date = fruits.slice(4,4);
// console.log(date)

// loops

// iteration

// var fruits = ["apple", "banana", "cherry", "date", "elderberry"];

// console.log(fruits.length)
// for (var i = 0; i <= fruits.length; i++){
//     console.log("Fruit Name: " + fruits[i])

//     if(fruits[i] == "cherry"){
//         console.log("Cherry is found")
//         // break;
//     }
//     else{
//         console.log("Cherry is not found")
//     }
// }



// console.log("13131313")
//     for(var i = 0; i < fruits.length; i++){
//     console.log("Fruit Name: " + fruits[i])
// }

var matchFound = false;

var cityToCheck = "Karachi";


var CleanestCities = ["New York", "Los Angeles", "Chicago", "Houston", "Miami"]
 
for (var i = 0; i <= CleanestCities.length; i++){
    if (cityToCheck == CleanestCities[i]) {
        matchFound = true;
        
        // alert("It's one of the cleanest cities");
        console.log("It's one of the cleanest cities" + CleanestCities[i] );
    }
}

if (matchFound == true) {
    console.log("It's not on the list");
}