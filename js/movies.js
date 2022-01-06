const API_KEY = "e6a4b61f-9c7a-4d61-a717-91be7d5b71b7";
const API_URL_POULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_FILM_INFO = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
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
  showMovies(respData);
};

async function getMovie(url) {
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });
  const respData = await resp.json();
  showModal(respData);
};

// подсветка круга в зависимости от рейтинга
function getClassByRate(vote) {
  if (vote > 7) {
    return "green";
  } else if (vote > 5) {
    return "orange";
  } else {
    return "red";
  }
};

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.classList.add("popup_img");
    movieEl.innerHTML = `
        <div  class="movie card">
          <div class="movie__cover--inner">
              <img src='${movie.posterUrlPreview}' alt="${
                  movie.nameRu
              }" class="movie__cover">
              <div class="movie__cover--darkened" data-id="${movie.filmId}"></div>
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
  
};
// поиск фильмов 
const form = document.querySelector("form");
const search = document.querySelector(".form__search");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const apiSearchUrl = `${API_URL_SEARCH}${search.value}`;
  if (search.value) {
    getMovies(apiSearchUrl);
    }
    titleSearch.innerHTML = `Результат поиска для: ${search.value}`;
    search.value = "";   
});



//====================popup==================


//модальное окно по клику на постер
window.addEventListener("click", function (event) {
  if (event.target.closest('.card')) {
    const filmId = event.target.getAttribute('data-id');
    const filmItem = `${API_FILM_INFO}${filmId}`;

    getMovie(filmItem); 
  };
});

//рендер модального окна
function showModal(item) {
  const parentFilm = document.querySelector('.main__films');

  let modalFilm = `
    <div class="modalWindow">
      <div class="modal-content">
        <span class="close_btn">&times;</span>
          <div class="popup_block popup_img">
            <img src="${item.posterUrlPreview}" alt="${item.nameRu}" class="popup_poster">
          </div>
          <div class="popup_text popup_block">
            <h3 class="text_title">${item.nameRu}</h3>
            <h4 class="text_title_original">${item.nameOriginal?item.nameOriginal:''}
              </h4>
            <p class="text_raiting"><span class="text_text">Рейтинг: </span>${item.ratingKinopoisk}</p>
            <p class="text_description"><span class="text_text">Описание: </span>${item.description}</p>
            <p class="text_genre"><span class="text_text">Жанр: </span>${item.genres.map((genre, index) => {
              if (index < 3) {
                return `${genre.genre}`;
              }
            })}</p>
            <p class="text_year"><span class="text_text">Год производства: </span>${item.year}</p>
          </div>               
      </div>    
    </div>
    `;

    parentFilm.innerHTML += modalFilm;
  console.log(modalFilm);
  //закрытие модального окна
  const closeBtn = document.querySelector('.close_btn');
  const modal = document.querySelector('.modalWindow');
    closeBtn.addEventListener('click', () => {
      parentFilm.innerHTML -= modalFilm;
    });
  
    modal.addEventListener("click", (e) => {
      // закрытие по щелчку на пустом поле
      if (e.target === modal) {
        parentFilm.innerHTML -= modalFilm;
      }
    });
  
    document.addEventListener("keydown", (e) => {
      // закрытие клавишей escape
      if (e.code === "Escape") {
        parentFilm.innerHTML -= modalFilm;
      }
    });
};


  
//===========================
