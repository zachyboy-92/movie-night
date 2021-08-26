import { categories } from "./home.js";
import { fetchData, modalFunctionality, showsContainer } from "./home.js";

// Display Shows
let shows = document.querySelector("#shows");
function displayShows(callback) {
  shows.innerHTML = "";
  let data = callback;
  data.then((d) => {
    let results = d.results;
    results.forEach((result) => {
      showsContainer(shows, result);
      modalFunctionality();
    });
  });
}

displayShows(fetchData(categories.topRatedShows));

// fetching search data
async function fetchSearchData(array) {
  let key = "ebffe694845c711f14854519bf607415";
  let fetchedArray = await array;
  let getData = await fetch(
    `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false&with_genres=${encodeURI(
      fetchedArray.join(",")
    )}&with_watch_monetization_types=flatrate`
  );
  let response = await getData.json();
  return response;
}

let genreButtonsContainer = document.querySelector("#genre_container");
var genreArray = [];
function displayGenreButtons(callback) {
  shows.innerHTML = "";
  let data = callback;
  data.then((d) => {
    console.log(d);
    let genreType = d.genres;
    genreType.forEach((genre) => {
      let button = document.createElement("button");
      button.classList.add("genre_button");
      button.id = genre.id;
      button.innerHTML = genre.name;
      button.addEventListener("click", () => {
        // Remove next and previous buttons when genre event occurs
        let buttonContainer = document.querySelector(".buttons_container");
        buttonContainer.style.display = "none";
        console.log("clikced");
        console.log(genre.id);
        if (genreArray.length === 0) {
          genreArray.push(genre.id);
        } else {
          if (genreArray.includes(genre.id)) {
            genreArray.forEach((id, index) => {
              if (id === genre.id) {
                genreArray.splice(index, 1);
              }
            });
          } else {
            genreArray.push(genre.id);
          }
        }
        displayShows(fetchSearchData(genreArray));
        highlightSelectedGenre();
      });
      genreButtonsContainer.append(button);
    });
  });
}
displayGenreButtons(fetchData(categories.tvGenre));

// highlight selected genres
function highlightSelectedGenre() {
  // remove highligted Elements
  let elements = document.querySelectorAll(".genre_button");
  elements.forEach((el) => {
    el.classList.remove("highlight");
  });

  if (genreArray !== 0) {
    genreArray.forEach((id) => {
      const highlightedElement = document.getElementById(id);
      highlightedElement.classList.add("highlight");
    });
  }
}

// Search Data
// Search Movies
let input = document.querySelector("#input");
let searchButton = document.querySelector("#search_logo");
searchButton.addEventListener("click", () => {
  let inputValue = input.value;
  let foundData = searchData(inputValue);
  if (!inputValue) {
    displayTrendingMovies(fetchData(nowPlaying.link, page));
    trendingMovies.innerHTML = "";
  } else {
    foundData.then((data) => {
      displaySearchedData(data);
    });
  }
});

async function searchData(value) {
  let key = "ebffe694845c711f14854519bf607415";
  let recievedValue = await value;
  let getData = await fetch(
    `https://api.themoviedb.org/3/search/tv?api_key=${key}&language=en-US&page=1&include_adult=false&query=${recievedValue}`
  );
  let response = await getData.json();
  return response;
}

function displaySearchedData(data) {
  shows.innerHTML = "";
  input.innerHTML = "";
  let results = data.results;
  results.forEach((result) => {
    showsContainer(shows, result);
    modalFunctionality();
  });
  let buttonContainer = document.querySelector(".buttons_container");
  buttonContainer.style.display = "none";
}

// Fetching Data for next and previous content
async function fetchNextData(page) {
  let getData = await fetch(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=ebffe694845c711f14854519bf607415&language=en-US&page=${page}`
  );
  let response = await getData.json();
  return response;
}

let page = 1;
let nextPage = document.querySelector(".next");
let previousPage = document.querySelector(".previous");
function displayNextData(callback) {
  let data = callback;
  console.log(data);
  data.then((response) => {
    console.log(response);

    displayShows(fetchNextData(page));
    // // Displaying next page
    function displayNextPage() {
      shows.innerHTML = "";
      nextPage.addEventListener("click", () => {
        ++page;
        displayShows(fetchNextData(page));
        console.log(page);
      });
    }

    // Displaying previous page
    function displayPreviousPage() {
      shows.innerHTML = "";
      console.log(page);
      previousPage.addEventListener("click", () => {
        --page;
        displayShows(fetchNextData(page));
      });
      previousPage.removeEventListener("click", () => {
        --page;
        displayShows(fetchNextData(page));
      });
    }
    displayNextPage();
    displayPreviousPage();
  });
}

displayNextData(fetchNextData(page));
