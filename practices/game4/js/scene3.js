class scene3 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		// background
		this.load.image('bg', 'assets/background.png');
		this.load.image('machine3', 'assets/claw-machine3.png');
		this.load.image('bee', 'assets/bee.png');
		this.load.image('rabbit', 'assets/rabbit.png');
		this.load.image('coins', 'assets/coins.png');
		this.load.image('1star','assets/1star.png');
		this.load.image('2star', 'assets/2star.png');
		this.load.image('3star', 'assets/3star.png');
		this.load.image('replay', 'assets/replay.png');
    }
	create(){	
		blazewarriorsstatusgame = true;
		number_star = n_stars;
		console.log(number_star)

        this.add.image(600, 350, 'bg');
		this.add.image(600, 350, 'machine3');
		this.add.image(180, 570, 'coins');
		this.add.image(160, 350, 'bee');
		this.add.image(1050, 510, 'rabbit');

		var x_star = 605, y_star = 350;
     	var star3 = this.add.image(x_star, y_star, '3star').setInteractive();
		star3.visible = false;
		var star2 = this.add.image(x_star, y_star, '2star').setInteractive();
		star2.visible = false;
		var star = this.add.image(x_star, y_star, '1star').setInteractive();
		star.visible = false;

		if (number_star == 3) {
			star3.visible = true;
		}
		else if (number_star == 2) {
			star2.visible = true;
		}
		else {
			star.visible = true;
		}

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		
		function loops()
		{
			zoomOut(star3, 0.8, 1.1, 0.01, 10, this);
			zoomOut(star2, 0.8, 1.1, 0.01, 10, this);
			zoomOut(star, 0.8, 1.1, 0.01, 10, this);
		}

		var replay = this.add.sprite(780, 630, 'replay').setInteractive();
		replay.on('pointerdown', function(){
			this.scene.start('introGame');
		}, this);
	}
	update(){	
		number_star = n_stars;
	}

}