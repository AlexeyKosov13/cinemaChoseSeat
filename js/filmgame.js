const quizData = [
    {
        img: '/img/1.jpg',
        img2: '/img/11.jpg',    
        a: "Молчание ягнят",
        b: "Зеленая миля",
        c: "Побег из Шоушенка",
        correct: "b",
    },
    {
        img: '/img/2.jpg',
        img2: '/img/22.jpg',
        a: "Карты, деньги, два ствола",
        b: "Достучаться до небес",
        c: "Большой куш",
        correct: "a",
    },
    {
        img: '/img/3.jpg',
        img2: '/img/33.jpg',  
        a: "Техасская резня бензопилой",
        b: "Ночь в музее",
        c: "Остров проклятых",
        correct: "c",
    },
    {
        img: '/img/4.jpg',
        img2: '/img/44.jpg',   
        a: "Назад в будущее 1",
        b: "Назад в будущее 2",
        c: "Назад в будущее 3",
        correct: "b",
    },
    {
        img: '/img/5.jpg',
        img2: '/img/55.jpg', 
        a: "Одержимость",
        b: "Социальная сеть",
        c: "Человек-паук",
        correct: "a",
    },
];

// class Movie {
//     constructor(img,img2,a,b,c,correct){
//         this.img = img,
//         this.img2 = img2,
//         this.a - a,
//         this.b = b,
//         this.c = c,
//         this.correct = correct,
//     }
// }


const quiz = document.getElementById('quiz');
const answerElements = document.querySelectorAll('.answer');
const timer = document.getElementById('timer');
const submit = document.getElementById('submit');
const img = document.querySelector('.question-img');
const helpTime = document.getElementById('more-time');
const helpPic = document.getElementById('more-pic');
const helpNext = document.getElementById('next-question');
const game = document.querySelector('.start-game');
const gameWrapper = document.querySelector('.quiz-start');
const answerParent = document.querySelector('.answer-block');
const btnAnswer = document.querySelectorAll('.btn-answer');
const tableBox = document.querySelector('.table-top');
const nameGamer = document.querySelector('.start-name');
const listGamer = document.querySelector('.listGamer');
const btnTable = document.querySelector('.btn-table');
const result = document.querySelector('.result');
let li = document.createElement('div');

let currentQuiz = 0;
let score = 0;
let timerEnd;
let timeEnd;
let currentQuizData;

game.addEventListener('click', startGame);

function startGame() {
    let gamer = nameGamer.value;
    localStorage.setItem(gamer, 0);
    gameWrapper.classList.add('quiz-start-hide');
    quiz.style.display = 'block';
    loadQuiz();

    function loadQuiz() {
        timeEnd = 300;
        //deselectAnswers();
        //получаем обьект из массива
        currentQuizData = quizData[currentQuiz];
        // из обьекта выводим на экран
        img.innerHTML =`<img src="${currentQuizData.img}">`;
        btnAnswer.forEach((btn, i) => {
            let arr = ['a','b','c'];
            btn.innerText = currentQuizData[arr[i]];
        });
        timerEnd = setInterval(updateTime, 1000);
        
        function updateTime() {
            timeEnd--;
            timer.innerText = timeEnd;
            if (timeEnd > 0 && timeEnd < 10) {
                timer.style.color = 'red';
            }
            if (timeEnd <= 0) {
                clearInterval(timerEnd);
                quiz.innerHTML = `<h2>Время вышло, Вы ответили на ${score}/${quizData.length} вопросов</h2>
                <button onclick="location.reload()">Заново</button>
                `;
            }
        }   
    };
    
     //подсказка добавление времени
     function addTime() {
        timeEnd += 15;
        helpTime.style.backgroundColor = '#438faa';
        helpTime.removeEventListener('click', addTime);
    };
    
    // подсказка еще один кадр
    function addPic() {
        img.innerHTML = `<img src="${currentQuizData.img2}">`;
        helpPic.style.backgroundColor = '#438faa';
        helpPic.removeEventListener('click', addPic);
    };
    
    // смена вопроса
    function getNextQuestion() {       
        if (currentQuiz == quizData.length-1) {
            clearInterval(timerEnd);
            helpNext.style.backgroundColor = '#438faa';
            helpNext.removeEventListener('click', getNextQuestion);
        } else {
            clearInterval(timerEnd);
            currentQuiz++;
            loadQuiz();
            helpNext.style.backgroundColor = '#438faa';
            helpNext.removeEventListener('click', getNextQuestion);
        }      
    };
    
    helpTime.addEventListener('click', addTime);
    helpPic.addEventListener('click', addPic);
    helpNext.addEventListener('click', getNextQuestion);
    
   
    btnAnswer.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let answer = e.target.id;
            console.log(answer);
            if (answer) {
                // если строка совпадает со значением ключа correct прибавляем очки score
                if (answer === quizData[currentQuiz].correct) {
                    score++;
                }
                // берем следующий массив
                currentQuiz++;
                clearInterval(timerEnd);
                timer.style.color = 'Black';
                if (currentQuiz < quizData.length) {
                    loadQuiz();
                }
                else {
                    quiz.style.display = 'none';
                    tableBox.style.display = 'flex';
                    result.innerHTML = `Вы ответили на ${score}/${quizData.length} вопросов`;
                    tableBox.innerHTML += `<button onclick="location.reload()" class = "btn-againGame">Играть еще</button>`;
                    localStorage.setItem(gamer, score);
                    
                    let keys = Object.keys(localStorage);
                    console.log(keys);
                    keys.forEach((key, i) => {
                        if (i < 5) {
                            li.innerHTML += (`${key}: ${localStorage.getItem(key)}<br>`);
                        } else {
                            return;
                        }
                    });
                    listGamer.style.display = 'flex';
                    listGamer.append(li);
                    
                };
            };
        });
        });
       

        


  
};

