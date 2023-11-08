var listriddle = [];
// alpha thay đổi theo lesson
var alpha_lesson = [
    'ASDF', 'JKL;', 'GH', '', 'QWER', 'UIOP', 'TY', '', 'ZXCV', 'M,./', 'BN', '', '1234', '7890', '56',
]

// auto fill data
if (lesson == 1) {
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var hangcoso = 'ASDFGHJKL';
    var hangtren = 'QWERTYUIOP';
    var hangduoi = 'ZXCVBNM';

    for (var i in alpha) {
        listriddle.push(
            {
                question: "Phím " + alpha[i] + " thuộc hàng phím cơ sở./nEm hãy cho biết đáp án trên/nđúng hay sai?",
                img: "img" + alpha[i],
                answer: (hangcoso.search(alpha[i]) != -1 ? true : false),
            },
            {
                question: "Phím " + alpha[i] + " thuộc hàng phím trên./nEm hãy cho biết đáp án trên/nđúng hay sai?",
                img: "img" + alpha[i],
                answer: (hangtren.search(alpha[i]) != -1 ? true : false),
            },
            {
                question: "Phím " + alpha[i] + " thuộc hàng phím dưới./nEm hãy cho biết đáp án trên/nđúng hay sai?",
                img: "img" + alpha[i],
                answer: (hangduoi.search(alpha[i]) != -1 ? true : false),
            }
        )
    }
    listriddle.push(
        {
            question: "Hình bên là bàn phím số./nEm hãy cho biết đáp án trên/nđúng hay sai?",
            img: "img_phimso",
            answer: true,
        },
        {
            question: "Phím Spacebar dùng để tạo/nkhoảng trắng. Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_spacebar_1",
            answer: true,
        },
        {
            question: "Phím Spacebar dùng để/nxuống dòng.Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_spacebar_2",
            answer: false,
        },
        {
            question: "Phím Enter dùng để tạo/nkhoảng trắng. Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_enter_1",
            answer: false,
        },
        {
            question: "Phím Enter dùng để/nxuống dòng.Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_enter_2",
            answer: true,
        },
    )
}

if (lesson == 2) {
    var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var a = 'tren,duoi,giua';
     // tay trái
    var uttrai = 'QAZ1';
    var aputtrai = 'WSX2';
    var giuatrai = 'EDC3';
    var trotrai = 'RFVTGB45';
     // tay phải
    var utphai = 'P;/0';
    var aputphai = 'OL.9';
    var giuaphai = 'IK,8';
    var trophai = 'UJMYHN67';

    listriddle.push(
        {
            question: "F và G là hai phím có gai/ntrên bàn phím. Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_phimgai_1",
            answer: false,
        },
        {
            question: "F và J là hai phím có gai/ntrên bàn phím. Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_phimgai_2",
            answer: true,
        },
        {
            question: "G và H là hai phím có gai/ntrên bàn phím. Em hãy cho biết/nđáp án trên đúng hay sai?",
            img: "img_phimgai_3",
            answer: false,
        },
        {
            question: "Để bắt đầu gõ phím, ta sẽ đặt tay/ntrên hàng phím cố định là hàng/nphím giữa. Đúng hay sai?",
            img: "img_hanggiua",
            answer: true,
        },
        {
            question: "Để bắt đầu gõ phím, ta sẽ đặt tay/ntrên hàng phím cố định là hàng/nphím trên. Đúng hay sai?",
            img: "img_hangtren",
            answer: false,
        },
        {
            question: "Để bắt đầu gõ phím, ta sẽ đặt tay/ntrên hàng phím cố định là hàng/nphím dưới. Đúng hay sai?",
            img: "img_hangduoi",
            answer: false,
        },
        {
            question: "Theo em để bắt đầu gõ phím,/nem sẽ đặt tay trên hàng phím/ncố định nào sau đây?",
            img: 'img_hangphim',
            answer: 'hanggiua',
        },
    )

}
// các bài học liên quan phím chữ
// index 21 <-> lesson 14
// index 22 <-> lesson 15
// index 23 <-> lesson 16
else if (lesson >= 3 && lesson <= 17) {
    // tay trái
    var uttrai = 'QAZ1';
    var aputtrai = 'WSX2';
    var giuatrai = 'EDC3';
    var trotrai = 'RFVTGB45';
    // tay phải
    var utphai = 'P;/0';
    var aputphai = 'OL.9';
    var giuaphai = 'IK,8';
    var trophai = 'UJMYHN67';

    var taytrai = uttrai + aputtrai + giuatrai + trotrai;
    var tayphai = utphai + aputphai + giuaphai + trophai;

    var lesson_hai_phim = 'GHTYBN56'
    var alpha = alpha_lesson[lesson - 3];
    var hand = (taytrai.search(alpha[0]) == -1) ? 'tay phải' : 'tay trái';
    // var f = (hand == 'tay trái' ? 'trai' : 'phai');

    for (var i in alpha) {
        var hand_is_left = taytrai.search(alpha[i])
        var f = (hand_is_left != -1 ? 'trai' : 'phai')
        listriddle.push(
            {
                question: "Phím " + alpha[i] + " được gõ bởi ngón út/n" + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + ". Em hãy cho biết đáp án/ntrên đúng hay sai?",
                img: "img_ut" + f + "_" + alpha[i],
                answer: ((hand_is_left != -1 ? uttrai : utphai).search(alpha[i]) != -1 ? true : false),
            },
            {
                question: "Phím " + alpha[i] + " được gõ bởi ngón áp út/n" + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + ". Em hãy cho biết đáp án/ntrên đúng hay sai?",
                img: "img_aput" + f + "_" + alpha[i],
                answer: ((hand_is_left != -1 ? aputtrai : aputphai).search(alpha[i]) != -1 ? true : false),
            },
            {
                question: "Phím " + alpha[i] + " được gõ bởi ngón giữa/n" + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + ". Em hãy cho biết đáp án/ntrên đúng hay sai?",
                img: "img_giua" + f + "_" + alpha[i],
                answer: ((hand_is_left != -1 ? giuatrai : giuaphai).search(alpha[i]) != -1 ? true : false),
            },
            {
                question: "Phím " + alpha[i] + " được gõ bởi ngón trỏ/n" +(hand_is_left != -1 ? 'tay trái' : 'tay phải') + ". Em hãy cho biết đáp án/ntrên đúng hay sai?",
                img: "img_tro" + f + "_" + alpha[i],
                answer: ((hand_is_left != -1 ? trotrai : trophai).search(alpha[i]) != -1 ? true : false),
            },
            {
                question: "Phím " + alpha[i] + " được gõ bởi ngón cái/n" + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + ". Em hãy cho biết đáp án/ntrên đúng hay sai?",
                img: "img_cai" + f + "_" + alpha[i],
                answer: false,
            },
        )
    }
    if (alpha.length != 2) {
        var hand_is_left = taytrai.search(alpha[0])
        var f = (hand_is_left != -1 ? 'trai' : 'phai')
        listriddle.push(
            {
                question: "Đố em, ngón út " + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + " dùng/ngõ phím nào sau đây?",
                img: "img_ut" + f + "_?",
                answer: alpha[hand_is_left == -1 ? 3 : 0],
            },
            {
                question: "Đố em, ngón áp út " + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + " dùng/ngõ phím nào sau đây?",
                img: "img_aput" + f + "_?",
                answer: alpha[hand_is_left == -1 ? 2 : 1],
            },
            {
                question: "Đố em, ngón giữa " + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + " dùng/ngõ phím nào sau đây?",
                img: "img_giua" + f + "_?",
                answer: alpha[hand_is_left == -1 ? 1 : 2],
            },
            {
                question: "Đố em, ngón trỏ " + (hand_is_left != -1 ? 'tay trái' : 'tay phải') + " dùng/ngõ phím nào sau đây?",
                img: "img_tro" + f + "_?",
                answer: alpha[hand_is_left == -1 ? 0 : 3],
            },
        )
        // Tạo hoán vị không lặp
        var n = 4;
        var Bool = [0, 0, 0, 0, 0];     // Đánh dấu chưa có phần tử nào sử dụng hết
        var A = [];                     // Lưu hoán vị vào mảng A

        create_to_hop_phim()
        function create_to_hop_phim(k = 1) {
            for (var i = 1; i <= n; i++) {
                //Kiểm tra nếu phần tử chưa được chọn thì sẽ đánh dấu
                if (!Bool[i]) {
                    A[k-1] = alpha[i-1];            // Lưu một phần tử vào hoán vị
                    Bool[i] = 1;                    //Đánh dấu đã dùng
                    if (k == n) {                   //Kiểm tra nếu đã chứa một hoán vị thì xuất
                        // console.log(A.join(' '))
                        listriddle.push(
                            {
                                question: "Theo em, các phím ở hình bên/nđã sử dụng đúng ngón tay chưa?",
                                img: "img_taytrai_" + A.join(''),
                                answer: (A[0] == alpha[0] && A[1] == alpha[1] && A[2] == alpha[2] && A[3] == alpha[3]) ? true : false,
                            },
                        )
                    }
                    else
                        create_to_hop_phim(k + 1);
                    Bool[i] = 0;
                }
            }
        }
    }
    else {
        listriddle.push(
            {
                question: "Đố em, ngón trỏ tay trái dùng/ngõ phím nào sau đây?",
                img: "img_trotrai_?",
                answer: alpha[0],
            },
            {
                question: "Đố em, ngón trỏ tay phải dùng/ngõ phím nào sau đây?",
                img: "img_trophai_?",
                answer: alpha[1],
            },
        )  
    }  
}
// Gõ dấu kiểu TELEX
else if (lesson == 18) {
    var accents = ['sắc', 'huyền', 'hỏi', 'ngã', 'nặng']
    var accents2 = ['sac', 'huyen', 'hoi', 'nga', 'nang']
    var answer_telex = 'SFRXJ'
    for (var i = 0; i < accents.length; i++) {
        listriddle.push(
            {
                question: "Trong kiểu gõ TELEX, phím nào/ngõ dấu " + accents[i] + "?",
                img: "img_q_" + accents2[i],
                answer: answer_telex[i],
            },
        )
    }
    for (var i = 0; i < accents.length; i++) {
        listriddle.push(
            {
                question: "Trong kiểu gõ TELEX, phím " + answer_telex[i] + " dùng/ngõ dấu gì?",
                img: "img_q_" + accents2[i],
                answer: accents2[i],
            },
        )
    }
    for (var i = 0; i < 5; i++)
        for (var j = 0; j < accents.length; j++) {
            listriddle.push(
                {
                    question: "Trong kiểu gõ TELEX, phím " + answer_telex[i] + "/ndùng để gõ dấu " + accents[j] + ". Em hãy cho/nbiết câu trên đúng hay sai?",
                    img: "img_" + answer_telex[i]  + "_" + accents2[j],
                    answer: (i == j),
                },
            )
        }
}
// Gõ dấu kiểu VNI
else if (lesson == 25) {
    var accents = ['sắc', 'huyền', 'hỏi', 'ngã', 'nặng']
    var accents2 = ['sac', 'huyen', 'hoi', 'nga', 'nang']
    for (var i = 0; i < accents.length; i++) {
        listriddle.push(
            {
                question: "Trong kiểu gõ VNI, phím nào/ngõ dấu " + accents[i] + "?",
                img: "img_q_" + accents2[i],
                answer: i + 1,
            },
        )
    }
    for (var i = 0; i < accents.length; i++) {
        listriddle.push(
            {
                question: "Trong kiểu gõ VNI, phím " + (i + 1) + " dùng/ngõ dấu gì?",
                img: "img_q_" + accents2[i],
                answer: accents2[i],
            },
        )
    }
    for (var i = 0; i < 5; i++)
        for (var j = 0; j < accents.length; j++) {
            listriddle.push(
                {
                    question: "Trong kiểu gõ VNI, phím " + (i + 1) + " dùng/nđể gõ dấu " + accents[j] + ". Em hãy cho/nbiết câu trên đúng hay sai?",
                    img: "img_" + (i + 1) + "_" + accents2[j],
                    answer: (i == j),
                },
            )
        }
}
// Gõ chữ kiểu VNI - NOT COMPLETE
else if(lesson == 19) {

}
// Gõ chữ kiểu TELEX - NOT COMPLETE
else if(lesson == 26) {
    
}
// console.log(lesson)
console.log(listriddle)