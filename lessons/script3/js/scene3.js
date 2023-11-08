class scene3 extends Phaser.Scene{
	constructor(){
		super('endGame');
	}
	preload(){
		this.load.image('bg3', 'assets/background3.png');
		this.load.image('1star','assets/1star.png');
		this.load.image('2star', 'assets/2star.png');
		this.load.image('3star', 'assets/3star.png');
		this.load.image('replay','assets/replay.png');
		this.load.audio('voice_replay', 'assets/voice_replay.mp3');
		this.load.audio('voice_hoanthanh', 'assets/voice_hoanthanh.mp3');
		this.load.audio('voice_xuatsac', 'assets/voice_xuatsac.mp3');
	}
	create(){
		var width = game.config.width;
		var height = game.config.height;

		this.add.image(width/2, height/2, 'bg3');

		var star3 = this.add.image(width/2, height/2 - 120, '3star'); star3.visible = false
		var star2 = this.add.image(width/2, height/2 - 120, '2star'); star2.visible = false
		var star = this.add.image(width/2, height/2 - 120, '1star'); star.visible = false

		var right_answer = ans_jar.filter(x => x==1).length
		if (right_answer == 5)
			star3.visible = true;
		else if (right_answer >= 3)
			star2.visible = true;
		else
			star.visible = true;

		if (right_answer == 5) {
			blazewarriorsstatusgame = true;
			this.sound.add('voice_xuatsac').play();
			this.add.text(width/2, 420, 'HOÀN THÀNH XUẤT SẮC', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
			this.add.text(width/2, 470, 'CHÚC MỪNG EM ĐÃ VƯỢT QUA CÁC CÂU HỎI VÀ', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
			this.add.text(width/2, 520, 'GIÚP CHỊ ONG TÌM ĐƯỢC NHIỀU MẬT NHẤT NHÉ!', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
		}
		else {
			this.sound.add('voice_hoanthanh').play();
			this.add.text(width/2, 400, 'CỐ LÊN!', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
			this.add.text(width/2, 450, 'EM CẦN TRẢ LỜI ĐÚNG TẤT CẢ CÁC CÂU HỎI', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
			this.add.text(width/2, 500, 'ĐỂ HOÀN THÀNH HOẠT ĐỘNG THỬ TÀI TRÍ NHỚ', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
			this.add.text(width/2, 550, 'VÀ GIÚP CHỊ ONG TÌM ĐƯỢC NHIỀU MẬT NHẤT NHÉ!', {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);
		}

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		var replay = this.add.sprite(width/2, height/2 + 280, 'replay').setInteractive();
        function loops()
		{
			zoomOut(replay, 0.5, 0.8, 0.01, 5, this);
		}

		replay.on('pointerdown', function(){
			// this.sound.add('voice_replay').play();
			for(var i = 0; i < limit; ++i) {
				ans_jar[i] = -1;
				loop = 0;
				nums = []
				questions = [];
			}
			this.scene.start('introGame');
		}, this);
	}
	update(){
		
	}
}