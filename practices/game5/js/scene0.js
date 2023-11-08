var blazewarriorsstatusgame = false;
var number_star = 0;
var music;
var level = document.getElementsByClassName("level")[0].id;

class scene0 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('bg9','assets/bg9.png');
		this.load.image('start', 'assets/start.png');
		this.load.image('instruct', 'assets/instruct.png');
		this.load.audio('bgmusic', 'assets/game.mp3');
	}
	create(){
		music = this.sound.add('bgmusic');
		music.setLoop(true);
		music.play();
		
		this.add.image(630, 350, 'bg9');
		var start = this.add.sprite(480, 460, 'start').setInteractive();
		var instruct = this.add.sprite(830, 460, 'instruct').setInteractive();

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		
		function loops()
		{
			zoomOut(start, 0.8, 1.1, 0.01, 10, this);
			zoomOut(instruct, 0.8, 1.1, 0.01, 10, this);
		}
		start.on('pointerdown', function(){
			this.scene.start('playGame');
		}, this);
		
		instruct.on('pointerdown', function(){
			music.mute = true;
			this.scene.start('intro1');
		}, this);
	}
	update(){
			
	}
}

