var characters
var countloop1 = 0;
var list_char1 = '';
var counttrue1 = 0;
var countfalse1 = 0;
let gameOptions = {
	initialTime: 6,
}

const leftHand = [
	["rfvtgbRFVTGB45", {x : 655, y : 562, f: 'trotrai'}], // ngón trỏ trái
	["edcEDC3", {x : 620, y : 545, f: 'giuatrai'}],	// ngón giữa trái
	["wsxWSX2", {x : 584, y : 550, f: 'aptrai'}],	// ngón áp trái
	["qazQAZ1", {x : 550, y : 580, f: 'uttrai'}],	// ngón út trái
]
const rightHand = [
	["yhnujmYHNUJM67", {x : 810, y : 562, f: 'trophai'}],	// ngón trỏ phải
	["ik,IK8", {x : 845, y : 545, f: 'giuaphai'}],	// ngón giữa phải
	["ol.OL9", {x : 881, y : 550, f: 'apphai'}],	// ngón áp phải
	["p;/P0", {x : 912, y : 580, f: 'utphai'}],	// ngón út phải
]

class scene2 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}
	preload(){
		// background
		this.load.image('bg2','assets/background2.png'); 
		this.load.image('bg3','assets/background3.png'); 
		this.load.image('bg4','assets/background4.png'); 
		this.load.image('sun','assets/sun.png'); 
		this.load.image('moon','assets/moon.png'); 
		this.load.image('clouds','assets/clouds.png'); 

		// flower
		this.load.image('flower_white','assets/flower_white.png'); 
		this.load.image('flower_red','assets/flower_red.png'); 
		this.load.image('flower_green','assets/flower_green.png'); 
		this.load.image('flower_blue','assets/flower_blue.png'); 
		this.load.audio('voice_flower', 'assets/typewriter.wav');
		this.load.audio('wrong_key', 'assets/wrongkey.wav');

		// hands and beefinger
		this.load.image('beefinger','assets/bee_finger.png'); 
		this.load.image('hands','assets/hands.png'); 
		this.load.image('uttrai','assets/hands_uttrai.png');
		this.load.image('aptrai','assets/hands_aptrai.png');
		this.load.image('giuatrai','assets/hands_giuatrai.png');
		this.load.image('trotrai','assets/hands_trotrai.png');
		this.load.image('utphai','assets/hands_utphai.png');
		this.load.image('apphai','assets/hands_apphai.png');
		this.load.image('giuaphai','assets/hands_giuaphai.png');
		this.load.image('trophai','assets/hands_trophai.png');

		// timebar
		this.load.image('bee','assets/bee.png');
		this.load.image('energycontainer','assets/timebar.png');
		this.load.image('energybar','assets/energybar.png');

		// level
		this.load.image('levelballred', 'assets/ballred.png');
		this.load.image('levelstar0','assets/star0.png');
		for (var i = 1; i <= 3; i++) {
			this.load.image('levelstar' + i, 'assets/star' + i + '.png');
		}

		// options
		this.load.image('sound', 'assets/sound.png');
		this.load.image('sound-off', 'assets/sound-off.png')

		// count true, count false
		this.load.image('true','assets/true.png'); 
		this.load.image('false','assets/false.png'); 
	}
	create(){    
		blazewarriorsstatusgame = false;
		number_star = 0;

		// add voice of flower
		var voice_flower = this.sound.add('voice_flower');
		var wrong_key = this.sound.add('wrong_key');

		// set times, limit_loop, list characters, background based on level
		var name_bg1 = '';
		var name_bg2 = '';
		if (level == 'level1' || level == 'level2') {
			characters = list_characters.hanggiua
			name_bg1 = 'bg2'
			name_bg2 = 'sun'
			gameOptions.initialTime = (level == 'level1' ? 6 : 5)
			this.limit = 20
		}
		else if (level == 'level3' || level == 'level4'){
			characters = list_characters.hangtren
			name_bg1 = 'bg3'
			name_bg2 = 'sun'
			gameOptions.initialTime = (level == 'level3' ? 6 : 5)
			this.limit = 20
		}
		else if (level == 'level5' || level == 'level6'){
			characters = list_characters.hangduoi
			name_bg1 = 'bg4'
			name_bg2 = 'moon'
			gameOptions.initialTime = (level == 'level5' ? 6 : 5)
			this.limit = 20
		}
		else if (level == 'level7'){
			characters = list_characters.hanggiua + list_characters.hangtren
			name_bg1 = 'bg2'
			name_bg2 = 'sun'
			gameOptions.initialTime = 5
			this.limit = 30
		}
		else if (level == 'level8'){
			characters = list_characters.hanggiua + list_characters.hangduoi
			name_bg1 = 'bg2'
			name_bg2 = 'sun'
			gameOptions.initialTime = 5
			this.limit = 30
		}
		else if (level == 'level9'){
			characters = list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren
			name_bg1 = 'bg3'
			name_bg2 = 'sun'
			gameOptions.initialTime = 5
			this.limit = 36
		}
		else if (level == 'level10'){
			characters = list_characters.hangso
			name_bg1 = 'bg4'
			name_bg2 = 'moon'
			gameOptions.initialTime = 5
			this.limit = 20
		}
		else if (level == 'level11'){
			characters = list_characters.hangso + list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren
			name_bg1 = 'bg2'
			name_bg2 = 'sun'
			gameOptions.initialTime = 5
			this.limit = 40
		}
		else if (level == 'level12' || level == 'level13'){
			characters = (list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren).toUpperCase()
							+ list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren
			name_bg1 = 'bg3'
			name_bg2 = 'sun'
			gameOptions.initialTime = (level == 'level12' ? 5 : 4)
			this.limit = 40
		}
		else if (level == 'level14' || level == 'level15'){
			characters = (list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren).toUpperCase()
							+ list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren + list_characters.hangso
			name_bg1 = 'bg4'
			name_bg2 = 'sun'
			gameOptions.initialTime = (level == 'level14' ? 4 : 3)
			this.limit = 50
		}

		// add background
		this.add.image(600, 350, name_bg1);
		this.titleSprite =  this.add.tileSprite(600, 30, 1200, 350, 'clouds');
		var sun = this.add.image(1100, 80, name_bg2);
		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		function loops()
		{
			zoomOut(sun, 0.5, 1, 0.10, 10, this);
		}
		
		// set score
		this.trueText = this.add.text(25, 545, counttrue1.toString().length >= 2 ? counttrue1 : '0' + counttrue1, {fontSize: '60px', fontFamily: 'Comic Sans MS'});
		this.add.image(180, 580, 'true');

		// set false
		this.falseText = this.add.text(250, 545, countfalse1.toString().length >= 2 ? countfalse1 : '0' + countfalse1, {fontSize: '60px', fontFamily: 'Comic Sans MS'});
		this.add.image(390, 580, 'false');

		// add level
		this.levelGame = this.add.image(1100, 610, 'levelballred');
		this.add.text(this.levelGame.x, this.levelGame.y, level[level.length - 1], {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);
		this.add.image(this.levelGame.x - 2, this.levelGame.y + 55, 'levelstar0');

		this.add.text(410, 625, (countloop1 + 1) + '/' + this.limit, {fontSize: '40px', fontFamily: 'Comic Sans MS', color:'white'});

		// add hands
		var x_finger = 735, y_finger = 630;
		this.add.image(x_finger, y_finger, 'hands');

		// add and move beefinger
		var beefinger = this.add.image(500, 490, 'beefinger');
		beefinger.visible = false;
		const beePositions = new Map();
		for (let finger of leftHand) {
			finger[0].split("").forEach(k => {
				beePositions.set(k, finger[1])
			})
		}
		for (let finger of rightHand) {
			finger[0].split("").forEach(k => {
				beePositions.set(k, finger[1])
			})
		}
		const keypressHandler = (e) => {
			this.typedMessage += e.key;
			beefinger.visible = true;
			const position = beePositions.get(e.key);
			if (position) {
				beefinger.setPosition(position.x, position.y)
			}
		}
		window.addEventListener("keypress", keypressHandler);
		// window.addEventListener("keydown", keydownHandler);
		this.events.once("shutdown", () => {
			window.removeEventListener("keypress", keypressHandler);
			// window.removeEventListener("keydown", keydownHandler);
		})

		// set color of flower
		var flower = 'flower_' + (name_bg1 == 'bg2' ? 'red' : (name_bg1 == 'bg3' ? 'green': 'blue'));		// color of flower

		// set character on flowers
		list_char1 = '';
		var x_flower = 300, y_flower = 380;
		var flowersCallback = {};	
		var beeMoving = false;
		while(list_char1.length < 3) {
			var key = characters[Math.floor(Math.random() * characters.length)]
			if (list_char1.search(key)== -1) {
				list_char1 += key;
			}
		}

		for (var i = 0; i < 3; i++) {
			this.add.image(x_flower, y_flower, 'flower_white');
			const flower_true = this.add.image(x_flower, y_flower, flower);
			flower_true.visible = false;
			const char = this.add.text(x_flower, y_flower - 68, list_char1[i], {fontSize: '50px', fontFamily: 'Comic Sans MS', color: '#000000'}).setOrigin(0.5);;
			x_flower += 300;
			
			flowersCallback[list_char1[i]] = () => {
				if (!char) return;
				// console.log(char, "move bee")
				flower_true.visible = true;
				beeMoving = true;
				this.tweens.add({
					targets: [bee],
					x : char.x,
					y : char.y + 10,
					duration : 200,
					onComplete : () => {
						char.destroy();
						beeMoving = false;
					}
				})
			}	
		}
		// console.log(list_char1)

		// handle keydown
		this.input.keyboard.on('keydown', (event) => {
			// change color of hands
			for (i = 0; i < 4; i++)
				if (leftHand[i][0].search(event.key) != -1) {
					this.add.image(x_finger, y_finger, leftHand[i][1]['f']);
					break;
				}
				else if (rightHand[i][0].search(event.key) != -1) {
					this.add.image(x_finger, y_finger, rightHand[i][1]['f']);
					break;
				}
			const callback = flowersCallback[event.key];
			// console.log(beeMoving, callback)
			if (!beeMoving && callback) {
				callback();
				voice_flower.play()
				delete flowersCallback[event.key];
				counttrue1 += 1;
				this.trueText.setText(counttrue1.toString().length >= 2 ? counttrue1 : '0' + counttrue1);

				this.endTime1 = 4;
				// Each 100 ms call onEvent
				var timedEvent = this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, loop: true });	
				function onEvent () {
					if (this.endTime1 > 0) {
						this.endTime1 --;
					}
					else {
						bee.visible = false;
						bee = this.physics.add.sprite(bee.x, 100, 'bee');
					}
				}
			}
			
			if (event.key != 'Shift' && event.key != 'CapsLock' && list_char1.search(event.key) == -1) {
				wrong_key.play()
				countfalse1 += 1;
				this.falseText.setText(countfalse1.toString().length >= 2 ? countfalse1 : '0' + countfalse1);
			}
			list_char1 = list_char1.replace(event.key, '');
			if (list_char1 == '') {
				this.endTime = 1;
				// Each 100 ms call onEvent
				var timedEvent = this.time.addEvent({ delay: 100, callback: onEvent, callbackScope: this, loop: true });	
				function onEvent () {
					if (this.endTime > 0)
						this.endTime -= 1; // One second
					else {
						countloop1 = countloop1 + 1;
						if (countloop1 < this.limit)
							this.scene.start('playGame')
						else
							this.scene.start("endGame")
					}
				}
			}		
		})
		
		var bee = this.physics.add.sprite(100, 100, 'bee');

		// --set time 120s--
		// 1 countloop <=> 12s
		
		this.timeLeft = gameOptions.initialTime;
 
        // the energy container. A simple sprite
		let energyContainer = this.add.sprite(200, 650, "energycontainer");
 
        // the energy bar. Another simple sprite
        let energyBar = this.add.sprite(energyContainer.x + 25, energyContainer.y, "energybar");
 
        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask = this.add.sprite(energyBar.x, energyBar.y, "energybar");
 
        // ...it's not visible...
        this.energyMask.visible = false;
 
        // and we assign it as energyBar's mask.
        energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);
 
        // a boring timer.
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timeLeft --;
 
                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;
 
                // moving the mask
                this.energyMask.x -= stepWidth;

                if(this.timeLeft == 0){
                    countloop1 = countloop1 + 1;
					if (countloop1 < this.limit)
						this.scene.start('playGame')
					else
						this.scene.start("endGame")
                }
            },
            callbackScope: this,
            loop: true
        });
		// --end time--


		//  // 120 seconds
		//  this.initialTime = 120;

		//  var text = this.add.text(20, 32, formatTime(this.initialTime), { font: '80px Arial Black',  color: '#ff0000' });
 
		//  // Each 1000 ms call onEvent
		//  var timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
 
		//  function formatTime(seconds){
		// 	 // Minutes
		// 	 var minutes = Math.floor(seconds/60);
		// 	 // Seconds
		// 	 var partInSeconds = seconds%60;
		// 	 // Adds left zeros to seconds
		// 	 partInSeconds = partInSeconds.toString().padStart(2,'0');
		// 	 // Returns formated time
		// 	 return `${minutes}:${partInSeconds}`;
		//  }		
		 
		//  function onEvent ()
		//  {
		// 	 if (this.initialTime > 0) {
		// 		 this.initialTime -= 1; // One second
		// 		 text.setText(formatTime(this.initialTime));
		// 	 }
		// 	 else
		// 		 this.scene.start('gameOver'); 
		//  }	
	}
	update (){
		// set stars
		if (counttrue1 > 0) {
			if (counttrue1 <= this.limit) { 			// 3 * this.limit * 1/3 = this.limit
				this.add.image(this.levelGame.x - 2, this.levelGame.y + 55, 'levelstar1');
			}
			else if (counttrue1 <= this.limit * 2) {	// 3 * this.limit * 2/3 = this.limit * 2
				this.add.image(this.levelGame.x - 2, this.levelGame.y + 55, 'levelstar2');
			}
			else {
				this.add.image(this.levelGame.x - 2, this.levelGame.y + 55, 'levelstar3');
			}
		}

		this.titleSprite.tilePositionX += 1;
	}
}