class scene3 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		this.load.image('bg3','assets/background3.png');
		this.load.image('stars','assets/3stars.png');
		this.load.audio('voice_congrat', 'assets/voice_congrat.wav');
    }
	create(){	
		blazewarriorsstatusgame = true;
		
		this.sound.add('voice_congrat').play();

    	this.add.image(600, 350, 'bg3');
		this.add.text(420, 250, 'XUẤT SẮC', {fontSize:70, fontFamily: 'Arial', color:'#ff0000'}).setOrigin(0.5);
       	var stars = this.add.image(410, 400, 'stars');

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
        function loops()
		{
			zoomOut(stars, 0.8, 1.1, 0.01, 10, this);
		}
	}
	update(){	
		
	}
}