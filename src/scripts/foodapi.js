console.log("working")
fetch("http://localhost:8088/food")
    .then(foods => foods.json())
    .then(parsedFoods => {
        console.table(parsedFoods);
    })

    //the same result, written out.
    fetch("http://localhost:8088/food")
    .then(function(foods){
        return foods.json()
    })
    .then(function(foodsFromtheAPI){
        console.table(foodsFromtheAPI);
    })

    console.log("goodbye")