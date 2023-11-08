class scene0_2 extends Phaser.Scene{
	constructor(){
		super('intro2');
	}
	preload(){
		this.load.image('bg','assets/background.png');
		this.load.image('instruct_border', 'assets/instruct_border.png');
		this.load.image('instruct_text', 'assets/instruct_text.png');
		this.load.image('arrow2','assets/arrow2.png');
		this.load.audio('voice_instruct', 'assets/voice/instruct.wav');
	}
	create(){
		var music1 = this.sound.add('voice_instruct');
		music1.play();
		
		var bg = this.add.image(600, 350, 'bg');
		bg.alpha = 0.5;

		this.add.image(650, 330, 'instruct_border');
		this.add.image(750, 350, 'instruct_text');
		var arrow2 = this.add.sprite(750, 550, 'arrow2').setInteractive();

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		function loops()
		{
			zoomOut(arrow2, 1, 1.3, 0.03, 10, this);
		}

		arrow2.on('pointerdown', function(){
			this.scene.start('introGame');
		}, this);
	}
	update(){
		
		
	}
}

