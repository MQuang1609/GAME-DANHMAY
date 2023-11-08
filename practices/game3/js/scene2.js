class scene2 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		this.load.image('bg4','assets/background4.png');
		this.load.image('jar','assets/jar.png');
		this.load.image('replay', 'assets/replay.png');
		this.load.image('text_hoanthanh', 'assets/text_hoanthanh.png');
		this.load.image('text_xuatsac', 'assets/text_xuatsac.png');
		this.load.image('1star', 'assets/1star.png');
		this.load.image('2star', 'assets/2star.png');
		this.load.image('3star', 'assets/3star.png');
    }
	create(){	
		blazewarriorsstatusgame = true;
		
		this.add.image(600, 350, 'bg4');
		this.add.image(100, 100, 'jar').setScale(0.4);
		this.add.image(100, 600, 'jar').setScale(0.4);
		this.add.image(1100, 100, 'jar').setScale(0.4);
		this.add.image(1100, 600, 'jar').setScale(0.4);
		this.add.text(750, 455, time + ' giây', {fontSize:50, fontFamily: 'Arial', color:'#000000'}).setOrigin(0.5);
		
		var star3 = this.add.image(600, 250, '3star').setScale(0.6).setInteractive();
		star3.visible = false;
		var star2 = this.add.image(600, 250, '2star').setScale(0.6).setInteractive();
		star2.visible = false;
		var star = this.add.image(600, 250, '1star').setScale(0.6).setInteractive();
		star.visible = false;

		if (loop == 8) {
			number_star = 3;
			star3.visible = true;	
		}
		else if (loop > 4) {
			number_star = 2;
			star2.visible = true;
		}
		else {
			number_star = 1;
			star.visible = true;
		}
		this.add.image(600, 370, number_star == 3 ? 'text_xuatsac' : 'text_hoanthanh');
		
		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		function loops() {
			zoomOut(star3, 0.8, 1, 0.01, 10, this);
			zoomOut(star2, 0.8, 1, 0.01, 10, this);
			zoomOut(star, 0.8, 1, 0.01, 10, this);
		}
		
		var replay = this.add.sprite(600, 550, 'replay').setInteractive();
		replay.on('pointerdown', function(){
			// reset
			number_star = 0;
			loop = 0;
			time = 0;
			nums = [];
			words = []
			this.scene.start('introGame');
		}, this);
	}
	update(){	
		
	}

}