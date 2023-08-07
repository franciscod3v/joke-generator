const API_URL_CATEGORIES = "https://v2.jokeapi.dev/categories";
const API_URL_BASIC = "https://v2.jokeapi.dev/joke/";

async function getCategoriesFromAPI() {
  try {
    const response = await fetch(API_URL_CATEGORIES);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

async function setCategoriesOnPage() {
  try {
    const categoriesData = await getCategoriesFromAPI();
    const categoriesContainer = document.getElementById("categories-container");
    for (const category of categoriesData.categories) {
      const itemCategory = document.createElement("option");
      itemCategory.value = category;
      itemCategory.textContent = category;
      categoriesContainer.append(itemCategory);
    }
  } catch (error) {
    console.error(error);
  }
}

async function createJoke(categorySelected) {
  try {
    const jokeClass = "joke-text";
    const dataFromAPI = await fetch(`${API_URL_BASIC}/${categorySelected}`);
    const dataJoke = await dataFromAPI.json();
    const jokeContainer = document.getElementById("joke-container");

    /*Delete previus jokes*/
    const previusJokes = document.querySelectorAll(`.${jokeClass}`);

    for (const iterator of previusJokes) {
      iterator.remove();
      console.log("parrafo eliminado");
    }

    if (dataJoke.joke) {
      const step1 = document.createElement("p");
      step1.textContent = dataJoke.joke;
      jokeContainer.append(step1);
      step1.classList.add(jokeClass);
    } else {
      const step1 = document.createElement("p");
      step1.textContent = dataJoke.setup;
      jokeContainer.append(step1);
      step1.classList.add(jokeClass);
      const step2 = document.createElement("p");
      step2.textContent = dataJoke.delivery;
      jokeContainer.append(step2);
      step2.classList.add(jokeClass);
    }
    const btnNewJoke = document.createElement("button");
    jokeContainer.classList.remove("desactive");
  } catch (error) {
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  setCategoriesOnPage();
  document
    .getElementById("btn-form")
    .addEventListener("click", async (event) => {
      let userSelectedCategory = document.getElementById(
        "categories-container"
      ).value;
      await createJoke(userSelectedCategory);
    });
});
