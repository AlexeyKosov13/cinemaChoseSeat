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






//проверка на поддержку webp
// function testWebP(callback) {

//     var webP = new Image();
//     webP.onload = webP.onerror = function () {
//     callback(webP.height == 2);
//     };
//     webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
//     }
    
//     testWebP(function (support) {
    
//     if (support == true) {
//     document.querySelector('body').classList.add('webp');
//     }else{
//     document.querySelector('body').classList.add('no-webp');
//     }
//     });

// window.onload = function () {
//     document.addEventListener('click', documentActions);

//     function documentActions(a) {
//         const targetElement = a.target;
//         if (window.innerWidth > 768 && isMobile.any()) {
//             if (targetElement.classList.contains('menu_arrow')) {
//                 targetElement.closest('.menu_item').classList.toggle('_hover');
//             }
//             if (!targetElement.closest('.menu_item') && document.querySelectorAll('.menu_item._hover').length > 0) {
//                 _removeClasses(document.querySelectorAll('.menu_item._hover'), '_hover');
//             }
    
//         }
//         if (targetElement.classList.contains('search-form_icon')) {
//             document.querySelector('.search_form').classList.toggle('_active');
//         }
//     }
// }

// //====================popup==================
// let modal = document.querySelector('.modalWindow');
// let img = document.querySelectorAll('.popup_img');
// let close = document.querySelector('.close');
// let popup = document.querySelector('.popup');

// for (let i = 0; i < img.length; i++) {
//     img[i].addEventListener('click', function(){
//         modal.style.display = 'block';
//         popup.src = this.id;
//     });  
// }
// close.onclick = function () {
//     modal.style.display = 'none';
// }
// window.onclick = function(event) {
//     if (event.target == modal) {
//       modal.style.display = "none";
//     }
// }
  
// //===========================

// //=======yadex_maps=========

// ymaps.ready(init);
//     function init(){
//         var myMap = new ymaps.Map("map", {
//             center: [55.76, 37.64],
//             zoom: 7,
//             controls: ['zoomControl'],
//             behaviors: ['drag']
//         });
//        //============ IconPlacemark ===============
       
//     //    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
//     //     '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
//     // ),

    


//         //============ geoObject ==================
//         var myadress = document.querySelector('.myadress').innerHTML;
//         console.log(myadress);
//         ymaps.geocode(myadress, {
//             results: 1
//         }).then(function (res) {        
//                 var firstGeoObject = res.geoObjects.get(0),        
//                     coords = firstGeoObject.geometry.getCoordinates(),       
//                     bounds = firstGeoObject.properties.get('boundedBy');
//                 firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
//                 firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());
//             myPlacemark = new ymaps.Placemark(firstGeoObject.geometry.getCoordinates(), {
//                 hintContent: 'Собственный значок метки',
//                 balloonContent: 'Это красивая метка'
//             }, { 
//                 iconLayout: 'default#image',
//                 iconImageHref: '../img/baloon.png',
//                 iconImageSize: [60, 60],
//                 iconImageOffset: [-40, -38]
//             }),
//             myMap.geoObjects
//                 .add(myPlacemark);

//                 myMap.setBounds(bounds, { 
//                     checkZoomRange: true
//                 });
//         });
        
        
// }
    



