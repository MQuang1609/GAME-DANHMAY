class scene0_2 extends Phaser.Scene{
	constructor(){
		super('intro2');
	}
	preload(){
		this.load.image('bg','assets/background.png');
		this.load.image('intro_text', 'assets/intro_text.png');
		this.load.image('arrow2','assets/arrow2.png');
		this.load.audio('voice_instruct', 'assets/voice/instruct.wav');
	}
	create(){
		var music1 = this.sound.add('voice_instruct');
		music1.play();

		this.add.image(600, 350, 'bg');
		this.add.image(600, 350, 'intro_text');
		var arrow2 = this.add.sprite(600, 500, 'arrow2').setInteractive();

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		function loops()
		{
			zoomOut(arrow2, 0.8, 1, 0.01, 10, this);
		}

		arrow2.on('pointerdown', function(){
			this.scene.start('introGame');
		}, this);
	}
	update(){
		
		
	}
}

