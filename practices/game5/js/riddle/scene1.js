// hands
var x_finger = 630, y_finger = 520;
const leftHand = [
	["rfvtgbRFVTGB45", { x: 655, y: 562, f: 'trotrai' }], // ngón trỏ trái
	["edcEDC3", { x: 620, y: 545, f: 'giuatrai' }],	// ngón giữa trái
	["wsxWSX2", { x: 584, y: 550, f: 'aptrai' }],	// ngón áp trái
	["qazQAZ1", { x: 550, y: 580, f: 'uttrai' }],	// ngón út trái
]
const rightHand = [
	["yhnujmYHNUJM67", { x: 810, y: 562, f: 'trophai' }],	// ngón trỏ phải
	["ik,IK8", { x: 845, y: 545, f: 'giuaphai' }],	// ngón giữa phải
	["ol.OL9", { x: 881, y: 550, f: 'apphai' }],	// ngón áp phải
	["p;/P0", { x: 912, y: 580, f: 'utphai' }],	// ngón út phải
]

// level
var condition_star1 = 4;
var condition_star2 = 7;
var condition_star3 = 8;

var listQuestion = []
var limit = 8;

var loop = 0;
var time = 120;

// value 1 = right, value 0 = wrong
var checkHeart = [
	{ x: 170, y: 390, value: -1},
	{ x: 240, y: 280, value: -1},
	{ x: 340, y: 190, value: -1},
	{ x: 460, y: 130, value: -1},
	{ x: 765, y: 130, value: -1},
	{ x: 990, y: 280, value: -1},
	{ x: 1070, y: 390, value: -1},
	{ x: 1105, y: 525, value: -1},
]

// options
var sound;
var sound_off;

class scene1 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}

	preload(){
		// background
		this.load.image('bg1','assets/background1.png');
		this.load.image('butterfly', 'assets/butterfly.png');
		
		// input
		this.load.image('input', 'assets/input.png');
		this.load.image('check', 'assets/check.png');

		// hint
		this.load.image('lightbulb0', 'assets/lightbulb0.png');
		this.load.image('lightbulb1', 'assets/lightbulb1.png');

		// question
		this.load.image('question', 'assets/question.png');
		this.load.image('microphone', 'assets/microphone.png')
		this.load.image('continue', 'assets/continue.png');

		// make list question
		while (listQuestion.length < limit) {
			var random = Math.floor(Math.random() * listriddle[level - 1].riddle.length)
			var riddle = listriddle[level - 1].riddle[random]
			if (listQuestion.includes(riddle) == false) {
				listQuestion.push(riddle)
			}
		}
		// image of answer
		this.load.image('imageAnswer', 'assets/' + listriddle[0].riddle[0].image);	
		this.load.image('wrongAnswer', 'assets/wrong_answer.png');	
		this.load.image('rightAnswer', 'assets/right_answer.png');	

		// hands
		this.load.image('hands', 'assets/hands.png');
		this.load.image('uttrai', 'assets/hands_uttrai.png');
		this.load.image('aptrai', 'assets/hands_aptrai.png');
		this.load.image('giuatrai', 'assets/hands_giuatrai.png');
		this.load.image('trotrai', 'assets/hands_trotrai.png');
		this.load.image('utphai', 'assets/hands_utphai.png');
		this.load.image('apphai', 'assets/hands_apphai.png');
		this.load.image('giuaphai', 'assets/hands_giuaphai.png');
		this.load.image('trophai', 'assets/hands_trophai.png');
		this.load.audio('typewriter', 'assets/typewriter.wav');


		// level
		this.load.image('levelballred', 'assets/ballred' + level + '.png');
		for (var i = 0; i <= 3; i++)
			this.load.image('levelstar' + i, 'assets/star' + i + '.png');

		// timer
		this.load.image('timer', 'assets/timer.png');

		// heart
		this.load.image('heart', 'assets/heart.png');
		this.load.image('wrong', 'assets/wrong.png');

		// options
		this.load.image('sound', 'assets/sound.png');
		this.load.image('sound-off', 'assets/sound-off.png')
	}

	create(){
		blazewarriorsstatusgame = false;
		number_star = 0;

		var voice_key = this.sound.add('typewriter');
		
		// background
		this.add.image(600, 350, 'bg1');
		this.add.image(900, 175, "butterfly");

		// sound
		sound = this.add.sprite(95, 200, 'sound').setInteractive();
		sound_off = this.add.sprite(95, 200, 'sound-off').setInteractive();
		sound_off.visible = false
		sound.on('pointerdown', function () { soundOff(sound, sound_off, music, this) }, this);
		sound_off.on('pointerdown', function () { soundOn(sound, sound_off, music, this) }, this);

		// add level
		this.levelGame = this.add.image(100, 80, 'levelballred');
		this.add.image(this.levelGame.x - 2, this.levelGame.y + 50, 'levelstar0');

		// add title question
		this.add.image(620, 250, "question");
		var micro = this.add.image(720, 250, "microphone").setInteractive();
		micro.on('pointerdown', () => {
			// voice
		});

		// add question
		var x_str = 620, y_str = 340;
		var question = listQuestion[loop].question.split(' /n ')
		this.questionText = []
		for (var i in question) {
			this.questionText.push(this.add.text(x_str, y_str, question[i], {fontSize:40, fontFamily: 'Candara', color:'#000000'}).setOrigin(0.5));
			y_str += 55;
		}

		// add hands
		this.imageHands = this.add.image(x_finger, y_finger, 'hands');

		// input
		this.add.image(580, 617, "input");
		this.answer = listQuestion[loop].answer
		
		// hint answer
		this.answerText = this.add.text(620, 650, this.answer, {fontSize:45, fontFamily: 'Candara', color:'pink'}).setOrigin(0.5);
		this.answerText.setAlpha(0.8);

		this.typedMessage = "";
		this.typedGameObject = this.add.text(620, 650, this.typedMessage, {fontSize:45, fontFamily: 'Candara', color:'red'}).setOrigin(0.5).setDepth(20);

		const keypressHandler = (e) => {
			this.answerText.visible = false;
			voice_key.play();
			
			if (e.key == 'Enter') {
				if (this.continue.visible) {
					if (loop < limit)
						this.scene.start('playGame');
					else
						this.scene.start('endGame');
				}
				else
					this.showResult()
			}
			else {
				this.typedMessage += e.key;
				// delete current hand
				this.imageHands.destroy();	
				// change color of hands
				for (i = 0; i < 4; i++) {
					if (leftHand[i][0].search(e.key) != -1) {
						this.imageHands = this.add.image(x_finger, y_finger, leftHand[i][1]['f']);
						break;
					}
					else if (rightHand[i][0].search(e.key) != -1) {
						this.imageHands = this.add.image(x_finger, y_finger, rightHand[i][1]['f']);
						break;
					}
				}
				// hide hint
				bulb1.visible = false;
				bulb0.visible = true;
			}
		}

		const keydownHandler = (e) => {
			// delete character when press "Backspace"
			if (e.key === "Backspace") {
				this.typedMessage = this.typedMessage.substr(0, this.typedMessage.length - 1)
			}
		}
		window.addEventListener("keypress", keypressHandler);
		window.addEventListener("keydown", keydownHandler);
		
		this.events.once("shutdown", () => {
			window.removeEventListener("keypress", keypressHandler);
			window.removeEventListener("keydown", keydownHandler);
		})

		// check answer in input
		this.checkButton = this.add.image(1100, 653, "check").setInteractive();

		// arrow means to move the next scene
		this.continue = this.add.sprite(640, 540, "continue").setInteractive();
		this.continue.visible = false;
		this.continue.on('pointerdown', function(){
			if (loop < limit)
				this.scene.start('playGame');
			else
				this.scene.start('endGame');
		}, this);

		// hint
		var bulb0 = this.add.image(148, 495, "lightbulb0").setInteractive();
		var bulb1 = this.add.image(148, 495, "lightbulb1").setInteractive();
		bulb1.visible = false;

		bulb0.on('pointerdown', () => {
			bulb0.visible = false;
			bulb1.visible = true;
			this.answerText.visible = true;
		});

		bulb1.on('pointerdown', () => {
			bulb1.visible = false;
			bulb0.visible = true;
			this.answerText.visible = false;
		});

		// heart
		var countRight = 0;
		for (var i = 0; i < limit; i++) {
			if (checkHeart[i].value == 1) { // right
				this.add.image(checkHeart[i].x, checkHeart[i].y, "heart")
				countRight += 1;
			}
			else if (checkHeart[i].value == 0) // wrong
				this.add.image(checkHeart[i].x, checkHeart[i].y, "wrong")
		}

		// set stars
		if (countRight > 0) {
			if (countRight <= condition_star1) {
				number_star = 1;
				this.add.image(this.levelGame.x - 2, this.levelGame.y + 50, 'levelstar1');
			}
			else if (countRight <= condition_star2) {
				number_star = 2;
				this.add.image(this.levelGame.x - 2, this.levelGame.y + 50, 'levelstar2');
			}
			else {
				number_star = 3;
				this.add.image(this.levelGame.x - 2, this.levelGame.y + 50, 'levelstar3');
			}
		}

		// 120 seconds	
		this.timer = this.add.image(625, 100, 'timer')	
		this.textTime = this.add.text(this.timer.x, this.timer.y, formatTime(time), { fontSize: '55px', fontFamily: 'Comic Sans MS', color: '#000000' }).setOrigin(0.5);
		// Each 1000 ms call onEvent
		var timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
		function formatTime(seconds){
			// Minutes
			var minutes = Math.floor(seconds/60);
			// Seconds
			var partInSeconds = seconds%60;
			// Adds left zeros to seconds
			partInSeconds = partInSeconds.toString().padStart(2,'0');
			// Returns formated time
			return `${minutes}:${partInSeconds}`;
		}	
		function onEvent() {
			if (time > 0) {
				time -= 1; // One second
				this.textTime.setText(formatTime(time));
			}
			else {
				time = 120;
				this.scene.start('endGame');
			}
		}
	}
	update() {	
		this.typedGameObject.setText(this.typedMessage)	

		// if input is not empty
		if (this.typedMessage != ''){
			this.checkButton.on("pointerdown", () => {
				this.showResult()
			})
		}
		else {
			this.answerText.visible = true;
		}
	}	

	showResult () {
		// hide question
		for (var i in this.questionText)
			this.questionText[i].destroy()
		
		// hide answer
		this.answerText.destroy();

		// hide hand
		this.imageHands.destroy();
		
		// show arrow
		this.continue.visible = true;
		if (this.typedMessage === this.answer) {
			this.typedMessage = '';
			// show image of answer
			this.add.image(600, 400, 'rightAnswer')
			checkHeart[loop].value = 1;
		}
		else if (this.typedMessage !== this.answer && this.typedMessage != ''){
			this.add.image(610, 400, 'wrongAnswer').setScale(1.2)
			this.typedMessage = '';
			checkHeart[loop].value = 0;
		}
		
		loop += 1;
	}
}