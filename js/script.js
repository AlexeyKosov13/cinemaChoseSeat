var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


//=============menu burger==============

let contain = document.getElementById("contain");

contain.addEventListener("click", openNaw);

function openNaw() {
  let element = document.getElementById("nav");
  element.classList.toggle("open");
  
  contain.classList.toggle("change");
}

// ============слайдер==================

/* Индекс слайда по умолчанию */
let slideIndex = 1;
showSlides(slideIndex);

/* Функция увеличивает индекс на 1, показывает следующй слайд*/
function plusSlide() {
    showSlides(slideIndex += 1);
}

/* Функция уменьшяет индекс на 1, показывает предыдущий слайд*/
function minusSlide() {
    showSlides(slideIndex -= 1);  
}

/* Устанавливает текущий слайд */
function currentSlide(n) {
    showSlides(slideIndex = n);
}

/* Основная функция слайдера */
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("item");
    let dots = document.getElementsByClassName("slider-dots_item");
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

let timer = setInterval(function(){
    slideIndex++;
    showSlides(slideIndex);
}, 5000);

//================================

//========== API kinopoisk=========

const API_KEY = "e6a4b61f-9c7a-4d61-a717-91be7d5b71b7";

const today = new Date();
const month = (today.toLocaleString('en-US', { month: 'long' })).toUpperCase();

const year = today.getFullYear();
const API_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=${month}`;

let slideCount = 0;

getMovies(API_PREMIERES);

async function getMovies(url) {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
    });
    const respData = await resp.json();
    premieres(respData,slideCount);
    
};

// ==== показ блока премьеры =====

function premieres(data,count) {
    const moviesEl = document.querySelector(".premier__block");
  
    moviesEl.innerHTML = "";

    data.items.forEach((movie, index) => {
        if (index > count && index < (count+6)) {
            const movieEl = document.createElement("div");
            movieEl.classList.add("premier_movie");
            movieEl.classList.add("premier_img");
            movieEl.innerHTML = `
                <div  class="premier_card">
                  <div class="premier__cover--inner">
                      <img src='${movie.posterUrlPreview}' alt="${movie.nameRu}" class="premier__cover">
                      <div class="premier__cover--darkened" data-id="${movie.filmId}"></div>
                  </div>
                  <div class="premier__info">
                      <div class="premier__info_title">${movie.nameRu}</div>
                      <div class="premier__category">${movie.year}, ${movie.genres.map((genre, index) => {
                        if (index < 2) {
                          return `${genre.genre}`;
                            }
                        })}
                      </div>
                       
                    </div>
                </div>
                `;
            moviesEl.appendChild(movieEl); 
      }     
    });
    if (slideCount == 0) {
        prevBtn.classList.add('btn_hide');
    } else {
        prevBtn.classList.remove('btn_hide');
        prevBtn.classList.add('btn_show');
    }
};

const nextBtn = document.querySelector('.premier__btn_next');
const prevBtn = document.querySelector('.premier__btn_prev');

//прокрутка блока премьер
nextBtn.addEventListener('click', () => {
    slideCount += 3;
    getMovies(API_PREMIERES);
});

prevBtn.addEventListener('click', () => { 
    --slideCount;
    getMovies(API_PREMIERES);
    if (slideCount == 0) {
        prevBtn.classList.remove('btn_show');
        prevBtn.classList.add('btn_hide');
    }
    console.log(slideCount);
});






// //====================popup==================




    


    



