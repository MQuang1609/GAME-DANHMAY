var list_key = "abcdefghijklmnopqrstuvwxyz;,./0123456789ABCDEFGHIJKLMNOQPRSTUVWXYZ";
var characters;
var sum, max_speed;
let gameOptions1 = {
	initialTime1: 120,
}
// end edit

var bullets;
var gun;
var hearts = [];
var score = 0;
var sound;
var sound_off;

class scene2 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}

	preload(){
        this.load.image('bg2','assets/background2.png');
		this.load.image('bg3','assets/background3.png');
		this.load.image('bg4','assets/background4.png');
		this.load.image('chat', 'assets/chat.png');

		// cannon and bullet
		this.load.image('gun','assets/bee_and_cannon.png');
		this.load.image('bullet', 'assets/ball.png');

		// hands
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
		this.load.image('penguin', 'assets/penguin.png');
		this.load.image('energycontainer','assets/energyContainer.png');
		this.load.image('energybar','assets/energyBar.png');

		// heartlife
		this.load.image('heart', 'assets/heart.png');

		// level
		this.load.image('levelballred', 'assets/ballred.png');
		for (var i = 0; i <= 3; i++)
			this.load.image('levelstar' + i, 'assets/star' + i + '.png');

		// options
		this.load.image('sound', 'assets/sound.png');
        this.load.image('sound-off', 'assets/sound-off.png')

		// balloon
		this.load.audio('pop', 'assets/pop.mp3');
		for (var i in list_key) {
			if (i < 26)
				this.load.image('ball-' + list_key[i],'assets/balloon/lower/ball-' + list_key[i] + '.png');
			else if (i < 30) {
				var key;
				if (i == 26)
					key = 'champhay';
				else if (i == 27)
					key = 'phay'
				else if (i == 28)
					key = 'cham'
				else if (i == 29)
					key = 'xet'
				this.load.image('ball-' + list_key[i],'assets/balloon/symbol/ball-' + key + '.png');
			}
			else if (i < 40)
				this.load.image('ball-' + list_key[i],'assets/balloon/number/ball-' + list_key[i] + '.png');
			else
				this.load.image('ball-' + list_key[i],'assets/balloon/upper/ball-' + list_key[i] + '.png');
		}
	}

	create(){
		blazewarriorsstatusgame = false;
		number_star = 0;

		if (level == 'level1' || level == 'level2') {
			characters = list_characters.hanggiua
			sum = 50;
			max_speed = 0.4
			this.background = 'bg2'
		}
		else if (level == 'level3' || level == 'level4'){
			characters = list_characters.hangtren
			sum = 50;
			max_speed = 0.4
			this.background = 'bg2'
		}
		else if (level == 'level5' || level == 'level6'){
			characters = list_characters.hangduoi
			sum = 50;
			max_speed = 0.4
			this.background = 'bg2'
		}
		else if (level == 'level7'){
			characters = list_characters.hanggiua + list_characters.hangtren
			sum = 70;
			max_speed = 0.6
			this.background = 'bg3'
		}
		else if (level == 'level8'){
			characters = list_characters.hanggiua + list_characters.hangduoi
			sum = 70;
			max_speed = 0.6
			this.background = 'bg3'
		}
		else if (level == 'level9'){
			characters = list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren
			sum = 80;
			max_speed = 0.7
			this.background = 'bg3'
		}
		else if (level == 'level10' || level == 'level11'){
			characters = list_characters.hangso + list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren
			sum = 90;
			max_speed = level == 'level10' ? 0.7 : 0.8
			this.background = 'bg3'
		}
		else if (level == 'level12' || level == 'level13'){
			characters = (list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren).toUpperCase()
							+ list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren
			sum = 100;
			max_speed = 0.9
			this.background = 'bg4'
		}
		else if (level == 'level14' || level == 'level15'){
			characters = (list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren).toUpperCase()
							+ list_characters.hanggiua + list_characters.hangduoi + list_characters.hangtren + list_characters.hangso
			sum = 100;
			max_speed = 1
			this.background = 'bg4'
		}

        var bg2 = this.add.image(600, 350, this.background);
		bg2.alpha = 0.6

		var chat = this.add.image(80, 380, "chat");
		this.popSound = this.sound.add('pop');

		// add level
		this.levelGame = this.add.image(100, 80, 'levelballred');
		this.add.text(this.levelGame.x, this.levelGame.y, level[level.length - 1], {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);
		this.add.image(this.levelGame.x - 2, this.levelGame.y + 55, 'levelstar0');

		// add heart life
		var x_heart = 220, y_heart = 60;
		for (i = 0; i < 3; i++) {
			hearts.push(this.add.image(x_heart, y_heart, 'heart'));
			x_heart += 80;
		}

		// add score text
		this.add.text(180,100, 'Số bóng:',  {fontSize: '50px', fontFamily: 'Arial', color: 'black'});
		score = 0;
		this.scoreText = this.add.text(390, 90, score,  {fontSize: '60px', fontFamily: 'Comic Sans MS', color: 'black'});

		// add cannon
		gun = this.add.image(250, 490, 'gun').setDepth(1000);

		// sound
		sound = this.add.sprite(1150, 50, 'sound').setInteractive();
        sound_off = this.add.sprite(1150, 50, 'sound-off').setInteractive();
        sound_off.visible = false
        sound.on('pointerdown', function() {soundOff(sound, sound_off, music, this) }, this);
        sound_off.on('pointerdown', function() {soundOn(sound, sound_off, music, this) }, this);

		// add balloons
		this.balloons = [];
		this.startGame();	
		this.b = {'ba':'ba'}
		for(var i = 0; i < 5; i++) {
			this.b[i] = this.balloons[i];
		}
		
		// add hands
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

		var x_finger = 800, y_finger = 530;
		this.add.image(x_finger, y_finger, 'hands');

		var keypress = '';
		this.input.keyboard.on('keydown', (event) => {
			// show keypress
			if (keypress != '' && list_key.search(event.key) != -1)
				keypress.visible = false;
			if (list_key.search(event.key) != -1) {
				keypress = this.add.text(chat.x, chat.y - 20, event.key, {fontSize: '60px', fontFamily: 'Comic Sans MS', color: '#FF4C61'}).setOrigin(0.5);;
			}

			// change color of hands
			for (i = 0; i < 4; i++) {
				if (leftHand[i][0].search(event.key) != -1) {
					this.add.image(x_finger, y_finger, leftHand[i][1]['f']);
					break;
				}
				else if (rightHand[i][0].search(event.key) != -1) {
					this.add.image(x_finger, y_finger, rightHand[i][1]['f']);
					break;
				}
			}

			// shoot balloon
			const ballName = event.key;
			for (var j = 0; j < this.balloons.length; j++) {
				if (this.balloons[j].texture.key.split('-')[1] == ballName) {
					const bullet = new Bullet(this, this.balloons[j].x, this.balloons[j].y);
					this.physics.add.collider(bullet, this.balloons[j], (_bullet, _balloon) => {
						console.log('Hit ball ' + ballName);
						_balloon.onPop();
						_bullet.destroy();
						score ++;
						this.scoreText.setText(score);
						if (score == sum) {
							this.scene.start('endGame')	
						}
					});
					break;
				}
			}
		})

		// --set time 120s--
		
		this.timeLeft = gameOptions1.initialTime1;
 
        // the energy container. A simple sprite
		this.add.image(90, 585, "penguin");
		let energyContainer = this.add.sprite(600, 638, "energycontainer");
 
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
                let stepWidth = this.energyMask.displayWidth / gameOptions1.initialTime1;
 
                // moving the mask
                this.energyMask.x -= stepWidth;

                if(this.timeLeft == 0){         
					console.log('end time')           
					this.scene.start("endGame")
                }
            },
            callbackScope: this,
            loop: true
        });
		// --end time--
	}

	update(time, delta){
		this.balloons.forEach(b => b.update(time,delta));

		// set stars of level
		if (score > sum * 1/3) {
			if (score <= 20) {
				this.add.image(level.x - 2, level.y + 50, 'levelstar1');
			}
			else if (score <= sum * 2/3) {
				this.add.image(level.x - 2, level.y + 50, 'levelstar2');
			}
			else {
				this.add.image(level.x - 2, level.y + 50, 'levelstar3');
			}
		}
	}

	// add 5 ball
	startGame() {
		// var sx = (this.sys.game.config.width)/3;
		var max = 600, min = 500;
		var sx = Math.floor(Math.random() * (max - min + 1) ) + min;
		for(var i = 0; i < 5; i++) {
			this.addBalloon(sx + 200*i + 100,i+20);
		}
	}

	addBalloon(x,y) {
		// if(!x) x = Math.floor(Math.random()*(this.sys.game.config.width-128)) + 64;
		var max = 1200, min = 500;
		var maxy = 20 , miny=10;
		if(!x) x = Math.floor(Math.random() * (max - min + 1)) + min;
		if(!y) y = Math.floor(Math.random() * (maxy - miny + 1)) + miny;
		// var balloon = new Balloon(this, x, this.sys.game.config.height - 180+y, this.randomBalloon());
		var balloon = new Balloon(this, x,  this.sys.game.config.height - 300, this.randomBalloon());
		// balloon.speed = 0.35 + Math.random() + (score/10);

		// level1
		
		if (score <= sum * 1/3) {
			balloon.speed = max_speed - 0.2;
		}
		else if (score <= sum * 2/3) {
			balloon.speed = max_speed - 0.1;
		}
		else {
			balloon.speed = max_speed;
		}

		this.balloons.push(balloon);
	}

	killBalloon(balloon) {
		this.popSound.play();
		this.balloons = this.balloons.filter(b => b!==balloon);
		var tween1 = this.tweens.add({
			targets: balloon,
			scaleX: 1.5,
			scaleY: 1.5,
			duration: 50
		});
		var tween2 = this.tweens.add({
			targets: balloon,
			scaleX: 0,
			scaleY: 0,
			duration: 50,
			delay: 100,
			onComplete: () => balloon.destroy()
		});
	}

	gameOver() {
		this.cameras.main.shake(500);
		this.balloons.forEach(b => this.killBalloon(b));
		if (hearts.length > 0) hearts[hearts.length - 1].setVisible(false);
		hearts.pop();
		if (hearts == 0) {
			console.log('no heart')
			this.scene.start('endGame');
		}
		else
			this.startGame();
	}

	randomBalloon() {
		var random = Math.floor(Math.random()*characters.length);
		return 'ball-' + characters[random]
	}
}