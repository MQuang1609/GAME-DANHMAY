var music;
var blazewarriorsstatusgame = false;
var lesson = document.getElementsByClassName("lesson")[0].id;

class scene1 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('bg','assets/background1.png');
		this.load.image('start','assets/start.png');
		this.load.audio('bgmusic', 'assets/wonder.mp3');
	}
	create(){	
		music = this.sound.add('bgmusic', {volume: 0.2});
		music.setLoop(true);
		music.play();

		this.add.image(600, 350, 'bg');		

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		var start = this.add.sprite(600, 580, 'start').setScale(0.8).setInteractive();
		function loops()
		{
			zoomOut(start, 0.8, 1.1, 0.01, 10, this);
		}

		start.on('pointerdown', function(){
			this.scene.start('playGame');
		}, this);
	}
	update(){	
		
	}

}