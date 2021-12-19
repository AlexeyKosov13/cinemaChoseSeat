const API_KEY = "e6a4b61f-9c7a-4d61-a717-91be7d5b71b7";
const API_URL_POULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const titleSearch = document.querySelector('.title__films');

getMovies(API_URL_POULAR);

async function getMovies(url) {
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });
  const respData = await resp.json();
  console.log(respData);
  showMovies(respData);
}

function getClassByRate(vote) {
  if (vote > 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie">
        <div class="movie__cover--inner">
            <img src='${movie.posterUrlPreview}' alt="${
                movie.nameRu
            }" class="movie__cover">
            <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
            <div class="movie__title">${movie.nameRu}</div>
            <div class="movie__category">${movie.genres.map((genre, index) => {
              if (index < 3) {
                return `${genre.genre}`;
              }
            })}</div>
            ${
              movie.rating && 
              `
                <div class="movie__average movie__average--${getClassByRate(
                    movie.rating
                    )}">${movie.rating}</div>   
                    `
                    }
                    
                </div>
        </div>
        `;
    moviesEl.appendChild(movieEl);
  });
}

const form = document.querySelector("form");
const search = document.querySelector(".form__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;

  if (search.value) {
    getMovies(apiSearchUrl);
    }
    console.log(search.value)
    titleSearch.innerHTML = `Результат поиска для: ${search.value}`;
    search.value = "";
    
});
