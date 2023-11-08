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
// var n_stars;

// song
var song;
var question;
var questionText = [];
var answered = []; // default -1; right 1; wrong 0
var limit;
var loop = 0; 
var time = 120;

var checkEnter = false;

// options
var sound;
var sound_off;

class scene1 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}

	preload(){
		// background
		this.load.image('bg2','assets/background2.png');
		this.load.image('butterfly', 'assets/butterfly.png');
		
		// input
		this.load.image('input', 'assets/input.png');
		this.load.image('check', 'assets/check.png');

		// question
		this.load.image('question', 'assets/question.png');
		this.load.image('microphone', 'assets/microphone.png')

		// answer	
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

		// level
		this.load.image('levelballred', 'assets/ballred' + level + '.png');
		for (var i = 0; i <= 3; i++)
			this.load.image('levelstar' + i, 'assets/star' + i + '.png');
		this.load.image('levelball', 'assets/ball' + '.png');

		// timer
		this.load.image('timer', 'assets/timer.png');

		// heart
		this.load.image('heart', 'assets/heart.png');
		this.load.image('wrong', 'assets/wrong.png');
		this.load.image('tickWrong', 'assets/tickWrong.png');
		this.load.image('tickRight', 'assets/tickRight.png');

		// options
		this.load.image('sound', 'assets/sound.png');
		this.load.image('sound-off', 'assets/sound-off.png')
	}

	create(){
		blazewarriorsstatusgame = false;
		number_star = 0;
		
		// background
		this.add.image(600, 350, 'bg2');
		this.add.image(1000, 100, "butterfly");

		// sound
		sound = this.add.sprite(95, 200, 'sound').setInteractive();
		sound_off = this.add.sprite(95, 200, 'sound-off').setInteractive();
		sound_off.visible = false
		sound.on('pointerdown', function () { soundOff(sound, sound_off, music, this) }, this);
		sound_off.on('pointerdown', function () { soundOn(sound, sound_off, music, this) }, this);

		// add level
		this.levelGame = this.add.image(100, 80, 'levelball');
		this.add.text(this.levelGame.x - 5, this.levelGame.y - 5, level, {fontSize:80, fontFamily: 'Comic Sans', color:'#ffffff'}).setOrigin(0.5);
		this.add.image(this.levelGame.x - 2, this.levelGame.y + 50, 'levelstar0');

		// add title question
		// this.add.image(620, 250, "question");
		// var micro = this.add.image(720, 250, "microphone").setInteractive();
		// micro.on('pointerdown', () => {
		// 	// voice
		// });

		// add song
		var x_str = 620, y_str = 200;
		if (loop == 0) {
			song = listSong[level - 4].content;
			question = song.split(' /n ');
			limit = question.length;
			for (var i in question)
				answered.push(-1);
		}

		var countRight = 0;
		questionText = []
		for (var i in question) {
			if (answered[i] == -1) {
				questionText.push(this.add.text(x_str, y_str, question[i], {fontSize:40, fontFamily: 'Candara', color:'#000000'}).setOrigin(0.5));
			}
			else if (answered[i] == 1) {
				questionText.push(this.add.text(x_str, y_str, question[i], {fontSize:40, fontFamily: 'Candara', color:'green'}).setOrigin(0.5));
				this.add.image(level != 6 ? questionText[i].x + 240 : questionText[i].x + 350, questionText[i].y, 'tickRight')
				countRight += 1;
			}
			else {
				questionText.push(this.add.text(x_str, y_str, question[i], {fontSize:40, fontFamily: 'Candara', color:'red'}).setOrigin(0.5));
				this.add.image(level != 6 ? questionText[i].x + 240 : questionText[i].x + 350, questionText[i].y, 'tickWrong')
			}
			y_str += 55;
		}

		// set stars
		var question_length = question.length
		var condition_star1 = parseInt(question_length * 1/3);
		var condition_star2 = question.length - 2;
		// var condition_star2 = parseInt(question_length * 2/3);
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

		// add hands
		this.imageHands = this.add.image(x_finger, y_finger, 'hands');

		// input
		this.add.image(580, 617, "input");
		this.answer = question[loop]
		
		// hint answer
		this.answerText = this.add.text(620, 650, this.answer, {fontSize:45, fontFamily: 'Candara', color:'pink'}).setOrigin(0.5);
		this.answerText.setAlpha(0.8);

		this.typedMessage = "";
		this.typedGameObject = this.add.text(620, 650, this.typedMessage, {fontSize:45, fontFamily: 'Candara', color:'red'}).setOrigin(0.5).setDepth(20);
		
		const keypressHandler = (e) => {
			this.answerText.visible = false;
			if (e.key == 'Enter') {
				checkEnter = true;
				if (this.typedMessage != '') {
					this.showResult()
				}	
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
		// console.log(this.answer)
	}
	update() {	
		if (this.typedMessage != '')
			this.typedGameObject.setText(this.typedMessage)	
	}	

	showResult () {
		if (this.typedMessage === this.answer) {
			this.typedMessage = "";
			answered[loop] = 1;
		}
		else if (this.typedMessage !== this.answer && this.typedMessage != ""){
			this.typedMessage = "";
			answered[loop] = 0;
		}
		loop += 1;
		if (loop < limit)
			this.scene.start('playGame');
		else {
			this.scene.start('endGame');
		}
	}
}