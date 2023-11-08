//loop
var loop = 1;
var loops = {
	loop1: '',
	loop2: '', loop3: '', loop4: '',
	loop5: '', loop6: '', loop7: '',
}
// time
var time = 120;
var textTime;

class scene2 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}
	preload(){
		this.load.image('bg2', 'assets/background2.png');
		this.load.image('keyboard','assets/keyboard.png');

		// keyboard
		this.load.image('screen', 'assets/screen.png');
		this.load.image('keyboard', 'assets/keyboard.png');
		this.load.image('keyboard_giua', 'assets/keyboard_giua.png');
		this.load.image('keyboard_tren', 'assets/keyboard_tren.png');
		this.load.image('keyboard_duoi', 'assets/keyboard_duoi.png');
		this.load.image('keyboard_so', 'assets/keyboard_so.png');

		// keys on keyboard
		var alpha = 'ABCDEFGHIJKLMONPQRSTUVWXYZ1234567890'
		for (var i in alpha)
			this.load.image('key_' + alpha[i],'assets/keyboard/' + alpha[i] + '.png');
		this.load.image('key_.','assets/keyboard/dac_biet_cham.png');
		this.load.image('key_;','assets/keyboard/dac_biet_champhay.png');
		this.load.image('key_,','assets/keyboard/dac_biet_phay.png');
		this.load.image('key_/','assets/keyboard/dac_biet_xet.png');
		this.load.image('key_space','assets/keyboard/space.png');

		this.load.audio('typewriter', 'assets/typewriter.wav');
		this.load.audio('voice_wrong', 'assets/voice_wrong.wav');
		this.load.image('wrong','assets/wrong.png');

		// hands
		// this.load.image('hands', 'assets/hands.png');
		this.load.image('uttrai', 'assets/hands_uttrai.png');
		this.load.image('aptrai', 'assets/hands_aptrai.png');
		this.load.image('giuatrai', 'assets/hands_giuatrai.png');
		this.load.image('trotrai', 'assets/hands_trotrai.png');
		this.load.image('utphai', 'assets/hands_utphai.png');
		this.load.image('apphai', 'assets/hands_apphai.png');
		this.load.image('giuaphai', 'assets/hands_giuaphai.png');
		this.load.image('trophai', 'assets/hands_trophai.png');
		this.load.image('ngoncai', 'assets/hands_ngoncai.png');

		// timebar
		this.load.image("clock", "assets/clock.png");

		// button complete
		this.load.image("complete", "assets/complete.png");
		this.load.image("instruct", "assets/instruct.png");
	}
	create(){
		this.add.image(600, 350, 'bg2');

		// create text
		if (loop == 1) {
			create_BigArray(list_lessons[lesson]['content'])
			for (var i in BigArray) {
				if (i < 12)			// 2 chars
					loops.loop1 += BigArray[i] + ' ';
				else if (i < 20)	// 3 chars
					loops.loop2 += BigArray[i] + ' ';
				else if (i < 28)	
					loops.loop3 += BigArray[i] + ' ';
				else if (i < 36)	
					loops.loop4 += BigArray[i] + ' ';
				else if (i < 44)	// 4 chars
					loops.loop5 += BigArray[i] + ' ';
				else if (i < 52)
					loops.loop6 += BigArray[i] + ' ';
				else
					loops.loop7 += BigArray[i] + ' ';
			}
		}

		// add screen and keyboard
		var screen = this.add.image(580, 280, 'screen');
		var keyboard = this.add.image(600, 540, list_lessons[lesson]['keyboard']);
		var voice_key = this.sound.add('typewriter');
		var voice_wrong = this.sound.add('voice_wrong');

		// add text on screen
		var chars = [];
		var x_char = screen.x/2 - (loop < 2 ? 20 : ( loop < 5 ? -20 : 60));
		var y_char = screen.y - ((lesson==21 || lesson==22) ? 80 : 50);

		var list = loops['loop' + loop]
		for (var i in list) {
			chars.push(this.add.text(x_char, y_char, list[i].toLowerCase(), {fontSize:70, fontFamily: 'Comic Sans MS', color:'#000000'})
							.setOrigin(0.5)
							.setAlpha(0.5)
			)	
			if (i == parseInt(list.length/2) - 1) {
				x_char = screen.x/2 - (loop < 2 ? 20 : ( loop < 5 ? -20 : 60));
				y_char += 100;
			}
			else
				x_char += 40;
		}

		// add keys based on keyboard
		var hanggiua = 'ASDFGHJKL;';
		var hangtren = 'QWERTYUIOP';
		var hangduoi = 'ZXCVBNM,./';
		var hangso = '1234567890';

		var btn_giua = {}, btn_tren = {}, btn_duoi = {}, btn_so = {};

		var x_hanggiua = 304;
		var y_hanggiua = 508;
		for (var i in hanggiua) {
			btn_giua[hanggiua[i]] = this.add.image(x_hanggiua + 60*i, y_hanggiua, 'key_' + hanggiua[i]).setVisible(false);
			x_hanggiua += 6.5;
		}

		var x_hangtren = 281.5;
		var y_hangtren = y_hanggiua - 66;
		for (var i in hangtren) {
			btn_tren[hangtren[i]] = this.add.image(x_hangtren + 60*i, y_hangtren, 'key_' + hangtren[i]).setVisible(false);
			x_hangtren += 6.5;
		}

		var x_hangduoi = 325;
		var y_hangduoi = y_hanggiua + 66.5;
		for (var i in hangduoi) {
			btn_duoi[hangduoi[i]] = this.add.image(x_hangduoi + 60*i, y_hangduoi, 'key_' + hangduoi[i]).setVisible(false);
			x_hangduoi += 6.5;
		}

		var x_hangso = 271;
		var y_hangso = y_hanggiua - 102;
		for (var i in hangso) {
			btn_so[hangso[i]] = this.add.image(x_hangso + 60*i, y_hangso, 'key_' + hangso[i]).setVisible(false);
			x_hangso += 6.5;
		}

		var btn_spacebar = this.add.image(keyboard.x + 7, keyboard.y + 105, 'key_space').setVisible(false);

		// set current_
		var current_index = 0;
		chars[current_index].setAlpha(1);
		var current_ = this.add.text(chars[current_index].x, chars[current_index].y + 10, '_', {fontSize:70, fontFamily: 'Comic Sans MS', color:'black'}).setOrigin(0.5);

		// show current key
		var current_key = list[current_index]
		var key_visible_true;
		check_current_key()

		function check_current_key() {
			if (current_key == '.') {
				btn_duoi['.'].setVisible(true);
				key_visible_true = btn_duoi['.'];
			}
			else if (hanggiua.search(current_key) != -1) {
				btn_giua[current_key].setVisible(true);
				key_visible_true = btn_giua[current_key];
			}
			else if (hangtren.search(current_key) != -1) {
				btn_tren[current_key].setVisible(true);
				key_visible_true = btn_tren[current_key];
			}
			else if (hangduoi.search(current_key) != -1) {
				btn_duoi[current_key].setVisible(true);
				key_visible_true = btn_duoi[current_key];
			}
			else if (hangso.search(current_key) != -1) {
				btn_so[current_key].setVisible(true);
				key_visible_true = btn_so[current_key];
			}
			else {
				// btn_space[current_key].setVisible(true);
				key_visible_true = btn_spacebar.setVisible(true);
			}
		}

		// add hands
		var x_hand = 600, y_hand = 605;
		var uttrai = this.add.image(x_hand, y_hand, 'uttrai').setVisible(false);
		var aptrai = this.add.image(x_hand, y_hand, 'aptrai').setVisible(false);
		var giuatrai = this.add.image(x_hand, y_hand, 'giuatrai').setVisible(false);
		var trotrai = this.add.image(x_hand, y_hand, 'trotrai').setVisible(false);
		var utphai = this.add.image(x_hand, y_hand, 'utphai').setVisible(false);
		var apphai = this.add.image(x_hand, y_hand, 'apphai').setVisible(false);
		var giuaphai = this.add.image(x_hand, y_hand, 'giuaphai').setVisible(false);
		var trophai = this.add.image(x_hand, y_hand, 'trophai').setVisible(false);
		var ngoncai = this.add.image(x_hand, y_hand, 'ngoncai').setVisible(false);

		const leftHand = [
			["rfvtgbRFVTGB45", trotrai], 	// ngón trỏ trái
			["edcEDC3", giuatrai],			// ngón giữa trái
			["wsxWSX2", aptrai],			// ngón áp trái
			["qazQAZ1", uttrai],			// ngón út trái
		]
		const rightHand = [
			["yhnujmYHNUJM67", trophai],	// ngón trỏ phải
			["ik,IK8", giuaphai],			// ngón giữa phải
			["ol.OL9", apphai],				// ngón áp phải
			["p;/P0", utphai],				// ngón út phải
		]

		var current_hand, is_left_hand = false, is_right_hand = false;
		checkhand()

		function checkhand() {
			for (var i in leftHand) {
				if (leftHand[i][0].search(current_key) != -1) {
					current_hand = leftHand[i][1].setVisible(true);
					is_left_hand = true;
					break;
				}
			}
			if (is_left_hand == false) {
				for (var i in rightHand) {
					if (rightHand[i][0].search(current_key) != -1) {
						current_hand = rightHand[i][1].setVisible(true);
						is_right_hand = true;
						break;
					}
				}
				if (is_left_hand == false && is_right_hand == false) {
					current_hand = ngoncai.setVisible(true);
				}
			}
		}
		
		// handle input
		this.wrong = '';
		this.input.keyboard.on('keydown', function (event) {
			// hide wrong if happened
			if (this.wrong != '')
				this.wrong.destroy();

			if (event.key.toUpperCase() == current_key) {
				voice_key.play();
				chars[current_index].destroy();
				chars[current_index] = (this.add.text(chars[current_index].x, chars[current_index].y, current_key.toLowerCase(), {fontSize:70, fontFamily: 'Comic Sans MS', color:'red'}).setOrigin(0.5));
				
				current_index += 1;

				if (current_index == list.length) {
					loop += 1;
					if (loop == 8)
						this.scene.start('endGame');
					else
						this.scene.start('playGame');
				}
				else {
					current_key = list[current_index]
					chars[current_index].setAlpha(1);
					current_.destroy()
					current_ = this.add.text(chars[current_index].x, chars[current_index].y + 10, '_', {fontSize:70, fontFamily: 'Comic Sans MS', color:'black'}).setOrigin(0.5);
				}
				
				// show current key
				key_visible_true.setVisible(false);
				check_current_key();

				// show current hand
				is_left_hand = false;
				is_right_hand = false;
				current_hand.setVisible(false)
				checkhand()
			}
			else if (event.key.toUpperCase() == list[current_index - 1]) {
				console.log('trung')
			} 
			else {	// type wrong
				voice_wrong.play();
				var w = event.key.toUpperCase();
				// show current key
				if (hanggiua.search(w) != -1) {
					this.key_wrong_true = btn_giua[w];
				}
				else if (hangtren.search(w) != -1) {
					this.key_wrong_true = btn_tren[w];
				}
				else if (hangduoi.search(w) != -1) {
					this.key_wrong_true = btn_duoi[w];
				}
				else {
					this.key_wrong_true = btn_so[w];
				}
				this.wrong = this.add.image(this.key_wrong_true.x + ((hangso.search(w) != -1) ? 0 : 10), this.key_wrong_true.y + ((hangso.search(w) != -1) ? 0 : 30), 'wrong').setScale(0.4);
			}
		}, this);

		// 120 seconds		
		var clock = this.add.image(600, 60, 'clock')
		textTime = this.add.text(clock.x, clock.y, formatTime(time), { fontSize: '45px', fontFamily: 'Comic Sans MS', color: '#ff0000' }).setOrigin(0.5);
		// Each 1000 ms call onEvent
		var timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });
		function onEvent() {
			if (time > 0) {
				time -= 1; // One second
				textTime.setText(formatTime(time));
			}
			else
			{
				clock.setVisible(false)
				textTime.setVisible(false)

				var btn_complete = this.add.sprite(clock.x, clock.y, 'complete').setInteractive();
				this.add.image(clock.x + 340, clock.y, 'instruct');

				btn_complete.on('pointerdown', function(){
					this.scene.start('endGame');
				}, this);
			}
		}

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
	}
	update(){
		
	}
}