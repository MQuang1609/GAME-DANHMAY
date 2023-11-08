var blazewarriorsstatusgame = false;
var number_star = 0;
var music;
var level = document.getElementsByClassName("level")[0].id;

class scene1 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('bg','assets/background.png');
		this.load.image('title', 'assets/title.png');
		this.load.image('start', 'assets/start.png');
		this.load.image('instruct', 'assets/instruct.png');
		this.load.audio('bgmusic', 'assets/game.mp3');
	}
	create(){
		music = this.sound.add('bgmusic');
		music.setLoop(true);
		music.play();
		
		this.add.image(600, 350, 'bg');
		this.add.image(250, 220, 'title');
		var start = this.add.sprite(250, 480, 'start').setInteractive();
		var instruct = this.add.sprite(250, 600, 'instruct').setInteractive();
		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });

		function loops()
		{
			zoomOut(start, 0.8, 1, 0.01, 10, this);
			zoomOut(instruct, 0.8, 1, 0.01, 10, this);
		}
		
		start.on('pointerdown', function(){
			this.scene.start('playGame');
		}, this);

		instruct.on('pointerdown', function(){
			this.scene.start('intro1');
		}, this);
	}
	update(){
			
	}
}

