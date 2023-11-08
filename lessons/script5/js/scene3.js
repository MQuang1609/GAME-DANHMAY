class scene3 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		this.load.image('bg3','assets/background3.png');
		this.load.image('stars','assets/stars.png');
    }
	create(){	
		blazewarriorsstatusgame = true;

        this.add.image(600, 350, 'bg3');
		var stars = this.add.image(600, 280, 'stars');

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
        function loops()
		{
			zoomOut(stars, 0.8, 1, 0.01, 10, this);
		}
	}
	update(){	
		
	}

}