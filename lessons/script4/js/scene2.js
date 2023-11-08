var loop = 1;

class scene2 extends Phaser.Scene {
	constructor() {
		super('playGame');
	}
	preload() {
		// background
		this.load.image('bg1', 'assets/background1.png');
		this.load.image('instruct','assets/instruct.png');

		// keyboard
		this.load.image('keyboard','assets/keyboard.png');
		this.load.image('keyboard_giua','assets/keyboard_giua.png');
		this.load.image('keyboard_tren','assets/keyboard_tren.png');
		this.load.image('keyboard_duoi','assets/keyboard_duoi.png');
		this.load.image('keyboard_so','assets/keyboard_so.png');
		this.load.image('keyboard_tren_giua','assets/keyboard_tren_giua.png');

		// key on keyboard
		var alpha = 'ABCDEFGHIJKLMONPQRSTUVWXYZ1234567890'
		for (var i in alpha)
			this.load.image('key_' + alpha[i],'assets/keyboard/' + alpha[i] + '.png');
		this.load.image('key_.','assets/keyboard/dac_biet_cham.png');
		this.load.image('key_;','assets/keyboard/dac_biet_champhay.png');
		this.load.image('key_,','assets/keyboard/dac_biet_phay.png');
		this.load.image('key_/','assets/keyboard/dac_biet_xet.png');

		// grey keys
		for (var i in alpha)
			this.load.image('grey_' + alpha[i],'assets/keyboard/grey/' + alpha[i] + '.png');
		this.load.image('grey_.','assets/keyboard/grey/dac_biet_cham.png');
		this.load.image('grey_;','assets/keyboard/grey/dac_biet_champhay.png');
		this.load.image('grey_,','assets/keyboard/grey/dac_biet_phay.png');
		this.load.image('grey_/','assets/keyboard/grey/dac_biet_xet.png');
		
		// sound of key
		this.load.audio('typewriter', 'assets/typewriter.wav');
		this.load.audio('voice_wrong', 'assets/voice_wrong.wav');

		// sount of instruct
		this.load.audio('voice_instruct', 'assets/voice_instruct.wav');
	}
	create() {
		if (loop == 1)
			this.sound.add('voice_instruct').play();

		this.add.image(600, 350, 'bg1');
		this.add.image(600, 220, 'instruct');

		// add keyboard based on lesson
		this.add.image(650, 530, list_lesson[lesson].keyboard);

		// add circle show round number
		var r6 = this.add.circle(115, 550, 80, 0xF49514);
		r6.setIterations(0.2);
		this.tweens.add({
			targets: r6,
			angle: 20,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});

		var text_loop = this.add.text(r6.x - 45, r6.y - 45, loop, {fontSize:80, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);
		this.tweens.add({
			targets: text_loop,
			angle: 20,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});

		if (lesson != 'lesson10_2' && lesson != 'lesson14_2') {
			var text_sumloop = this.add.text(r6.x - 10, r6.y - 20, '/4', {fontSize:40, fontFamily: 'Arial', color:'#ffffff'}).setOrigin(0.5);
			this.tweens.add({
				targets: text_sumloop,
				angle: 20,
				yoyo: true,
				repeat: -1,
				ease: 'Sine.easeInOut'
			});
		}

		// add keys based on keyboard
		var hanggiua = 'ASDFGHJKL;';
		var hangtren = 'QWERTYUIOP';
		var hangduoi = 'ZXCVBNM,./';
		var hangso = '1234567890';

		var btn_giua = {}, btn_tren = {}, btn_duoi = {}, btn_so = {};

		var x_hanggiua = 308;
		var y_hanggiua = 534;
		for (var i in hanggiua) {
			btn_giua[hanggiua[i]] = this.add.image(x_hanggiua + 60*i, y_hanggiua, 'key_' + hanggiua[i]).setVisible(false);
			x_hanggiua += 6.5;
		}
		
		var x_hangtren = 284.5;
		var y_hangtren = y_hanggiua - 66;
		for (var i in hangtren) {
			btn_tren[hangtren[i]] = this.add.image(x_hangtren + 60*i, y_hangtren, 'key_' + hangtren[i]).setVisible(false);
			x_hangtren += 6.5;
		}

		var x_hangduoi = 327;
		var y_hangduoi = y_hanggiua + 66.5;
		for (var i in hangduoi) {
			btn_duoi[hangduoi[i]] = this.add.image(x_hangduoi + 60*i, y_hangduoi, 'key_' + hangduoi[i]).setVisible(false);
			x_hangduoi += 6.5;
		}

		var x_hangso = 265;
		var y_hangso = y_hanggiua - 85;
		for (var i in hangso) {
			btn_so[hangso[i]] = this.add.image(x_hangso + 60*i, y_hangso, 'key_' + hangso[i]).setVisible(false);
			x_hangso += 6.5;
		}

		// add grey keys
		this.str = list_lesson[lesson].content
		this.grey_key = shuffle(this.str)

		function shuffle(string) {
			var a = string.split('');
			for(var i = a.length - 1; i > 0; i--) {
				var j = Math.floor(Math.random() * (i + 1));
				var tmp = a[i];
				a[i] = a[j];
				a[j] = tmp;
			}
			return a.join("");
		}

		this.grey_keys = {}
		var x_grey = 280, y_grey = 320;

		// for (var i in this.grey_key) {
		this.limit_grey_keys = this.grey_key.length - loop;
		for (var i = 0; i <= this.limit_grey_keys; i++) {
			this.grey_keys[this.grey_key[i]] = this.physics.add.sprite(x_grey, y_grey, 'grey_' + this.grey_key[i]).setInteractive();
			this.input.setDraggable(this.grey_keys[this.grey_key[i]]);
			
			if (i == 9 || i == 19)
				x_grey = 280;
			else
				x_grey += 80;
		}

		var voice_key = this.sound.add('typewriter');
		var voice_wrong = this.sound.add('voice_wrong');

		// drag grey_key
		this.input.dragDistanceThreshold = 16;

        this.input.on('dragstart', function (pointer, gameObject) {
			// console.log('dragstart')
			gameObject.setAlpha(1.5)
        },this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			// console.log('drag')
            gameObject.x = dragX;
            gameObject.y = dragY;
        });

		this.count = 0;
		let t = this;

		this.input.on('dragend', function (pointer, gameObject, dropped) {
			// console.log('dragend')
			gameObject.clearTint();

			// set grey key to return old x
			if (!dropped) {
				gameObject.x = gameObject.input.dragStartX;
				gameObject.y = gameObject.input.dragStartY;
			}

			// get character of grey_key
			var key = gameObject.texture.key[5];
			var btn_keyboard;

			if (key == '.') {
				btn_keyboard = btn_duoi['.']
			}
			else if (hanggiua.search(key) != -1) {
				btn_keyboard = btn_giua[key]
			}
			else if (hangtren.search(key) != -1) {
				btn_keyboard = btn_tren[key]
			}
			else if (hangduoi.search(key) != -1) {
				btn_keyboard = btn_duoi[key]
			}
			else {
				btn_keyboard = btn_so[key]
			}

			// check if grey_key is draged true
			var x_start = btn_keyboard.x - 20, x_end = btn_keyboard.x + 20;
			var y_start = btn_keyboard.y - 20, y_end = btn_keyboard.y + 20;
			if (pointer.x >= x_start && pointer.x <= x_end && pointer.y >= y_start && pointer.y <= y_end) {
				voice_key.play()
				gameObject.destroy()
				btn_keyboard.setVisible(true)
				t.count += 1;
			}
			else {
				voice_wrong.play()
			}
		});
	}
	update() {
		if (lesson == 'lesson10_2' || lesson == 'lesson14_2') {
			if (this.count == this.str.length)
				this.scene.start('endGame')
		}
		else if (this.count == this.limit_grey_keys + 1) {
			if (loop == 4)
				this.scene.start('endGame')
			else {
				loop += 1;
				this.scene.start('playGame')
			}
		}
	}
}