class scene2 extends Phaser.Scene {
	constructor() {
		super('endGame');
	}
	preload() {
		this.load.image('bg3', 'assets/background3.png');
		this.load.image('replay', 'assets/replay.png');

		this.load.image('1star', 'assets/1star.png');
		this.load.image('2star', 'assets/2star.png');
		this.load.image('3star', 'assets/3star.png');
	}
	create() {
		blazewarriorsstatusgame = true;
		
		this.add.image(610, 380, 'bg3');
		var star3 = this.add.image(600, 200, '3star').setScale(0.6).setInteractive();
		star3.visible = false;
		var star2 = this.add.image(600, 200, '2star').setScale(0.6).setInteractive();
		star2.visible = false;
		var star = this.add.image(600, 200, '1star').setScale(0.6).setInteractive();
		star.visible = false;

		var str = 'HOÀN THÀNH';
		if (number_star == 3) {
			star3.visible = true;
			str = 'HOÀN THÀNH XUẤT SẮC';
		}
		else if (number_star == 2) {
			star2.visible = true;
			str = 'HOÀN THÀNH TỐT';
		}
		else
			star.visible = true;

		this.add.text(600, 370, str, {fontSize: 65, fontFamily: 'Arial', color: 'red'}).setOrigin(0.5);

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		function loops() {
			zoomOut(star3, 0.8, 1, 0.01, 10, this);
			zoomOut(star2, 0.8, 1, 0.01, 10, this);
			zoomOut(star, 0.8, 1, 0.01, 10, this);
		}

		var replay = this.add.sprite(1000, 200, 'replay').setInteractive();
		replay.on('pointerdown', function(){
			if (level > 3) {
				for (var i in answered)
					answered[i] = -1;
			}
			else {
				for (var i in checkHeart)
					checkHeart[i].value = -1;
			}
			number_star = 0;
			loop = 0;
			time = 120;
			this.scene.start('introGame');
		}, this);
	}
	update() {

	}

}