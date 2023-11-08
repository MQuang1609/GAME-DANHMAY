var qes = [];
var ans = [];
var correct = [0,0,0,0,0,0,0];

let gameOptions = {
    initialTime: 60
}

class scene2 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}
	preload(){
		this.load.image('keyboard','assets/empty_keyboard.png');
		this.load.image('bg2', 'assets/background2.png')
		this.load.image('energycontainer', 'assets/energycontainer.png');
        this.load.image('energybar', 'assets/energybar.png');
		this.load.image('tick', 'assets/tick.png')
		this.load.audio('voice_instruct1', 'assets/voice_instruct1.wav');
		this.load.audio('voice_timeout', 'assets/voice_timeout.wav');

		for (var i = 1; i <= 7; i++) {
			this.load.image('qes' + i ,'assets/qes' + i + '.png');
			this.load.image('ans' + i ,'assets/ans' + i + '.png');
		}
	}
	create(){	
		this.sound.add('voice_instruct1').play();

		this.add.image(600, 350, 'bg2');
		this.add.image(600, 400, 'keyboard');
		
		ans[0] = this.physics.add.sprite(100, 350, 'ans1').setInteractive();
		ans[1] = this.physics.add.sprite(100, 430, 'ans2').setInteractive();
		ans[2] = this.physics.add.sprite(100, 510, 'ans3').setInteractive();
		ans[4] = this.physics.add.sprite(800, 610, 'ans4').setInteractive();
		ans[3] = this.physics.add.sprite(400, 610, 'ans5').setInteractive();
		ans[5] = this.physics.add.sprite(1110, 315, 'ans6').setInteractive();
		ans[6] = this.physics.add.sprite(665, 170, 'ans7').setInteractive();

		for (var i = 0; i < 7; i++) {
			qes[i] = this.physics.add.sprite(180, 200, 'qes' + (i + 1)).setInteractive();
			this.input.setDraggable(qes[i])
		}

		this.input.on('dragstart', function (pointer, gameObject) {
            // gameObject.setTint(0xff0000);
        },this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
			gameObject.x = dragX;
            gameObject.y = dragY;
        });

		this.input.on('dragenter', function (pointer, _gameObject, _dropZone) {
			// gameObject.setTint(0x00ff00);
		});

        this.input.on('dragleave', function (pointer, _gameObject, _dropZone) {
			gameObject.clearTint();
		});
	
	    this.input.on('drop', function (pointer, gameObject, dropZone) {
			gameObject.x = dropZone.x;
			gameObject.y = dropZone.y;
	
			gameObject.input.enabled = false;
	
			gameObject.clearTint();
		});


		this.timeLeft = gameOptions.initialTime;

        // the energy container. A simple sprite
    	//   let energyContainer = this.add.sprite(game.config.width / 2, game.config.height / 2, "energycontainer");
	 	let energyContainer = this.add.sprite(600, 50, "energycontainer");

        // the energy bar. Another simple sprite
        let energyBar = this.add.sprite(energyContainer.x + 46, energyContainer.y, "energybar");

        // a copy of the energy bar to be used as a mask. Another simple sprite but...
        this.energyMask = this.add.sprite(energyBar.x, energyBar.y, "energybar");

        // ...it's not visible...
        this.energyMask.visible = false;

        // and we assign it as energyBar's mask.
        energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energyMask);

        // a boring timer.
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: function(){
                this.timeLeft --;

                // dividing enery bar width by the number of seconds gives us the amount
                // of pixels we need to move the energy bar each second
                let stepWidth = this.energyMask.displayWidth / gameOptions.initialTime;

                // moving the mask
                this.energyMask.x -= stepWidth;
                if(this.timeLeft == 0){
					this.sound.add('voice_timeout').play();
					for (var i = 0; i < 7; i++)
						correct[i] = 0
                    this.scene.start("playGame")
                }
            },
            callbackScope: this,
            loop: true
        });
	}
	update(){
		var count = 0
		for (var i = 0; i < 7; i++) {
			if ((ans[i].x - 50 < qes[i].x) && (qes[i].x < ans[i].x + 50) && (ans[i].y - 50 < qes[i].y) && (qes[i].y < ans[i].y + 50)) {
				qes[i].visible = false
				ans[i].visible = false
				this.add.image(ans[i].x, ans[i].y, 'tick')
				correct[i] = 1			}
			if (correct[i] == 1) {
				count ++
			}
		}
		if (count == 7)
			this.scene.start('endGame')
	}
}