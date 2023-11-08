var blazewarriorsstatusgame = false;
var number_star;

const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
tryAgainBtn = document.querySelector(".content button"),
timeTag = document.querySelector(".time span b"),
mistakeTag = document.querySelector(".mistake span"),
wpmTag = document.querySelector(".wpm span"),
cpmTag = document.querySelector(".cpm span");

wpmResult = document.querySelector(".wpm_result span");
cpmResult = document.querySelector(".cpm_result span");
mistakeResult = document.querySelector(".mistake_result span");

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

var canvas = document.getElementById('gamezone');
var context = canvas.getContext('2d');
var hinhSao3 = new Image();
var hinhSao2 = new Image();
var hinhSao1 = new Image();
var hinhNen = new Image();
hinhSao3.src = "3star.png";
hinhSao2.src = "2star.png";
hinhSao1.src = "1star.png";
hinhNen.src = "bg-end.png";

let timer,
maxTime = 300,
timeLeft = maxTime,
charIndex = mistakes = isTyping = 0;

function togglePopup(){
    document.getElementById("popup-1").classList.toggle("active");
}

function tutorial_click(){
    var story = document.getElementById("story2");
    var btn2 = document.getElementById("btn2");
    if (story.style.display === "none") {
        story.style.display = "inline-block";
        btn2.style.display = "block";
    } else {
        story.style.display = "none";
        btn2.style.display = "none";
    }
}

function tutorial_click1(){
    var story = document.getElementById("story3");
    var btn3 = document.getElementById("btn3");
    if (story.style.display === "none") {
        story.style.display = "inline-block";
        btn3.style.display = "block";
    } else {
        story.style.display = "none";
        btn3.style.display = "none";
    }
}

function tutorial_click2(){
    var story = document.getElementById("story4");
    var btn4 = document.getElementById("btn4");
    if (story.style.display === "none") {
        story.style.display = "inline-block";
        btn4.style.display = "block";
    } else {
        story.style.display = "none";
        btn4.style.display = "none";
    }
}

function tutorial_click3(){
    var story1 = document.getElementById("story1");
    var story2 = document.getElementById("story2");
    var story3 = document.getElementById("story3");
    var story4 = document.getElementById("story4");
    var bgn = document.getElementById("bgn");

    var btn1 = document.getElementById("btn1");
    var btn2 = document.getElementById("btn2");
    var btn3 = document.getElementById("btn3");
    var btn4 = document.getElementById("btn4");

    if (bgn.style.display === "none") {

        bgn.style.display = "block";

        story2.style.display = "none";
        story3.style.display = "none";
        story4.style.display = "none";
        story1.style.display = "none";

        btn1.style.display = "none";
        btn2.style.display = "none";
        btn3.style.display = "none";
        btn4.style.display = "none";

    } else{

        bgn.style.display = "none";

        story1.style.display = "inline-block";
        btn1.style.display = "inline-block";
    }
}

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal){
    if(modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal){
    if(modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

function loadtitle(){
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    paragraphs[ranIndex].title;
}

const ranIndex = Math.floor(Math.random() * paragraphs.length);
function loadParagraph() {
    typingText.innerHTML = "";
    let title =  paragraphs[ranIndex].title;
    
    typingText.innerHTML += `<p><center>${title}</center></p>`
    paragraphs[ranIndex].content.split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}
let wpm;
function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if(charIndex < characters.length - 1 && timeLeft > 0) {
        if(!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if(typedChar == null) {
            if(charIndex > 0) {
                charIndex--;
                if(characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if(characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");
                
        wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        wpmResult.innerText = wpm;
        
        mistakeTag.innerText = mistakes;
        mistakeResult.innerText = mistakes;

        cpmTag.innerText = charIndex - mistakes;
        cpmResult.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }   
}

function initTimer() {
    level();
    if(timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        if(timeLeft == 0){
            
            if(modal == null) return
            modal.classList.add('active')
            overlay.classList.add('active')
        }

    } else {
        clearInterval(timer);
    }
}

function level() {
    if(timeLeft == 1)
        blazewarriorsstatusgame = true;
        {    if(wpm >= 40){
                number_star = 3
                context.drawImage(hinhSao3,0,0, 400,170);
            }
            else if(wpm < 40 && wpm >= 30) {
                number_star = 2
                context.drawImage(hinhSao2,0,0, 400,170);
            }
            else if(wpm < 30){
                number_star = 1
                context.drawImage(hinhSao1, 90, 40, 200, 137);
            }            
        }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    wpmResult.innerText = 0;
    mistakeResult.innerText = 0;
    cpmResult.innerText = 0;
    context.drawImage(hinhNen, 398, 127, 400, 170, 0,0,400,170);
    blazewarriorsstatusgame = false;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);

//option
const settingOption = document.getElementById('optionBtn');
const menuSlideElt = document.getElementById('menuSlide');

// settingOption.addEventListener('click', function(){
//     menuSlideElt.classList.toggle("slideIn");
// });