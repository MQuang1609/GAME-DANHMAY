
// list words
var words3 = "dog cat cow pig fox bee bat ant owl";
var words4 = "goat wolf duck frog crab bird lion fish bear deer";
var words5 = "eagle horse llama sheep tiger camel snake whale mouse hippo zebra snail koala";
var words6 = "monkey rabbit shrimp parrot turtle spider";
var words7 = "buffalo chicken ostrich giraffe octopus penguin dolphin cricket";
var words8 = "flamingo starfish elephant squirrel raccoon kangaroo hedgehog";
var words9 = "crocodile";
var words10 = "butterfly";
var words11 = "grasshopper"

var list_words = []
var word;
var index_word = 0;

// tool
var beecoin;
var tool;
var tool1;
var limit = (level == 1 ? 7 : (level == 2 ? 10 : 15))
var check = false;	// if check is true -> move bee
var wrong = false;

// level
var levelGame;
var checkheart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
var condition_star1 = (level == 1 ? 4 : (level == 2 ? 6 : 11));
var condition_star2 = (level == 1 ? 6 : (level == 2 ? 9 : 14));
var condition_star3 = (level == 1 ? 7 : (level == 2 ? 10 : 15));
var n_stars;

// time
var time = 120;
var textTime;

// hands
var x_finger = 355, y_finger = 600;
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

// options
var sound;
var sound_off;

class scene2 extends Phaser.Scene {
	constructor() {
		super('playGame');
	}

	preload() {
		// background
		this.load.image('bg', 'assets/background.png');

		// label and timebar
		this.load.image('label', 'assets/label.png');
		this.load.image('think', 'assets/think.png');

		// machine and tool
		this.load.image('machine2', 'assets/claw-machine2.png');
		this.load.image('beecoin', 'assets/beecoin.png');
		this.load.image('tool', 'assets/tool.png');
		this.load.image('tool1', 'assets/tool1.png');
		this.load.image('rec1', 'assets/rectangle1.png');
		this.load.image('rec2', 'assets/rectangle2.png');

		// animals
		var array;
		if (level == 1) {	// 7 words
			if (index_word < 2)
				array = words3;
			else if (index_word < 5)
				array = words4;
			else
				array = words5;
		}
		else if (level == 2) {	// 10 words
			if (index_word < 3)
				array = words5;
			else if (index_word < 7)
				array = words6;
			else
				array = words7;
		}
		else {	// 15 words
			if (index_word < 5)
				array = words7;
			else if (index_word < 12)
				array = words8;
			else if (index_word == 12)
				array = words9;
			else if (index_word == 13)
				array = words10;
			else if (index_word == 14)
				array = words11;
		}
		array = array.split(" ");
		var random = Math.floor(Math.random() * array.length);
		var match = true;
		while (match == true) {
			var random = Math.floor(Math.random() * array.length);
			if (list_words.find(element => element == array[random]) == undefined) {
				list_words.push(array[random])
				match = false;
			}
		}
		// console.log(list_words)
		var word_animal = array[random];
		this.load.image('label_' + word_animal, 'assets/animal/' + word_animal + '.png');
		this.load.image(word_animal, 'assets/animal/' + word_animal + '.png');
		this.load.audio('voice_' + word_animal, 'assets/voice/animal/' + word_animal + '.mp3');
		this.load.image('wrong', 'assets/wrong.png');

		// button
		this.load.image('continue', 'assets/continue.png');

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

		// heart
		this.load.image('heart', 'assets/heart.png');
		this.load.image('heart0', 'assets/heart0.png');

		// options
		this.load.image('sound', 'assets/sound.png');
		this.load.image('sound-off', 'assets/sound-off.png')
	}

	create() {
		blazewarriorsstatusgame = false;
		number_star = 0;

		// background
		this.add.image(600, 350, "bg");

		// sound
		sound = this.add.sprite(95, 200, 'sound').setInteractive();
		sound_off = this.add.sprite(95, 200, 'sound-off').setInteractive();
		sound_off.visible = false
		sound.on('pointerdown', function () { soundOff(sound, sound_off, music, this) }, this);
		sound_off.on('pointerdown', function () { soundOn(sound, sound_off, music, this) }, this);

		// add level
		levelGame = this.add.image(100, 80, 'levelballred');
		this.add.image(levelGame.x - 2, levelGame.y + 50, 'levelstar0');

		// add heart
		var x_heart = 230, y_heart = 50;
		for (var i = 0; i < limit; i++) {
			if (checkheart[i] == 0)
				this.add.image(x_heart, y_heart, 'heart0');
			else
				this.add.image(x_heart, y_heart, 'heart');
			if (i == 7) {
				x_heart = 230;
				y_heart += 70;
			}
			else
				x_heart += 70;
		}

		// show word
		var x_label = 360, y_label = 320;
		let label = this.add.image(x_label, y_label, "label");
		var machine = this.physics.add.sprite(950, 355, 'machine2').setInteractive();

		// add word
		wrong = false;
		word = list_words[index_word]
		var char = []
		var x_char;
		switch (word.length) {
			case 3:
				x_char = x_label - 30;
				break;
			case 4:
				x_char = x_label - 65;
				break;
			case 5:
				x_char = x_label - 80;
				break;
			case 6:
				x_char = x_label - 100;
				break;
			case 7:
				x_char = x_label - 135;
				break;
			case 8:
				x_char = x_label - 150;
				break;
			case 9:
				x_char = x_label - 170;
				break;
			case 10:
				x_char = x_label - 180;
				break;
			case 11:
				x_char = x_label - 230;
		}
		for (var i = 0; i <= word.length; i++) {
			char.push(this.add.text(x_char, y_label + 73, word[i], { fontSize: '80px', fontFamily: 'Comic Sans MS', color: '#FFFFFF' }).setOrigin(0.5));
			x_char += 50;
		}
		var index_key = 0
		var current = word[index_key]

		// tool
		tool = this.add.sprite(880, 236, "tool");
		tool1 = this.add.sprite(1000, 240, "tool1");
		tool1.visible = false;
		beecoin = this.physics.add.sprite(680, 290, 'beecoin').setInteractive();

		// add animal that rabbit is thinking
		var think = this.add.image(x_label + 160, y_label - 80, "think");
		this.add.image(think.x + 10, think.y, 'label_' + word).setScale(0.5)

		// add hands
		this.add.image(x_finger, y_finger, 'hands');
		// change color of hands -> hands by after current char
		for (i = 0; i < 4; i++) {
			if (leftHand[i][0].search(current) != -1) {
				this.add.image(x_finger, y_finger, leftHand[i][1]['f']);
				break;
			}
			else if (rightHand[i][0].search(current) != -1) {
				this.add.image(x_finger, y_finger, rightHand[i][1]['f']);
				break;
			}
		}

		// press key
		this.input.keyboard.on('keydown', (event) => {
			// press key
			if(!check){
				// wait time
				this.initialTime = 4;
				if (event.key == current) {
					char[index_key].visible = false;
					if (index_key < word.length - 1) {
						index_key += 1
						current = word[index_key]
						// change color of hands -> hands by after char current
						for (i = 0; i < 4; i++) {
							if (leftHand[i][0].search(current) != -1) {
								this.add.image(x_finger, y_finger, leftHand[i][1]['f']);
								break;
							}
							else if (rightHand[i][0].search(current) != -1) {
								this.add.image(x_finger, y_finger, rightHand[i][1]['f']);
								break;
							}
						}
					}
					else {
						check = true;
						checkheart[index_word] = 1;
						index_word += 1;

						// voice
						this.voice = this.sound.add('voice_' + word, {
							volume: 1,
							loop: false
						})

						if (!this.sound.locked) {
							// already unlocked so play
							this.voice.play()
						}
						else {
							// wait for 'unlocked' to fire and then play
							this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
								this.voice.play()
							})
						}
	
						// Each 1000 ms call onEvent
						var timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
						function onEvent() {
							if (this.initialTime > 0) {
								this.initialTime -= 1; // One second
							}
							else {
								check = false;
								if (index_word >= limit) {
									n_stars = number_star;
									index_word = 0;
									list_words = [];
									checkheart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
									time = 120;
									this.scene.start('endGame');
								}
								else
									this.scene.start('playGame');
							}
						}
					}
				}
				else {
					check = true;
					wrong = true;
					index_word += 1;

					// Each 1000 ms call onEvent
					var timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
					function onEvent() {
						if (this.initialTime > 0) {
							this.initialTime -= 1; // One second
						}
						else {
							check = false;
							if (index_word >= limit) {
								n_stars = number_star;
								index_word = 0;
								list_words = [];
								checkheart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
								time = 120;
								this.scene.start('endGame');
							}
							else
								this.scene.start('playGame');
						}
					}
				}
			}
		})		

		// 120 seconds		
		textTime = this.add.text(label.x - 260, label.y + 90, time, { fontSize: '65px', fontFamily: 'Comic Sans MS', color: '#ff0000' }).setOrigin(0.5);
		// Each 1000 ms call onEvent
		var timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
		function onEvent() {
			if (time > 0) {
				if (!check)
					time -= 1; // One second
				textTime.setText(time);
			}
			else
			{
				n_stars = number_star;
				index_word = 0;
				list_words = [];
				checkheart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
				time = 120;
				this.scene.start('endGame');
			}
		}
	}

	update() {
		
		// while check = true -> beecoin di chuyen -> collide machine -> false -> beecoin ve vi tri ban dau
		if (check) {
			beecoin.x += 2;
			beecoin.y += 5;
			if (beecoin.x > 810) {
				beecoin.x = 810;
				if (beecoin.y > 600) {
					beecoin.y = 600;

					// move tool
					tool.x += 2;
					if (tool.x > 1000) {
						tool.x = 1000;
						tool.visible = false;
						tool1.visible = true;
						tool1.y += 2;
						this.add.image(1000, tool.y - 30.5, 'rec1');
						this.add.image(1000, tool1.y - 30, 'rec2');

						if (tool1.y > 360) {
							tool1.y = 360;
							if (wrong)
								this.add.image(1000, 380, 'wrong');
							else {
								this.add.image(1000, 380, word).setScale(0.8);
							}
							// var bt_continue = this.add.sprite(1000, 510, "continue").setInteractive();
							// bt_continue.on('pointerdown', function(){
							// 	wrong = false;
							// 	check = false;
							// 	if (index_word >= limit) {
							// 		// console.log('endGame', index_word)
							// 		this.scene.start('endGame');
							// 	}
							// 	else {
							// 		// console.log('playagain', index_word)
							// 		this.scene.start('playGame');
							// 	}
							// }, this);
						}
					}
				}
			}
		}

		// set stars of level
		var heart = 0;
		for (var i = 0; i < limit; i++) {
			if (checkheart[i] == 1)
				heart += 1;
		}
		if (heart <= condition_star1) {
			number_star = 1;
			this.add.image(levelGame.x - 2, levelGame.y + 50, 'levelstar1');
		}
		else if (heart <= condition_star2) {
			number_star = 2;
			this.add.image(levelGame.x - 2, levelGame.y + 50, 'levelstar2');
		}
		else {
			number_star = 3;
			this.add.image(levelGame.x - 2, levelGame.y + 50, 'levelstar3');
		}
	}
}