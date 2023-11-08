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

// loop
var loop = 0;

class scene2 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}
	preload(){
		this.load.image('bg2', 'assets/background2.png');
		this.load.image('note', 'assets/note.png');
		this.load.audio('voice_instruct', 'assets/voice_instruct.wav');

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

		this.load.audio('voice_good', 'assets/voice_good.wav');
	}
	create(){
		var keys = list_lessons[lesson]['content']

		if (loop == 0)
			this.sound.add('voice_instruct').play();
		else
			this.sound.add('voice_good').play();

		this.add.image(600, 350, 'bg2');
		
		// add note
		var note = this.add.image(600, 85, 'note');
		var hands, hand, finger;
		var is_left_hand = false;

		// for (var i in leftHand) {
		// 	// get row of keyboard based on left hand
		// 	var row = leftHand[i][0].toUpperCase();
		// 	if (row.search(current_key) != -1) {
		// 		is_left_hand = true;
		// 		hands = leftHand[i][1].f;
		// 		hand = 'tay trái';
		// 		if (i == 0)
		// 			finger = 'trỏ';
		// 		else if (i == 1)
		// 			finger = 'giữa';
		// 		else if (i == 2)
		// 			finger = 'áp út';
		// 		else
		// 			finger = 'út';
		// 		break;
		// 	}
		// 	else
		// 		is_left_hand = false;
		// }

		// if (is_left_hand == false) {
		// 	for (var i in rightHand) {
		// 		// get row of keyboard based on left hand
		// 		var row = rightHand[i][0].toUpperCase();
		// 		if (row.search(current_key) != -1) {
		// 			hands = rightHand[i][1].f;
		// 			hand = 'tay phải';
		// 			if (i == 0)
		// 				finger = 'trỏ';
		// 			else if (i == 1)
		// 				finger = 'giữa';
		// 			else if (i == 2)
		// 				finger = 'áp út';
		// 			else
		// 				finger = 'út';
		// 			break;
		// 		}
		// 	}
		// }

		// this.add.text(note.x + 45, note.y + 5, 'Em hãy dùng ngón ' + finger + ' ' + hand + ' và nhấn\nthả liên tục phím ' + current_key + ' để làm quen nhé!', {fontSize:35, fontFamily: 'Arial', color:'#000000'}).setOrigin(0.5);

		// add screen and keyboard
		var screen = this.add.image(600, 320, 'screen');
		this.add.image(600, 540, list_lessons[lesson]['keyboard']);
		var voice_key = this.sound.add('typewriter');
		var voice_wrong = this.sound.add('voice_wrong');

		// add text on screen
		var loop_char = 5;
		var current_row = list_lessons[lesson]['row'][0];
		var chars = [];
		var x_char = screen.x - 200, y_char = screen.y - 40;
		for (var i = 0; i < loop_char; i++) {
			// chars.push(this.add.text(x_char, y_char, current_key.toLowerCase(), {fontSize:100, fontFamily: 'Arial', color:'#000000'}).setOrigin(0.5));
			chars.push(this.add.text(x_char, y_char, current_row[i], {fontSize:100, fontFamily: 'Arial', color:'#000000'}).setOrigin(0.5));
			chars[i].setAlpha(0.5)
			x_char += 100;
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

		// add hands
		this.add.image(600, 605, hands);

		// set current_
		var current_index = 0;
		var current_key = keys[current_index];
		chars[current_index].setAlpha(1);
		var current_ = this.add.text(chars[current_index].x, chars[current_index].y + 10, '_', {fontSize:100, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);

		// show current key
		if (current_key == '.') {
			btn_duoi['.'].setVisible(true);
			this.key_visible_true = btn_duoi['.'];
		}
		else if (hanggiua.search(current_key) != -1) {
			btn_giua[current_key].setVisible(true);
			this.key_visible_true = btn_giua[current_key];
		}
		else if (hangtren.search(current_key) != -1) {
			btn_tren[current_key].setVisible(true);
			this.key_visible_true = btn_tren[current_key];
		}
		else if (hangduoi.search(current_key) != -1) {
			btn_duoi[current_key].setVisible(true);
			this.key_visible_true = btn_duoi[current_key];
		}
		else {
			btn_so[current_key].setVisible(true);
			this.key_visible_true = btn_so[current_key];
		}

		// handle input
		var str_decode = ''
		this.wrong = '';
		this.input.keyboard.on('keydown', function (event) {
			console.log(event.key)
			// hide wrong if happened
			if (this.wrong != '')
				this.wrong.destroy();

			if (event.key.toUpperCase() == current_key) {
				str_decode += event.key;
			}

			// if (event.key == current_row[current_index]) {
			// 	voice_key.play();
			// 	chars[current_index].destroy();
			// 	chars[current_index] = (this.add.text(chars[current_index].x, chars[current_index].y, current_row[current_index].toLowerCase(), {fontSize:100, fontFamily: 'Arial', color:'red'}).setOrigin(0.5));
				
			// 	current_index += 1;

			// 	if (current_index == loop_char) {
			// 		// loop += 1;
			// 		// if (loop == keys.length)
			// 		// 	this.scene.start('endGame');
			// 		// else
			// 		// 	this.scene.start('playGame');
			// 	}
			// 	else {
			// 		current_key = keys[current_index];
			// 		// show current key
			// 		if (current_key == '.') {
			// 			btn_duoi['.'].setVisible(true);
			// 			this.key_visible_true = btn_duoi['.'];
			// 		}
			// 		else if (hanggiua.search(current_key) != -1) {
			// 			btn_giua[current_key].setVisible(true);
			// 			this.key_visible_true = btn_giua[current_key];
			// 		}
			// 		else if (hangtren.search(current_key) != -1) {
			// 			btn_tren[current_key].setVisible(true);
			// 			this.key_visible_true = btn_tren[current_key];
			// 		}
			// 		else if (hangduoi.search(current_key) != -1) {
			// 			btn_duoi[current_key].setVisible(true);
			// 			this.key_visible_true = btn_duoi[current_key];
			// 		}
			// 		else {
			// 			btn_so[current_key].setVisible(true);
			// 			this.key_visible_true = btn_so[current_key];
			// 		}

			// 		chars[current_index].setAlpha(1);
			// 		current_.destroy()
			// 		current_ = this.add.text(chars[current_index].x, chars[current_index].y + 10, '_', {fontSize:100, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
			// 	}
			// }
			else {	// type wrong
				// voice_wrong.play();
			// 	var w = event.key.toUpperCase();
			// 	// show current key
			// 	if (hanggiua.search(w) != -1) {
			// 		this.key_wrong_true = btn_giua[w];
			// 	}
			// 	else if (hangtren.search(w) != -1) {
			// 		this.key_wrong_true = btn_tren[w];
			// 	}
			// 	else if (hangduoi.search(w) != -1) {
			// 		this.key_wrong_true = btn_duoi[w];
			// 	}
			// 	else {
			// 		this.key_wrong_true = btn_so[w];
			// 	}
			// 	this.wrong = this.add.image(this.key_wrong_true.x + ((hangso.search(w) != -1) ? 0 : 10), this.key_wrong_true.y + ((hangso.search(w) != -1) ? 0 : 30), 'wrong').setScale(0.4);
			}
		}, this);
	}
	update(){
		
	}
}