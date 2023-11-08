var blazewarriorsstatusgame = false;
var own_badge = false;
window.addEventListener('load', init);

// Globlas

// Available Levels
const levels = {
    easy: 10,
    medium: 3,
    hard: 2
}

// To change level
let currentLevel = levels.easy;

let time = currentLevel;
var score = 0;
var sumTime = 0;
let isPlaying;
// let maxScore;


// DOM Elements
const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#show-score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');
// const highScoreElt = document.querySelector('#high-score');
// const easyBtn = document.querySelector('#easy');
// const mediumBtn = document.querySelector('#medium');
// const hardBtn = document.querySelector('#hard');
const endgame = document.querySelector('#end-game');

// 15 words
const words = [
    'Hello', 'Good morning', 'Good afternoon', 'Good evening', 'Good night', 'Good bye', 'Thank you', 'Easy going',
    'Ambitious', 'Imaginative', 'Aggressive', 'Unpleasant', 'Humorous', 'Childish', 'Hardworking'
];
var index_word = 0;

//option
const settingOption = document.getElementById('optionBtn');
const menuSlideElt = document.getElementById('menuSlide');

settingOption.addEventListener('click', function(){
    menuSlideElt.classList.toggle("slideIn");
});


// Seclect level
// function setlevel(e){
//     if(e.target === easyBtn){
//         currentLevel = levels.easy;
//     }else if(e.target === mediumBtn){
//         currentLevel = levels.medium;
//     }else if(e.target === hardBtn){
//         currentLevel = levels.hard;
//     }
//     console.log(currentLevel);
//     init();
// }

// Initialize Game
function init(){
    endgame.style.display = "none"
    // Show number of sec in UI
    seconds.innerHTML = currentLevel;
    // Load word from array
    showWord(words);
    // Start matching on word input
    wordInput.value = '';
    wordInput.addEventListener('input', startMatch);
    // Call countdown every second
    setInterval(countdown, 1000);
    // Check game status
    setInterval(checkStatus, 50);
    // maxScore = localStorage.getItem('highScore');
    // maxScore = 0;
    // highScoreElt.innerHTML = maxScore;
}

//Start match
function startMatch(){
    // wordInput.value = wordInput.value.toLowerCase();
    // console.log('input', wordInput.value)

    if(matchWords()){
        // console.log('match', wordInput.value)

        isPlaying = true;
        sumTime += (currentLevel - time);
        var thisTime = time
        time = currentLevel + 1;

        index_word += 1;
        if (index_word == words.length) {
            own_badge = true;
            endGame()
        }
        else {
            showWord(words);
            wordInput.value = '';
        }

        score += 100 + thisTime*10;
    }

    // If score is -1 display zero
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    }else{
        scoreDisplay.innerHTML = score;
        // highScoreElt.innerHTML = score;
        
        // if(score >= maxScore){
        //     localStorage.setItem('highScore',score);
        // }
    }
    // maxScore = localStorage.getItem('highScore');
    scoreDisplay.innerHTML = score;
    // highScoreElt.innerHTML = maxScore;
}

// Match currentWord to wordInput
function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        message.innerHTML = ' Tuyệt vời ️🎊 ';
        wordInput.value = '';
        return true;
    }
    else{
        message.innerHTML = ' Cố lên 👏';
        return false;
    }
}

// Pick and show random word
function showWord(word){
    // Generate random array index
    // const randIndex = Math.floor(Math.random() * words.length);
    // Output random word
    currentWord.innerHTML = words[index_word];
}
// Countdown timer

function countdown(){
    // Make sure time is not runout
    if(time > 0){
        // decrement
        time--;
    }else if(time === 0){
        // Game is over
        isPlaying = false;
    }
    // Show time
    timeDisplay.innerHTML = time;
}

// Check game status
function checkStatus(){
    if(!isPlaying && time === 0){
        message.innerHTML = 'Hết thời gian ✋';
        // score = -1;
        endGame()
    }
}

function endGame(){
    wordInput.disabled = true;
    endgame.style.display = "block";

    blazewarriorsstatusgame = true;
}

// easyBtn.addEventListener('click', setlevel);
// mediumBtn.addEventListener('click', setlevel);
// hardBtn.addEventListener('click', setlevel);