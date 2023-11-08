var blazewarriorsstatusgame = false;
var number_star = 0;
var music;
var level = 2;

class scene1 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('bg','assets/background.png');
		this.load.image('title','assets/title.png');
		this.load.image('start', 'assets/start.png');
		this.load.image('intro', 'assets/intro.png');
		this.load.image('machine', 'assets/claw-machine.png');
		this.load.audio('bgmusic', 'assets/game.mp3');
	}
	create(){
		music = this.sound.add('bgmusic');
		music.setLoop(true);
		music.play();
		
		this.add.image(600, 350, 'bg');
		this.add.image(300, 230, 'title');
		this.add.image(850, 350, 'machine');

		var start = this.add.sprite(300, 490, 'start').setInteractive();
		var intro = this.add.sprite(300, 610, 'intro').setInteractive();

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		function loops()
		{
			zoomOut(start, 0.8, 1, 0.01, 10, this);
			zoomOut(intro, 0.8, 1, 0.01, 10, this);
		}

		start.on('pointerdown', function(){
			this.scene.start('playGame');
		}, this);

		intro.on('pointerdown', function(){
			this.scene.start('intro1');
		}, this);
	}
	update(){
		
	}
}

