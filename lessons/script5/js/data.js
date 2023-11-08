list_lessons = {
    3: {
        content: 'ASDF',
        keyboard: 'keyboard_giua',
    },
    4: {
        content: 'JKL;',
        keyboard: 'keyboard_giua'
    },
    5: {
        content: ['GH', 'ASDFJKL;'],
        keyboard: 'keyboard_giua'
    },
    6: {
        content: 'ASDFGHJKL;',
        keyboard: 'keyboard_giua'
    },
    7: {
        content: 'QWER',
        keyboard: 'keyboard_tren'
    },
    8: {
        content: 'UIOP',
        keyboard: 'keyboard_tren'
    },
    9: {
        content: ['TY', 'QWERUIOP'],
        keyboard: 'keyboard_tren'
    },
    101: {
        content: 'QWERTYUIOP',
        keyboard: 'keyboard_tren'
    },
    102: {
        content: 'QWERTYUIOPASDFGHJKL;',
        keyboard: 'keyboard_tren_giua'
    },
    11: {
        content: 'ZXCV',
        keyboard: 'keyboard_duoi'
    },
    12: {
        content: 'M,./',
        keyboard: 'keyboard_duoi'
    },
    13: {
        content: ['BN', 'ZXCVM,./'],
        keyboard: 'keyboard_duoi'
    },
    141: {
        content: 'ZXCVBNM,./',
        keyboard: 'keyboard_duoi'
    },
    142: {
        content: 'QWERTYUIOPASDFGHJKL;ZXCVBNM,./',
        keyboard: 'keyboard'
    },
    15: {
        content: 'QWERTYUIOPASDFGHJKL;ZXCVBNM,./',
        keyboard: 'keyboard'
    },
    181: {  // gõ dấu TELEX
        content: 'AEUIO',
        row: ['áéúíó', 'àèùìò'],
        decode: {
            á: 'as', é: 'es', ú: 'us', í: 'is', ó: 'os',
            à: 'af', è: 'ef', ù: 'uf', ì: 'if', ò: 'of',
        },
        keyboard: 'keyboard'
    },
    182: {  
        
    },
    191: {

    },
    192: {

    },
    20: {

    },
    21: {
        content: '1234',
        keyboard: 'keyboard_so'
    },
    22: {
        content: '7890',
        keyboard: 'keyboard_so'
    },
    23: {
        content: ['56', '12347890'],
        keyboard: 'keyboard_so'
    },
    24: {
        content: 'QWERTYUIOPASDFGHJKL;ZXCVBNM,./1234567890',
        keyboard: 'keyboard'
    },
    251: {  // gõ dấu VNI

    },
    252: {

    },
    261: {

    },
    262: {

    },
}

// Tạo hoán vị không lặp
var n = 2;
var Bool = [0, 0, 0, 0, 0];     //Đánh dấu chưa có phần tử nào sử dụng hết
var A = [];                     //Lưu hoán vị vào mảng A
var BigArray = [];
var alpha = '';

function create_BigArray(content) {    
    if (n == 2) {
        while (n <= 4) {
            if (n == 2) {
                var nums = ['12', '13', '14', '23', '24', '34']
            }
            else if (n == 3) {
                var nums = ['123', '124', '134', '234']
            }
            else {
                var nums = ["1234"]
            }
            for (var i = 0; i < nums.length; i++) {
                for (var j in nums[i]) {
                    alpha += content[parseInt(nums[i][j]) - 1]
                }
                Try(1);
                alpha = '';
            }
            n += 1;
            Bool = [0, 0, 0, 0, 0];      //Đánh dấu chưa có phần tử nào sử dụng hết
            A = [];                      //Lưu hoán vị vào mảng A
        }
    }
    else if (n == 3) {
        alpha = content[0]
        for (var i in content[1]) {
            alpha += content[1][i];
            Try(1);
            alpha = content[0];
        }
        Bool = [0, 0, 0, 0, 0];      //Đánh dấu chưa có phần tử nào sử dụng hết
        A = [];                      //Lưu hoán vị vào mảng A
    }
    else if (n == 4) {
        for (var i = 0; i < 80; i++) {
            word = '';
            for (var j = 0; j < 4; j++) {
                word += content[Math.floor(Math.random() * content.length)];
            }
            BigArray.push(word)
        }
    }
    console.log('BigArray', BigArray)
}

function Try(k = 1) {
    for (var i = 1; i <= n; i++) {
        //Kiểm tra nếu phần tử chưa được chọn thì sẽ đánh dấu
        if (!Bool[i]) {
            A[k-1] = alpha[i-1];  
            Bool[i] = 1;//Đánh dấu đã dùng
            if (k == n) //Kiểm tra nếu đã chứa một hoán vị thì add vào BigArray
                BigArray.push(A.join(''))
            else
                Try(k + 1);
            Bool[i] = 0;
        }
    }
}

