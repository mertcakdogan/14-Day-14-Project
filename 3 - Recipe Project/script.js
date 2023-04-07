const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");

// Search button click event
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
recipeCloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// Get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${searchInputTxt}&number=10&apiKey=c6df8246a5a64f4ba299e9ecb09352bb`)
    .then((response) => response.json())
    .then((data) => {
      // Display meal list
      let html = "";
      if (data.length > 0) {
        data.forEach((meal) => {
          html += `
            <div class="item" data-id="${meal.id}">
              <div class="img">
                <img src="${meal.image}" alt="${meal.title}">
              </div>
              <div class="name">
                <h3>${meal.title}</h3>
                <a href="#" class="recipe-btn">Tarif</a>
              </div>
            </div>
          `;
        });
        mealList.classList.remove("notFound");
      } else {
        html = "Aradığınız malzemelerle eşleşen bir yemek bulunamadı. Lütfen farklı malzemeler deneyin.";
        mealList.classList.add("notFound");
      }
      mealList.innerHTML = html;
    });
}

// Get recipe of the meal
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://api.spoonacular.com/recipes/${mealItem.dataset.id}/information?apiKey=c6df8246a5a64f4ba299e9ecb09352bb`)
      .then((response) => response.json())
      .then((data) => mealRecipeModal(data));
  }
}

// Create a modal
function mealRecipeModal(meal) {
  let html = `
    <h2 class="recipe-title">${meal.title}</h2>
    <p class="recipe-category">${meal.cuisines}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.instructions}</p>
    </div>
    <div class="recipe-img">
      <img src="${meal.image}" alt="">
    </div>
    <div class="recipe-link">
      <a href="${meal.sourceUrl}" target="_blank">Tarif Videosu</a>
    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}
