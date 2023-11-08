var nums = []
var questions = [];
var loop = 0;
var limit = 5;
var ans_jar = [-1,-1,-1,-1,-1]

class scene2 extends Phaser.Scene{
	constructor(){
		super('playGame');
	}
	preload(){
		this.load.image('bg2', 'assets/background2.png');
		this.load.image('true','assets/true.png');
		this.load.image('false','assets/false.png');
		this.load.image('continue1','assets/continue1.png');
		this.load.image('jar','assets/jar.png');
		this.load.image('bee','assets/bee-jar.png');
		this.load.image('rect_box','assets/box.png');
		this.load.image('rect_box2','assets/box2.png');
		this.load.image('rect_box3','assets/box3.png');

		// label question
		for (var i = 1; i <= 5; i++)
		this.load.image('label' + i,'assets/label' + i + '.png');

		// image of question
		if (lesson == 1) {
			this.load.image('img_phimso','assets/img_question/img_phimso.png');
			this.load.image('img_spacebar_1','assets/img_question/img_spacebar.png');
			this.load.image('img_spacebar_2','assets/img_question/img_spacebar.png');
			this.load.image('img_enter_1','assets/img_question/img_enter.png');
			this.load.image('img_enter_2','assets/img_question/img_enter.png');
		}
		else if (lesson == 2) {
			this.load.image('img_phimgai_1','assets/img_question/img_phimgai_1.png');
			this.load.image('img_phimgai_2','assets/img_question/img_phimgai_2.png');
			this.load.image('img_phimgai_3','assets/img_question/img_phimgai_3.png');
			this.load.image('img_hangtren','assets/img_question/img_hangtren.png');
			this.load.image('img_hangduoi','assets/img_question/img_hangduoi.png');
			this.load.image('img_hanggiua','assets/img_question/img_hanggiua.png');
			this.load.image('img_hangphim','assets/img_question/img_hangphim.png');
		}
		// keyboard
		var list_alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ,./;0123456789';
		for (var i in list_alpha) {
			if (list_alpha[i] == ',')
				this.load.image('img_' + list_alpha[i],'assets/keyboard/dac_biet_phay.png');
			else if (list_alpha[i] == '.')
				this.load.image('img_' + list_alpha[i],'assets/keyboard/dac_biet_cham.png');
			else if (list_alpha[i] == '/')
				this.load.image('img_' + list_alpha[i],'assets/keyboard/dac_biet_xet.png');
			else if (list_alpha[i] == ';')
				this.load.image('img_' + list_alpha[i],'assets/keyboard/dac_biet_champhay.png');
			else
				this.load.image('img_' + list_alpha[i],'assets/keyboard/' + list_alpha[i] + '.png');
		}
		this.load.image('taytrai','assets/taytrai.png');
		this.load.image('tayphai','assets/tayphai.png');
		this.load.image('img_qkey','assets/img_question/img_qkey.png');
		if (lesson == 18 || lesson == 25) {
			for (var i in accents2) {
				this.load.image('img_' + accents2[i],'assets/img_question/img_' +  accents2[i] + '.png');
				this.load.image('img_q_' + accents2[i],'assets/img_question/img_q_' +  accents2[i] + '.png');
			}
		}

		// right and wrong
		this.load.image('wrong','assets/wrong.png');
		this.load.image('right','assets/right.png');
		this.load.audio('voice_wrong', 'assets/voice_wrong.mp3');
		this.load.audio('voice_right', 'assets/voice_right.mp3');
	}
	create(){
		blazewarriorsstatusgame = false;
		
		var width = game.config.width;
		var height = game.config.height;

		// background
		this.add.image(width/2, height/2, 'bg2');
		
		// jars
		var x_jar = 200, x_step = 200;
		for (var i = 0; i < 5; i++) {
			var jar = this.add.image(x_jar + x_step*i, height - 620, 'jar');
			if (i > loop)
				jar.alpha = 0.5;
			if (i < loop) {
				if (ans_jar[i] == 1)
					this.add.image(jar.x, jar.y, 'right');
				else
					this.add.image(jar.x, jar.y, 'wrong');
			}
		}

		// bee below jar
		this.add.image(x_jar + x_step*loop, height - 540, 'bee');

		// label question
		this.add.image(width/2, height - 450, 'label' + (loop + 1));
		
		// create questions
		if (loop == 0) {
			// make random numbers
			while (nums.length < limit) {
				var num = Math.floor(Math.random() * listriddle.length);
				if (nums.indexOf(num) == -1)
					nums.push(num)
			}
			// add questions
			for (var i in nums) {
				questions.push(listriddle[nums[i]])			
			}
		}
		
		// add question
		var question = questions[loop].question;
		question = question.split('/n');
		this.add.text(width - width/3, height - height/2.2, question, {fontSize:40, fontFamily: 'Arial', color:'black'}).setOrigin(0.5);

		// add image of question
		this.number = nums[loop];
		if (lesson == 1) {
			if (this.number < 78) {
				// câu hỏi liên quan đến phím thuộc hàng nào
				this.rect_box = this.add.image(width/4, height - height/3, 'rect_box');
				this.add.text(this.rect_box.x + 20, this.rect_box.y, questions[loop].img[3], {fontSize:100, fontFamily: 'Arial', color:'#ECA515'}).setOrigin(0.5);
			}
			else  {
				this.add.image(width/4, height - height/3, questions[loop].img);
			}
		}
		else if (lesson == 2) {
			this.add.image(width/4, height - height/3, questions[loop].img);
		}
		else if (lesson >= 3 && lesson <= 17) {
			// add khung
			this.rect_box2 = this.add.image(width/4 - 30, 500, 'rect_box2');

			var fingers = ['uttrai', 'aputtrai', 'giuatrai', 'trotrai', 'caitrai','utphai', 'aputphai', 'giuaphai', 'trophai', 'caiphai']
			var index_key = [
				{finger: 'uttrai', x: 180, y: 520},
				{finger: 'aputtrai', x: 200, y: 450},
				{finger: 'giuatrai', x: 265, y: 415},
				{finger: 'trotrai', x: 330, y: 410},
				{finger: 'caitrai', x: 420, y: 495},
				// chưa set tay phải
				{finger: 'utphai', x: 450, y: 515},
				{finger: 'aputphai', x: 425, y: 445},
				{finger: 'giuaphai', x: 365, y: 405},
				{finger: 'trophai', x: 300, y: 410},
				{finger: 'caiphai', x: 200, y: 490},
			]
			
			this.img = questions[loop].img.split('_');				
			var finger = fingers.indexOf(this.img[1])
			// các câu hỏi liên quan đến "phím ... dùng ngón ... đúng hay sai?"
			var type1 = 20;
			var type2 = 24;
			if (alpha.length == 2) {
				type1 = 10;
				type2 = 12;
			}
			if (this.number < type1)
				this.add.image(index_key[finger].x, index_key[finger].y, 'img_' + this.img[2]);

			// các câu hỏi liên quan đến "ngón ... gõ phím nào?"
			else if (this.number < type2) {
				this.add.image(index_key[finger].x, index_key[finger].y, 'img_qkey');
				// console.log(this.img[1]) -> ví dụ: ngón trỏ phải
			}
			// các câu hỏi liên quan đến các phím dùng đúng ngón tay
			else {
				var start = (hand == 'tay trái') ? 0 : 8;
				var end = (hand == 'tay trái') ? 3 : 5;
				var space = (hand == 'tay trái') ? 1 : -1;

				var index_char = 0;
				for (var i = start; (hand == 'tay trái') ? (i <= end) : (i >= end); i = i + space) {
					this.add.image(index_key[i].x, index_key[i].y, 'img_' + this.img[2][index_char]);
					index_char ++;
				}
			}
			// add tay trái or tay phải
			// if là phím thứ hai trong bài chỉ dạy hai phím -> hand = tay phải
			if (lesson_hai_phim.search(alpha_lesson[lesson - 3]) != -1) {
				if ((this.number >= 5 && this.number <= 9) || this.number == 11) {
					hand = 'tay phải'
				}
				else {
					hand = 'tay trái'
				}
			}
			this.add.image(this.rect_box2.x + 45, this.rect_box2.y + 32, (hand == 'tay trái') ? 'taytrai' : 'tayphai');
		}
		// trắc nghiệm gõ dấu kiểu TELEX VA VNI
		else if (lesson == 18 || lesson == 25) {
			this.rect_box2 = this.add.image(width/4 - 30, 500, 'rect_box2');
			if (this.number < 10)
				this.add.image(this.rect_box2.x + 30, this.rect_box2.y - 20, questions[loop].img);
			else {
				var new_img = questions[loop].img.split('_')
				// chữ
				this.add.image(this.rect_box2.x + 60, this.rect_box2.y + 40, 'img_' + new_img[1]).setScale(1.5);
				// thanh dấu
				this.add.image(this.rect_box2.x, this.rect_box2.y - 50, 'img_' + new_img[2]).setScale(1.5);
			}
		}

		// show button continue when click answer
		var bt_continue = this.add.sprite(width - 350, height - 50, 'continue1').setInteractive();
		bt_continue.visible = false

		var timedEvent = this.time.addEvent({ delay: 1000, callback: loops, callbackScope: this, loop: true });
		
        function loops()
		{
			zoomOut(bt_continue, 0.8, 1.1, 0.01, 10, this);
		}
        
        bt_continue.on('pointerdown', function(){
			loop += 1;
			if (loop < limit)
				this.scene.start('playGame');
			else
				this.scene.start('endGame');
		}, this);

		// bee true/false
		var yes = this.add.sprite(width/2 + 50, 530, 'true').setInteractive();
		var no = this.add.sprite(width/2 + 300, 530, 'false').setInteractive();

		// câu hỏi có nhiều đáp án
		if ((lesson == 2 && this.number == 6) || (lesson >= 3 && lesson <= 17 && this.number >= type1 && this.number < type2) || ((lesson == 25 || lesson == 18) && this.number < 10)) {
			yes.visible = false;
			no.visible = false;

			this.rect_box3 = this.add.image(width/2 + 250, 520, 'rect_box3');
			var btn = []

			// các đáp án liên quan đến bàn tay đặt ở hàng phím cố định
			if (lesson == 2) {
				this.rect_box3.visible = false;

				var row = ['hangtren', 'hanggiua', 'hangduoi'];
				var x_answer = width/2;
				for (var i in row) {
					btn.push(
						{
							image: this.add.sprite(x_answer, 550, 'img_' + row[i]).setScale(0.6).setInteractive(),
							answer: (row[i] == questions[loop].answer) ? true : false
						}
					);

					if (row[i] == questions[loop].answer)
						this.btn_answer = i

					x_answer += 200;
				}
			}

			// các đáp án liên quan đến các phím dùng đúng ngón tay
			if (lesson >= 3 && lesson <= 17 && this.number >= type1 && this.number < type2) {
				var x_alpha = width/2 + 50;
				for (var i in alpha) {
					btn.push(
						{
							image: this.add.sprite(x_alpha, 550, 'img_' + alpha[i]).setScale(1.2).setInteractive(),
							answer: (alpha[i] == questions[loop].answer) ? true : false
						}
					);

					if (alpha[i] == questions[loop].answer)
						this.btn_answer = i

					x_alpha += 110;
				}
			}
			else if ((lesson == 18 || lesson == 25) && this.number < 10) {
				var x_accent = width/2 + 40;
				var answer_accent = questions[loop].answer
				if (this.number > 4) {
					for (var i in accents2) {
						btn.push(
							{
								image: this.add.sprite(x_accent, 550, 'img_' + accents2[i]).setInteractive(),
								answer: answer_accent == accents2[i] ? true : false
							}
						);
						x_accent += 90;
						if (answer_accent == accents2[i])
							this.btn_answer = i
					}
				}
				else {
					for (var i = 0; i < 5; i++) {
						btn.push(
							{
								image: this.add.sprite(x_accent, 550, 'img_' + (lesson == 18 ? answer_telex[i] : (i+1))).setInteractive(),
								answer: (answer_accent == (lesson == 18 ? answer_telex[i] : (i+1))) ? true : false
							}
						);
						if (answer_accent == (lesson == 18 ? answer_telex[i] : (i+1)))
							this.btn_answer = i
						x_accent += 90;
					}
				}
			}
			btn[0].image.on('pointerdown', function(){ show_answer(0)}, this)
			btn[1].image.on('pointerdown', function(){ show_answer(1)}, this)
			if (btn.length > 2) {
				btn[2].image.on('pointerdown', function(){ show_answer(2)}, this)
				if (btn.length > 3)
					btn[3].image.on('pointerdown', function(){ show_answer(3)}, this)
			}
			if (btn.length == 5)
				btn[4].image.on('pointerdown', function(){ show_answer(4)}, this)
			let t = this;
			function show_answer(index_btn) {
				var img = btn[index_btn].image
				// true answer
				if (index_btn == t.btn_answer) {
					t.sound.add('voice_right').play();
					t.add.image(img.x, img.y, 'right').setScale(0.8);
					ans_jar[loop] = 1;
				}
				// wrong answer
				else {
					t.sound.add('voice_wrong').play();
					t.add.image(img.x, img.y, 'wrong').setScale(0.8);
					ans_jar[loop] = 0;
				}
				for (var i in btn) {
					if (i != index_btn) {
						btn[i].image.visible = false;
					}
				}
				bt_continue.visible = true;
			}
		}

		this.answer = questions[loop].answer
		// true answer
		if (this.answer == true) {
			yes.on('pointerdown', function(){
				this.add.image(yes.x, yes.y, 'right');
				this.sound.add('voice_right').play();
				ans_jar[loop] = 1;
				no.visible = false;
				bt_continue.visible = true;
			}, this);
	
			no.on('pointerdown', function(){
				this.add.image(no.x, no.y, 'wrong');
				this.sound.add('voice_wrong').play();
				ans_jar[loop] = 0;
				yes.visible = false;
				bt_continue.visible = true;
			}, this);
		}
		// wrong answer
		else if (this.answer == false) {
			yes.on('pointerdown', function(){
				this.add.image(yes.x, yes.y, 'wrong');
				this.sound.add('voice_wrong').play();
				ans_jar[loop] = 0;
				no.visible = false;
				bt_continue.visible = true;
			}, this);
	
			no.on('pointerdown', function(){
				this.add.image(no.x, no.y, 'right');
				this.sound.add('voice_right').play();
				ans_jar[loop] = 1;
				yes.visible = false;
				bt_continue.visible = true;
			}, this);
		}
	}
	update(){
			
	}
}