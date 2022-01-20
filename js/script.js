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

const swiper = new Swiper('.swiper', {
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    autoplay: {
        delay: 3000,
      },
    
  
    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
    // And if we need scrollbar
    scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true
    },
  });


//================================

//========== API kinopoisk=========

const API_KEY = "e6a4b61f-9c7a-4d61-a717-91be7d5b71b7";

const today = new Date();
const month = (today.toLocaleString('en-US', { month: 'long' })).toUpperCase();

const year = today.getFullYear();
const API_PREMIERES = `https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2022&month=${month}`;
let premierBlock = document.querySelector('.premier__block');
let premierWrapper = document.querySelector('.premier__wrapper');
const width = window.getComputedStyle(premierBlock).width;
let movieIndex = 1;
let offset = 0;

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
    premieres(respData,movieIndex);
};

// ==== показ блока премьеры =====

function premieres(data,count) {
    const moviesEl = document.querySelector(".premier__block");
  
    moviesEl.innerHTML = "";

    data.items.forEach((movie, index) => {
        
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
    });
    if (offset == 0) {
        prevBtn.classList.add('btn_hide');
    } else {
        prevBtn.classList.remove('btn_hide');
        prevBtn.classList.add('btn_show');
    }
};

function deleteNotDigits(str) {
    return +str.replace(/\D/g, '');
};

const nextBtn = document.querySelector('.premier__btn_next');
const prevBtn = document.querySelector('.premier__btn_prev');

//прокрутка блока премьер
nextBtn.addEventListener('click', () => {
    offset += 200;
    premierBlock.style.transform = `translateX(-${offset}px)`;
    if (offset == 0) {
        prevBtn.classList.remove('btn_show');
        prevBtn.classList.add('btn_hide');
    } else {
        prevBtn.classList.remove('btn_hide');
        prevBtn.classList.add('btn_show');
    }
    console.log(offset);
});

prevBtn.addEventListener('click', () => { 
    offset -= 200;
    premierBlock.style.transform = `translateX(-${offset}px)`;

    if (offset == 0) {
        prevBtn.classList.remove('btn_show');
        prevBtn.classList.add('btn_hide');
    }
    console.log(offset);
});


//==========api news ===============

// const API_KEY_NEWS = '76462a645a464a579a6272a4d1ac0fd2';
// const API_NEWS = 'https://newsapi.org/v2/top-headlines?country=ru&category=entertainment&apiKey=';

// getNews(API_NEWS + API_KEY_NEWS);

// async function getNews(url) {
//     const resp = await fetch(url, {
//       method: "GET",
//       headers: {
//         "X-API-KEY": API_KEY_NEWS,
//         "Content-Type": "application/json",
//       },
//     });
//     const respData = await resp.json();
//     console.log(respData);
// };





//===================swipe===============


const sensitivity = 20;



var touchStart = null; //Точка начала касания
var touchPosition = null; //Текущая позиция

//Перехватываем события
premierBlock.addEventListener("touchstart", function (e) { TouchStart(e); }); //Начало касания
premierBlock.addEventListener("touchmove", function (e) { TouchMove(e); }); //Движение пальцем по экрану
//Пользователь отпустил экран
premierBlock.addEventListener("touchend", function (e) { TouchEnd(e, "green"); });
//Отмена касания
premierBlock.addEventListener("touchcancel", function (e) { TouchEnd(e, "red"); });

function TouchStart(e)
{
    //Получаем текущую позицию касания
    touchStart = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    touchPosition = { x: touchStart.x, y: touchStart.y };

    
}

function TouchMove(e)
{
    //Получаем новую позицию
    touchPosition = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };

   
}

function TouchEnd(e, color)
{
    

    CheckAction(); //Определяем, какой жест совершил пользователь

    //Очищаем позиции
    touchStart = null;
    touchPosition = null;
}

function CheckAction()
{
    var d = //Получаем расстояния от начальной до конечной точек по обеим осям
    {
   	 x: touchStart.x - touchPosition.x,
   	 y: touchStart.y - touchPosition.y
    };

    let msg = ""; //Сообщение

    if(Math.abs(d.x) > Math.abs(d.y)) //Проверяем, движение по какой оси было длиннее
    {
   	 if(Math.abs(d.x) > sensitivity) //Проверяем, было ли движение достаточно длинным
   	 {
   		 if(d.x > 0) //Если значение больше нуля, значит пользователь двигал пальцем справа налево
   		 {
            msg = "Swipe Left";
            offset += 400;
            premierBlock.style.transform = `translateX(-${offset}px)`;    
   		 }
   		 else //Иначе он двигал им слева направо
   		 {
            msg = "Swipe Right";
            offset -= 400;
            premierBlock.style.transform = `translateX(-${offset}px)`;
   		 }
   	 }
    }
    else //Аналогичные проверки для вертикальной оси
    {
   	 if(Math.abs(d.y) > sensitivity)
   	 {
   		 if(d.y > 0) //Свайп вверх
   		 {
   			 msg = "Swipe up";
   		 }
   		 else //Свайп вниз
   		 {
   			 msg = "Swipe down";
   		 }
   	 }
    }

    console.log(msg);

}



    



