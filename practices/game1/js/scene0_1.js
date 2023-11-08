class scene0_1 extends Phaser.Scene{
	constructor(){
		super('intro1');
	}
	preload(){
		this.load.image('bg0_1','assets/background_0_1.png');
		this.load.image('arrow','assets/arrow.png');
		for (var i = 1; i <= 4; i++) {
			this.load.image('story' + i,'assets/story' + i + '.png');			// picture story
			this.load.audio('voice' + i, 'assets/voice/story' + i +  '.wav');	// voice story
		}
	}
	create(){
		this.sound.add('voice1').play();
				
		this.add.image(600, 350, 'bg0_1');

		var story1 = this.add.image(320, 175, 'story1');
		
		var story2 = this.add.image(880, 175, 'story2'); story2.visible = false
		var story3 = this.add.image(320, 500, 'story3'); story3.visible = false
		var story4 = this.add.image(880, 500, 'story4'); story4.visible = false

		var arrow1 = this.add.sprite(story1.x + 250, story1.y + 150, 'arrow').setInteractive();
		var arrow2 = this.add.sprite(story2.x + 250, story2.y + 150, 'arrow').setInteractive(); arrow2.visible = false
		var arrow3 = this.add.sprite(story3.x + 250, story3.y + 150, 'arrow').setInteractive(); arrow3.visible = false
		var arrow4 = this.add.sprite(story4.x + 250, story4.y + 150, 'arrow').setInteractive(); arrow4.visible = false

		arrow1.on('pointerdown', function(){
			story2.visible = true
			arrow1.visible = false
			arrow2.visible = true
			this.sound.add('voice2').play();
		}, this);

		arrow2.on('pointerdown', function(){
			story3.visible = true
			arrow2.visible = false
			arrow3.visible = true
			this.sound.add('voice3').play();
		}, this);

		arrow3.on('pointerdown', function(){
			story4.visible = true
			arrow3.visible = false
			arrow4.visible = true
			this.sound.add('voice4').play();
		}, this);

		arrow4.on('pointerdown', function(){
			this.scene.start('intro2');
		}, this);
	}
	update(){
		
	}
}

