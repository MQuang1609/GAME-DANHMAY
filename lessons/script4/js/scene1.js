var blazewarriorsstatusgame = false;
var music;
var lesson = document.getElementsByClassName("lesson")[0].id;

class scene1 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('start','assets/start.png');
		this.load.image('bg', 'assets/background.png');	
		this.load.image('bg_keyboard', 'assets/bg_keyboard.png');
		this.load.image('title', 'assets/title.png');
		this.load.audio('voice_start', 'assets/voice_start.mp3');
		this.load.audio('voice_intro', 'assets/voice_intro.wav');			
		this.load.audio('bgmusic', 'assets/wonder.mp3');	
	}
	create(){	
		music = this.sound.add('bgmusic', {volume: 0.2});
		music.setLoop(true);
		music.play();

		this.sound.add('voice_intro').play();

		this.add.image(600, 350, 'bg');
		this.add.image(850, 120, 'title');
		
		var bg_keyboard = this.add.image(470, 360, 'bg_keyboard');
		this.tweens.add({
			targets: bg_keyboard,
			angle: 5,
			yoyo: true,
			repeat: -1,
			ease: 'Sine.easeInOut'
		});

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		var start = this.add.sprite(600, 640, 'start').setInteractive();
        function loops()
		{
			zoomOut(start, 0.8, 1, 0.01, 10, this);
		}

        start.on('pointerdown', function(){
			// this.sound.add('voice_start').play();
			this.scene.start('playGame');
		}, this);
	}
	update(){	
		
	}
}