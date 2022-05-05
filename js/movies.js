const API_KEY = "e6a4b61f-9c7a-4d61-a717-91be7d5b71b7";
let API_URL_POULAR =
  "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=";
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_FILM_INFO = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";
let pageNum = 1;
const titleSearch = document.querySelector('.title__films');

getMovies(API_URL_POULAR+pageNum,showMovies);

async function getMovies(url,func) {
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "X-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
  });
  const respData = await resp.json();
  func(respData);
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

// =======поиск фильмов онлайн в яндексе ======
const searchOnline = document.querySelector('.searchOnline');

//========выбор списков=============
const topList = document.querySelector('.top__list');
topList.addEventListener('change', () => {
  function getTop(item, text) {
    if (topList.value == item) {
      API_URL_POULAR = `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=${topList.value}&page=`;
      getMovies(API_URL_POULAR + pageNum,showMovies);
      titleSearch.innerHTML = text;
    };
  };
  getTop("TOP_100_POPULAR_FILMS", "Топ 100 популярных фильмов");
  getTop("TOP_250_BEST_FILMS", "Топ 250 лучших фильмов");
  getTop("TOP_AWAIT_FILMS","Топ ожидания")
  
  
});

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
  getMovies(page, showMovies);
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
  getMovies(page,showMovies);
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

//============переключение режима просмотра=========

const buttonList = document.querySelector('.button__list');
const buttonTable = document.querySelector('.button__table');

buttonList.addEventListener('click', () => {
  getMovies(API_URL_POULAR + pageNum, showMoviesList);
})
buttonTable.addEventListener('click', () => {
  getMovies(API_URL_POULAR + pageNum, showMovies);
})

//==============расположените списком =============

function showMoviesList(data) {
  const moviesEl = document.querySelector('.movies');
  moviesEl.classList.remove('menu__table');
  moviesEl.classList.add('menu__list');

  moviesEl.innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie__list");
    movieEl.classList.add("popup_img");
    movieEl.innerHTML = `
        <div  class="movie__card ">
          <div class="movie__cover--inner card">
              <img src='${movie.posterUrlPreview}' alt="${
                  movie.nameRu
              }" class="movie__cover">
              <div class="movie__cover--darkened" data-id="${movie.filmId}"></div>
          </div>
          <div class="movie__info_list">
              <div class="movie__title_list">${movie.nameRu}</div>
              <div class="movie__title_list_orig">${
                movie.nameEn !== null?`<div>${movie.nameEn}</div>`:''              
                }</div>
              <div class="movie__year_list">год: ${movie.year}</div>  
              <div class="movie__category_list">жанр: ${movie.genres.map((genre, index) => {
                if (index < 3) {
                  return `${genre.genre}`;
                }
              })}</div>
               
                <div class="movie__rating_list">Рейтинг Кинопоиска: ${movie.rating}</div>
        </div>
        `;
    moviesEl.appendChild(movieEl); 
    console.log(movie); 
  });
}


//=================создание карточек===============
function showMovies(data) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.classList.remove('menu__list');
  moviesEl.classList.add('menu__table');
  moviesEl.innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.classList.add("popup_img");
    movieEl.innerHTML = `
        <div  class="movie " >
          <div class="movie__cover--inner card">
              <img src='${movie.posterUrlPreview}' alt="${
                  movie.nameRu
              }" class="movie__cover ">
              <div class="movie__cover--darkened" data-id="${movie.filmId}"></div>
          </div>
          <div class="movie__info" >
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
    getMovies(apiSearchUrl, showMovies);
    }
    titleSearch.innerHTML = `Результат поиска для: ${search.value}`;
    search.value = "";   
});

//====================popup==================
const moviesEl = document.querySelector(".movies");
//модальное окно по клику на постер
moviesEl.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.closest('.card')) {
    const filmId = event.target.getAttribute('data-id');
    const filmItem = `${API_FILM_INFO}${filmId}`;
    getMovie(filmItem); 
  };
});

//рендер модального окна
function showModal(item) {
  const body = document.querySelector('body');
  const search = document.querySelector('.searchFilm');
  const searchTrailer = document.querySelector('.searchTrailer');
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
  body.style.overflow = 'hidden';
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
  search.href = `https://yandex.ru/search/?lr45&text=${item.nameRu}+смотреть+онлайн+lordfilm`;
  searchTrailer.href = `https://www.youtube.com/results?search_query=трейлер+${item.nameRu}`;
  
  //закрытие модального окна
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hide');
    body.style.overflow = 'visible';   
  }); 
  modal.addEventListener("click", (e) => {
    // закрытие по щелчку на пустом поле
    if (e.target === modal) {
      modal.classList.remove('show');
      modal.classList.add('hide');
      body.style.overflow = 'visible';        
    }
  }); 
  document.addEventListener("keydown", (e) => {
    // закрытие клавишей escape
    if (e.code === "Escape") {
      modal.classList.remove('show');
      modal.classList.add('hide'); 
      body.style.overflow = 'visible';      
    }
  });  
};

//=============menu burger==============

let contain = document.getElementById("contain");

contain.addEventListener("click", openNaw);

function openNaw() {
  let element = document.getElementById("nav");
  element.classList.toggle("open");
  
  contain.classList.toggle("change");
}

  
//================yandex search==================



// https://yandex.ru/search/?text=поисковый+запрос+в+яндексе+как+вышлядит&lr=45&clid=2270455&win=530
