var blazewarriorsstatusgame = false;
var music;

// random 7 words
var nums = [];
var words = [];

// time
let gameOptions = {
    initialTime: 120
}
var time = 0;
var loop = 0;
var limit_loop = 8;

// options
var sound;
var sound_off;

class scene1 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}
	preload(){
		// background
		var background = (level < 7) ? 'background1' : ((level < 10) ? 'background2' : 'background3');
		this.load.image('bg1','assets/' + background + '.png');
		this.load.image('winnie','assets/winnie.png');
		this.load.image('bee','assets/bee.png');

		// timebar
		this.load.image("energycontainer", "assets/energycontainer.png");
        this.load.image("energybar", "assets/energybar.png");

		// keyboard
		this.load.audio('typewriter', 'assets/typewriter.wav');
		this.load.image('keyboard','assets/keyboard.png');
		this.load.image('keyboard_giua','assets/keyboard_giua.png');
		this.load.image('keyboard_tren','assets/keyboard_tren.png');
		this.load.image('keyboard_duoi','assets/keyboard_duoi.png');
		this.load.image('keyboard_tren_duoi','assets/keyboard_tren_duoi.png');
		this.load.image('keyboard_tren_giua','assets/keyboard_tren_giua.png');
		this.load.image('keyboard_duoi_giua','assets/keyboard_duoi_giua.png');

		var alpha = 'ABCDEFGHIJKLMONPQRSTUVWXYZ'
		for (var i in alpha)
			this.load.image('key_' + alpha[i],'assets/keyboard/' + alpha[i] + '.png');
		this.load.image('wrong','assets/wrong.png');

		// level
		this.load.image('levelballred', 'assets/ballred.png');

		// options
		this.load.image('sound', 'assets/sound.png');
		this.load.image('sound-off', 'assets/sound-off.png')
	}
	create(){		
		blazewarriorsstatusgame = false;
		number_star = 0;

		// background
		this.add.image(600, 350, 'bg1').setAlpha(0.8);	
		this.add.image(150, 540, 'winnie');

		// sound
		sound = this.add.sprite(1100, 80, 'sound').setInteractive();
		sound_off = this.add.sprite(1100, 80,'sound-off').setInteractive();
		sound_off.visible = false;
		sound.on('pointerdown', function () { soundOff(sound, sound_off, music, this) }, this);
		sound_off.on('pointerdown', function () { soundOn(sound, sound_off, music, this) }, this);

		var voice_key = this.sound.add('typewriter');

		// add level
		this.levelGame = this.add.image(100, 80, 'levelballred');
		this.add.text(this.levelGame.x, this.levelGame.y + 5, level, {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);

		// add keyboard
		if (level < 4)
			this.keyboard = 'keyboard_giua';
		else if (level < 7)
			this.keyboard = 'keyboard_tren';
		else if (level == 7)
			this.keyboard = 'keyboard_tren_giua';
		else if (level == 8)
			this.keyboard = 'keyboard_duoi_giua';
		else if (level == 9)
			this.keyboard = 'keyboard_tren_duoi';
		else
			this.keyboard = 'keyboard';
		this.add.image(700, 550, this.keyboard);
		this.add.image(1100, 630, 'bee');

		// add keys on keyboard
		var hanggiua = 'ASDFGHJKL';
		var hangtren = 'QWERTYUIOP';
		var hangduoi = 'ZXCVBNM';

		var btn_giua = {}, btn_tren = {}, btn_duoi = {};

		var x_hanggiua = 378;
		var y_hanggiua = 555;
		for (var i in hanggiua) {
			btn_giua[hanggiua[i]] = this.add.image(x_hanggiua + 60*i, y_hanggiua, 'key_' + hanggiua[i]).setVisible(false);
			x_hanggiua += 3;
		}
		
		var x_hangtren = 353;
		var y_hangtren = y_hanggiua - 64;
		for (var i in hangtren) {
			btn_tren[hangtren[i]] = this.add.image(x_hangtren + 60*i, y_hangtren, 'key_' + hangtren[i]).setVisible(false);
			x_hangtren += 3;
		}

		var x_hangduoi = 392;
		var y_hangduoi = y_hanggiua + 64;
		for (var i in hangduoi) {
			btn_duoi[hangduoi[i]] = this.add.image(x_hangduoi + 60*i, y_hangduoi, 'key_' + hangduoi[i]).setVisible(false);
			x_hangduoi += 3;
		}

		// make list words
		if (loop == 0) {
			// make random numbers -> random word
			while (nums.length < limit_loop) {
				var num = Math.floor(Math.random() * list_words['level' + level].length);
				if (nums.indexOf(num) == -1) {
					nums.push(num)
					words.push(list_words['level' + level][num])
				}
			}
			// console.log(words)
		}

		// show 4 current words
		var current_word = words[loop], label_word = [];
		var len_word = current_word.length
		var index_word = {
			len3: {
				x: 200, y: 250, distance: 100,
			},
			len4: {
				x: 200, y: 250, distance: 50,
			},
			len5: {
				x: 50, y: 250, distance: 50,
			},
			len6: {
				x: 380, y: 200, distance: 100,
			},
			len7: {
				x: 323, y: 200, distance: 100,
			},
			len8: {
				x: 280, y: 200, distance: 100,
			},
			len9: {
				x: 200, y: 200, distance: 100,
			},
			len10: {
				x: 80, y: 200, distance: 100,
			},
		}

		var x_word = index_word['len' + len_word].x;
		var y_word = index_word['len' + len_word].y;
		var distance = index_word['len' + len_word].distance;

		for (var i = 0; i < 4; i++) {
			if (len_word > 5 && i == 2) {
				x_word = index_word['len' + len_word].x;
				y_word += 120;
			}
		
			// add label
			var graphics = this.add.graphics();
			graphics.fillStyle(0xffb900, 1);
			//  32px radius on the corners
			graphics.fillRoundedRect(x_word - 40, y_word - 42, 50*current_word.length + 30, 105, 32);
			
			// add word
			label_word[i] = {}
			for (var j in current_word) {
				label_word[i]['char' + j] = this.add.text(x_word, y_word, current_word[j], {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);
				x_word += 50;
			}
			x_word += distance;
		}

		// set currents
		var loop_word = 0;
		var current_index = 0;

		// set current_
		var x_current_ = label_word[loop_word]['char' + current_index].x;
		var y_current_ = label_word[loop_word]['char' + current_index].y;
		var current_ = this.add.text(x_current_, y_current_ + 8, '_', {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);

		// set current_char
		var current_char = current_word[current_index];
		var k = current_char.toUpperCase();
		// show current key
		if (hanggiua.search(k) != -1) {
			btn_giua[k].setVisible(true);
			this.key_visible_true = btn_giua[k];
		}
		else if (hangtren.search(k) != -1) {
			btn_tren[k].setVisible(true);
			this.key_visible_true = btn_tren[k];
		}
		else {
			btn_duoi[k].setVisible(true);
			this.key_visible_true = btn_duoi[k];
		}

		// handle input keys
		this.wrong = '';
		this.input.keyboard.on('keydown', function (event) {
			voice_key.play()

			// hide wrong if happened
			if (this.wrong != '')
				this.wrong.destroy();

			// press true
			if (event.key == current_char) {
				// translate color to red
				label_word[loop_word]['char' + current_index].setTint(0xff0000);

				this.wrong = '';
				current_.destroy();
				this.key_visible_true.visible = false;

				// set currents
				if (current_index == current_word.length - 1) {
					current_index = 0;
					if (loop_word == 3) {
						loop += 1;
						time += (60 - this.timeLeft)
						if (loop < limit_loop) {
							this.scene.start('playGame')
						}
						else {
							this.scene.start('endGame')
						}
					}
					else {
						loop_word += 1;
					}
				}
				else {
					current_index += 1;
				}

				// set current_
				x_current_ = label_word[loop_word]['char' + current_index].x;
				y_current_ = label_word[loop_word]['char' + current_index].y;
				current_ = this.add.text(x_current_, y_current_ + 8, '_', {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);

				// set current_char
				current_char = current_word[current_index];
				
				// show current key
				k = current_char.toUpperCase();
				if (hanggiua.search(k) != -1) {
					btn_giua[k].setVisible(true);
					this.key_visible_true = btn_giua[k];
				}
				else if (hangtren.search(k) != -1) {
					btn_tren[k].setVisible(true);
					this.key_visible_true = btn_tren[k];
				}
				else {
					btn_duoi[k].setVisible(true);
					this.key_visible_true = btn_duoi[k];
				}
			}
			else if (event.key == current_word[current_index - 1]) {
				console.log('trung')
			} 
			else {	// press wrong
				var w = event.key.toUpperCase();
				// show current key
				if (hanggiua.search(w) != -1) {
					this.key_wrong_true = btn_giua[w];
				}
				else if (hangtren.search(w) != -1) {
					this.key_wrong_true = btn_tren[w];
				}
				else {
					this.key_wrong_true = btn_duoi[w];
				}
				this.wrong = this.add.image(this.key_wrong_true.x, this.key_wrong_true.y, 'wrong').setScale(0.4);
			}
		}, this);
	
		// --time--
		this.timeLeft = gameOptions.initialTime;
 
        // the energy container. A simple sprite
        // let energyContainer = this.add.sprite(game.config.width / 2, game.config.height / 2 + 250, "energycontainer");
		let energyContainer = this.add.sprite(game.config.width / 2, 80, "energycontainer");
 
        // the energy bar. Another simple sprite
        let energyBar = this.add.sprite(energyContainer.x + 46, energyContainer.y, "energybar");
 
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
					this.scene.start('endGame')
                }
            },
            callbackScope: this,
            loop: true
        });
		// --end time--
	}
	update() {
			
	}
}