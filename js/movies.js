const API_KEY = "e6a4b61f-9c7a-4d61-a717-91be7d5b71b7";
const API_URL_POULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_FILM_INFO = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
let pageNum = 1;

getMovies(API_URL_POULAR+pageNum);

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

//===========переключение страниц=========
const next = document.querySelector('.button_next');
const prev = document.querySelector('.button_prev');

next.addEventListener('click', (e) => {
  ++pageNum;
  // скрытие кнопики prev на первой странице
  if (pageNum > 1) {
    prev.classList.remove('btn_hide');
    prev.classList.add('btn_show');
  }
  const page = API_URL_POULAR + pageNum;
  getMovies(page);
  window.scroll(0, 120);
});
// нажатие на укнопку prev
prev.addEventListener('click', (e) => {
  --pageNum;
  if (pageNum < 2) {
    prev.classList.remove('btn_show');
    prev.classList.add('btn_hide');
  }
  const page = API_URL_POULAR + pageNum;
  getMovies(page);
  window.scroll(0, 120);
});


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
  
  moviesEl.innerHTML = "";

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
  const titleSearch = document.querySelector('.title__films');
  
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
  const modal = document.querySelector('.modalWindow');
  const closeBtn = document.querySelector('.close_btn');
  const poster = document.querySelector('.modal_poster');
  const title = document.querySelector('.text_title');
  const original = document.querySelector('.text_title_original');
  const rating = document.querySelector('.text_raiting');
  const description = document.querySelector('.text_description');
  const genre = document.querySelector('.text_genre');
  const year = document.querySelector('.text_year');
  modal.classList.remove('hide');
  modal.classList.add('show');
  let genresList = item.genres.map((genre, index) => {
    if (index < 3) {
        return `${genre.genre}`;
      }
    })
  poster.src = item.posterUrlPreview;
  title.innerHTML = item.nameRu;
  original.innerHTML = item.nameOriginal;
  rating.innerHTML = item.ratingKinopoisk;
  description.innerHTML = item.description;
  genre.innerHTML = genresList;
  year.innerHTML = item.year;
  //закрытие модального окна
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hide');   
  }); 
  modal.addEventListener("click", (e) => {
    // закрытие по щелчку на пустом поле
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.classList.add('hide');     
    }
  }); 
  document.addEventListener("keydown", (e) => {
    // закрытие клавишей escape
    if (e.code === "Escape") {
      modal.classList.remove('show');
      modal.classList.add('hide');    
    }
  });  
};
  



