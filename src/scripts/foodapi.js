console.log("working")
const getFoods = () => {
    return fetch("http://localhost:8088/food")
        .then(foods => foods.json())
}

const tableFoods = () => {
    getFoods().then(parsedFoods => {
        console.table(parsedFoods);
    })
}

tableFoods();

//the same result, written out.
// fetch("http://localhost:8088/food")
// .then(function(foods){
//     return foods.json()
// })
// .then(function(foodsFromtheAPI){
//     console.table(foodsFromtheAPI);
// })


console.log("goodbye")

const listHTML = document.querySelector(".foodlist")
const postToDom = (html) => {
    listHTML.innerHTML += html;
}

//Adds HTML to each value in the food object.
const htmlString = (food) => {
    return `
            <div class='card'>
                <h1 class='name entry'>${food.name}</h1>
                <h2 class='entry'>${food.category}</h2>
                <h2 class='entry'>${food.ethnicity}</h2>
                <p class='entry'>${food.ingredients}</p>
                <h3 class='entry'>${food.country}</h3>
                <h3 class='entry'>${food.calories}</h3>
                <h3 class='entry'>${food.fat}</h3>
                <h3 class='entry'>${food.sugar}</h3>
            </div>
        `
}

//Calls a function that fetchess the data, then passes each parsed entry to another function that adds HTML, finally passing the HTML to a function that posts it to the DOM. Depreciated.
const htmlFoods = () => {
    listHTML.innerHTML = "";
    getFoods().then(parsedFoods => {
        parsedFoods.forEach(food => {
            const foodHTML = htmlString(food);
            postToDom(foodHTML);
        })
    })
}

//calls HTML foods to add to add the information from the API to the DOM. Depreciated.
// htmlFoods()


getFoods().then(myParsedFoods => {
    myParsedFoods.forEach(food => {
        console.log(food) // Should have a `barcode` property

        // Now fetch the food from the Food API
        fetch(`https://world.openfoodfacts.org/api/v0/product/${food.barcode}.json`)
            .then(response => response.json())
            .then(productInfo => {
                food.ingredients = productInfo.product.ingredients_text_en;
                food.country = productInfo.product.countries;
                food.calories = productInfo.product.nutriments.energy;
                food.fat = productInfo.product.nutriments.fat_value;
                food.sugar = productInfo.product.nutriments.sugars_100g;


                // Produce HTML representation
                const foodAsHTML = htmlString(food)

                // Add representaiton to DOM
                postToDom(foodAsHTML)
            })
    })
})