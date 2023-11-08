var music;
var blazewarriorsstatusgame = false;

var lesson = document.getElementsByClassName("lesson")[0].id;
var keys;

class scene1 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('bg', 'assets/background.png');
		this.load.image('bg-title', 'assets/bg-title.png');
		this.load.image('start', 'assets/start.png');
		this.load.audio('light', 'assets/light.mp3');
		this.load.audio('voice_intro', 'assets/voice_intro.wav');

		var alpha = 'ABCDEFGHIJKLMONPQRSTUVWXYZ1234567890'
		for (var i in alpha)
			this.load.image('title_' + alpha[i],'assets/title_keys/' + alpha[i] + '.png');
		this.load.image('title_.','assets/title_keys/dac_biet_cham.png');
		this.load.image('title_;','assets/title_keys/dac_biet_champhay.png');
		this.load.image('title_,','assets/title_keys/dac_biet_phay.png');
		this.load.image('title_/','assets/title_keys/dac_biet_xet.png');

		this.load.image('title_telex','assets/title_telex.png');
		this.load.image('title_vni','assets/title_vni.png');
	}
	create(){	
		this.sound.add('voice_intro').play();

		music = this.sound.add('light', {volume: 0.2});
		music.setLoop(true);
		music.play();

		this.add.image(600, 350, 'bg');

		keys = list_lessons[lesson]['content']
		
		var x_title = 435, y_title = 250;
		if (lesson.search('18') != -1) {
			this.add.image(x_title, y_title, 'title_telex');
		}
		else if (lesson.search('19') != -1) {
			this.add.image(x_title, y_title, 'title_vni');
		}
		else {
			var x_key = keys.length == 4 ? 290 : 390, y_key = 250;
			var title_key = [];
			for (var i in keys) {
				title_key.push(this.add.image(x_key, y_key, 'title_' + keys[i]));
				x_key += 100;
	
				this.tweens.add({
					targets: title_key[i],
					angle: 70,
					yoyo: true,
					repeat: -1,
					ease: 'Sine.easeInOut'
				});
			}
		}
	
		// var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		var start = this.add.sprite(800, 540, 'start').setInteractive();
        
		// function loops()
		// {
		// 	zoomOut(start, 0.8, 1.1, 0.01, 10, this);
		// }
		click5(start, this)

        start.on('pointerdown', function(){
			this.scene.start('playGame');
		}, this);
	}
	update(){	
		
	}

}