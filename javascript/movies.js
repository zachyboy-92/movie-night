import { categories } from "./home.js";
import { fetchData, modalFunctionality, moviesContainer } from "./home.js";

let movies = document.querySelector("#movies");

// Display Movies
function displayMovies(callback) {
  movies.innerHTML = "";
  let data = callback;
  data.then((d) => {
    let results = d.results;
    results.forEach((result) => {
      if (result.length !== 0) {
        moviesContainer(movies, result);
        modalFunctionality();
      } else {
        movies.innerHTML = `<h1>No results found</h1>`;
      }
    });
  });
}
displayMovies(fetchData(categories.topRatedMovies));

// Fetch Genre Data
async function fetchSearchData(array) {
  let key = "ebffe694845c711f14854519bf607415";
  let fetchedArray = await array;
  //
  let getData = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${encodeURI(
      fetchedArray.join(",")
    )}&with_watch_monetization_types=flatrate`
  );
  let response = await getData.json();
  return response;
}

// Displaying Genre Buttons
let genreButtonsContainer = document.querySelector("#genre_container");
var genreArray = [];
function displayGenreButtons(callback) {
  movies.innerHTML = "";
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
        displayMovies(fetchSearchData(genreArray));
        highlightSelectedGenre();
      });
      genreButtonsContainer.append(button);
    });
  });
}
displayGenreButtons(fetchData(categories.genre));

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

// Search Movies
let input = document.querySelector("#input");
let searchButton = document.querySelector("#search_logo");
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
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
    `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${recievedValue}`
  );
  let response = await getData.json();
  return response;
}

function displaySearchedData(data) {
  movies.innerHTML = "";
  let results = data.results;
  results.forEach((result) => {
    moviesContainer(movies, result);
    modalFunctionality();
  });
  let buttonContainer = document.querySelector(".buttons_container");
  buttonContainer.style.display = "none";
}

// Fetching Data for next and previous content
async function fetchNextData(page) {
  let getData = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=ebffe694845c711f14854519bf607415&language=en-US&page=${page}`
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

    displayMovies(fetchNextData(page));
    // // Displaying next page
    function displayNextPage() {
      movies.innerHTML = "";
      nextPage.addEventListener("click", () => {
        ++page;
        displayMovies(fetchNextData(page));
        console.log(page);
      });
    }

    // Displaying previous page
    function displayPreviousPage() {
      movies.innerHTML = "";
      console.log(page);
      previousPage.addEventListener("click", () => {
        --page;
        displayMovies(fetchNextData(page));
      });
      if (page <= 1) {
        previousPage.removeEventListener("click", () => {
          --page;
          displayMovies(fetchNextData(page));
        });
      }
    }
    displayNextPage();
    displayPreviousPage();
  });
}

displayNextData(fetchNextData(page));
