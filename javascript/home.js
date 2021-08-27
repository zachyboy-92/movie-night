// Modal
export var modalContainer = document.querySelector(".modal_container");
let trendingMovies = document.querySelector("#trending_movies");
let trendingTvShows = document.querySelector("#trending_shows");

export function modalFunctionality() {
  let modal = document.querySelector(".modal_content");
  // Display Modal
  function displayModal() {
    let imageClicked = document.querySelector(".trending_image");
    imageClicked.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }
  // mouseout modal
  function exitList() {
    let trendingList = document.querySelector(".trending_list");
    trendingList.addEventListener(
      "mouseout",
      () => (modal.style.display = "none")
    );
  }
  displayModal();
  exitList();
}

export let categories = {
  topRatedMovies:
    "https://api.themoviedb.org/3/movie/now_playing?api_key=ebffe694845c711f14854519bf607415&language=en-US&page=1",
  topRatedShows:
    "https://api.themoviedb.org/3/tv/top_rated?api_key=ebffe694845c711f14854519bf607415&language=en-US&page=1",
  genre:
    "https://api.themoviedb.org/3/genre/movie/list?api_key=ebffe694845c711f14854519bf607415&language=en-US",
  tvGenre:
    "https://api.themoviedb.org/3/genre/tv/list?api_key=ebffe694845c711f14854519bf607415&language=en-US",
};

export async function fetchData(data) {
  let getData = await fetch(data);
  let response = await getData.json();
  return response;
}

// Movies Display Data Structure
export function moviesContainer(type, result) {
  type.insertAdjacentHTML(
    "afterbegin",
    `<div class="trending_list">
        <img class="trending_image" src=https:image.tmdb.org/t/p/w500${result.poster_path} alt="" />
        <div class="trending_info">
            <p>Name: ${result.title}</p>
            <p>Rating: ${result.vote_average}</p>
        </div>
    </div>`
  );
  modalContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal_content">
        <span class="exit_btn">&times;</span>
        <div class="modal_header">
            <p class="title">Name: ${result.title}</p>
            <p class="rating">Rating: ${result.vote_average}</p>
            </div>
        <p class="description">Description: ${result.overview}</p>
    </div>`
  );
}

// Displaying Data
function displayMovies(callback) {
  let data = callback;
  data.then((d) => {
    let results = d.results;
    for (let i = 0; i < results.length; i++) {
      if (i < 8) {
        moviesContainer(trendingMovies, results[i]);
        modalFunctionality();
      }
    }
  });
}

// Shows Display Structure
export function showsContainer(type, result) {
  type.insertAdjacentHTML(
    "afterbegin",
    `<div class="trending_list">
          <img class="trending_image" src=https:image.tmdb.org/t/p/w500${result.poster_path} alt="" />
          <div class="trending_info">
              <p>Name: ${result.name}</p>
              <p>Rating: ${result.vote_average}</p>
          </div>
      </div>`
  );
  modalContainer.insertAdjacentHTML(
    "afterbegin",
    `<div class="modal_content">
          <span class="exit_btn">&times;</span>
          <div class="modal_header">
              <p class="title">Name: ${result.name}</p>
              <p class="rating">Rating: ${result.vote_average}</p>
              </div>
          <p class="description">Description: ${result.overview}</p>
      </div>`
  );
}

function displayTrendingShows(callback) {
  let data = callback;
  data.then((d) => {
    let results = d.results;
    for (let i = 0; i < results.length; i++) {
      if (i < 8) {
        showsContainer(trendingTvShows, results[i]);
        modalFunctionality();
      }
    }
  });
}

displayTrendingShows(fetchData(categories.topRatedShows));
displayMovies(fetchData(categories.topRatedMovies));
