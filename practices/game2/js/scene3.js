class scene3 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		this.load.image('bg3','assets/background.png');
		this.load.image('final_border', 'assets/final_border.png');
		this.load.image('replay', 'assets/replay.png');
		this.load.image('1star','assets/1star.png');
		this.load.image('2star', 'assets/2star.png');
		this.load.image('3star', 'assets/3star.png');
    }
	create(){	
		blazewarriorsstatusgame = true;
		var str = ''

        var bg3 = this.add.image(600, 350, 'bg3');
		bg3.alpha = 0.5;
		this.add.image(600, 350, 'final_border');

		// var width = game.config.width
		// var height = game.config.height
		var x_star = 600, y_star = 260;
		var star3 = this.add.image(x_star, y_star, '3star').setInteractive();
		star3.visible = false;
		var star2 = this.add.image(x_star, y_star, '2star').setInteractive();
		 star2.visible = false;
		var star = this.add.image(x_star, y_star, '1star').setInteractive();
		star.visible = false;

		// edit điều kiện nhận sao
		if (score <= sum * 1/3) {
			star.visible = true;
			number_star = 1;
			str = 'HOÀN THÀNH';
		}
		else if (score <= sum * 2/3) {
			star2.visible = true;	
			number_star = 2;
			str = 'KHÁ';
		}
		else {
			star3.visible = true;
			number_star = 3;
			str = 'XUẤT SẮC';
		}

		// show score
		this.add.text(600, 390, str,  {fontSize: '65px', fontFamily: 'Arial', color: 'red'}).setOrigin(0.5);
		this.add.text(600, 470, 'Số bóng: ' + score,  {fontSize: '55px', fontFamily: 'Arial', color: 'black'}).setOrigin(0.5);
		// this.add.text(600, 550, 'Lỗi sai: ' + hearts.length,  {fontSize: '55px', fontFamily: 'Arial', color: 'black'}).setOrigin(0.5);

		var replay = this.add.sprite(600, 560, 'replay').setInteractive();

		replay.on('pointerdown', function(){
			this.scene.start('introGame');
		}, this);

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		
		function loops()
		{
			zoomOut(star3, 0.8, 1, 0.01, 10, this);
			zoomOut(star2, 0.8, 1, 0.01, 10, this);
			zoomOut(star, 0.8, 1, 0.01, 10, this);
			zoomOut(replay, 0.8, 1, 0.01, 10, this);
		}
	}
	update(){	
		
	}

}