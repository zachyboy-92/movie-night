// Modal
var modalContainer = document.querySelector(".modal_container");
function modalFunctionality() {
  let modal = document.querySelector(".modal_content");
  // Display Modal
  function displayModal() {
    let imageClicked = document.querySelector(".trending_image");
    imageClicked.addEventListener("click", () => {
      modal.style.display = "block";
    });
  }
  // Exit Modal
  function exitModal() {
    let exitModal = document.querySelector(".exit_btn");
    exitModal.addEventListener("click", () => (modal.style.display = "none"));
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
  exitModal();
  exitList();
}

// fetching data
// let key = "ebffe694845c711f14854519bf607415";
let trendingMovies = document.querySelector("#trending_movies");
let trendingTvShows = document.querySelector("#trending_shows");

let categories = {
  movies: {
    nowPlaying: "/movie/now_playing",
  },
  tvShows: {
    topRated: "/tv/top_rated",
  },
};

async function fetchData(categorie) {
  let key = "ebffe694845c711f14854519bf607415";
  let baseUrl = "https://api.themoviedb.org/3";
  let getData = await fetch(
    `${baseUrl}${categorie}?api_key=${key}&language=en-US`
  );
  let response = await getData.json();
  return response;
}

// Displaying Data
function displayMovies(callback) {
  let data = callback;
  data.then((d) => {
    let results = d.results;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      if (i < 8) {
        trendingMovies.insertAdjacentHTML(
          "afterbegin",
          `<div class="trending_list">
              <img class="trending_image" src=https:image.tmdb.org/t/p/w500/${results[i].poster_path} alt="" />
              <div class="trending_info">
              <p>Name: ${results[i].title}</p>
              <p>Rating: ${results[i].vote_average}</p>
            </div>
          </div>`
        );
        modalContainer.insertAdjacentHTML(
          "afterbegin",
          `<div class="modal_content">
          <span class="exit_btn">&times;</span>
            <div class="modal_header">
              <p class="title">Name: ${results[i].title}</p>
              <p class="rating">Rating: ${results[i].vote_average}</p>
            </div>
            <p class="description">Description: ${results[i].overview}</p>
          </div>`
        );
        modalFunctionality();
      }
    }
  });
}

function displayShows(callback) {
  let data = callback;
  console.log(data);
  data.then((d) => {
    let results = d.results;
    console.log(results);
    for (let i = 0; i < results.length; i++) {
      if (i < 8) {
        console.log(results[i]);
        trendingTvShows.insertAdjacentHTML(
          "afterbegin",
          `<div class="trending_list">
              <img class="trending_image" src=https:image.tmdb.org/t/p/w500/${results[i].poster_path} alt="" />
              <div class="trending_info">
              <p>Name: ${results[i].name}</p>
              <p>Rating: ${results[i].vote_average}</p>
            </div>
          </div>`
        );
        modalContainer.insertAdjacentHTML(
          "afterbegin",
          `<div class="modal_content">
          <span class="exit_btn">&times;</span>
            <div class="modal_header">
              <p class="title">Name: ${results[i].name}</p>
              <p class="rating">Rating: ${results[i].vote_average}</p>
            </div>
            <p class="description">Description: ${results[i].overview}</p>
          </div>`
        );
        modalFunctionality();
      }
    }
  });
}

displayShows(fetchData(categories.tvShows.topRated));
displayMovies(fetchData(categories.movies.nowPlaying));
