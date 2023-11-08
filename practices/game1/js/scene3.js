class scene3 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		this.load.image('bg2','assets/background2.png');
		this.load.image('bee','assets/bee.png');
		this.load.image('frame','assets/frame.png');
		this.load.image('3stars','assets/3stars.png');
		this.load.image('2stars','assets/2stars.png');
		this.load.image('1star','assets/1star.png');
		this.load.image('restart','assets/restart.png');
	}
	create(){
		blazewarriorsstatusgame = true;

		this.add.image(600, 350, 'bg2');

		var x_bee = 240;
		for (var i = 0; i < 7; i++) {
			this.add.image(x_bee, 100, 'bee');
			x_bee += 100
		}
		
		this.add.image(600, 350, 'frame');

		var y_text = 345;
		const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
		const screenCenterY = this.cameras.main.worldView.y + this.cameras.main.height / 2;
		
		var end_level = ''	

		if (counttrue1 <= 20) {
			number_star = 1;
			this.add.image(600, 250, '1star')
			end_level = 'Hoàn thành'	
		}
		else if (counttrue1 <= 40) {
			number_star = 2;
			this.add.image(600, 250, '2stars')	
			end_level = 'Khá'	
		}
		else if (counttrue1 > 40) {
			number_star = 3;
			this.add.image(600, 250, '3stars')	
			end_level = 'Xuất sắc'	
		}
		
		this.add.text(screenCenterX, y_text, end_level, {fontSize: '65px', fontFamily: 'Calibri', color: 'black'}).setOrigin(0.5);
		this.add.text(screenCenterX, y_text + 70, 'Tổng ký tự: ' + counttrue1, {fontSize: '65px', fontFamily: 'Calibri', color: 'black'}).setOrigin(0.5);
		this.add.text(screenCenterX, y_text + 140, 'Tổng lỗi sai: ' + countfalse1, {fontSize: '65px', fontFamily: 'Calibri', color: 'black'}).setOrigin(0.5);

		var restart = this.add.sprite(600, 635, 'restart').setInteractive();
		restart.on('pointerdown', function(){
			counttrue1 = 0;
			countfalse1 = 0;
			countloop1 = 0;
			this.scene.start('playGame1');
		}, this);
	}
	update(){
		
		
	}
}