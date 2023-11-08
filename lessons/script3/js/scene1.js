var blazewarriorsstatusgame = false;
var music;

var lesson = document.getElementsByClassName("lesson")[0].id;

class scene1 extends Phaser.Scene{
	constructor(){
		super('introGame');
	}
	preload(){
		this.load.image('bg', 'assets/background1.png');
		this.load.image('start','assets/start.png');
		this.load.audio('tune', 'assets/tune.mp3');
		this.load.audio('voice_start', 'assets/voice_start.mp3');
		this.load.audio('voice_intro', 'assets/voice_intro.mp3');
	}
	create(){
		music = this.sound.add('tune', {volume: 0.2});
		music.setLoop(true);
		music.play();

		this.sound.add('voice_intro').play();

		var width = game.config.width
		var height = game.config.height

        this.add.image(width/2, height/2, 'bg');

        var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		
        var start = this.add.sprite(width/2, 550, 'start').setInteractive();
        function loops()
		{
			zoomOut(start, 0.7, 1, 0.01, 5, this);
		}
        
        start.on('pointerdown', function(){
			this.sound.add('voice_start').play();
			this.scene.start('playGame');
		}, this);
	}
	update(){	
		
	}
}