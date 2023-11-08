// define the time limit
let TIME_LIMIT = 60;
// let TIME_LIMIT = 180;
// let TIME_LIMIT = 300;

// define quotes to be used
let quotes_array = [
  // "Hãy sống mỗi ngày như thể đó là ngày cuối cùng của bạn.",
  // "Một tia nắng duy nhất cũng đủ để xua đuổi nhiều bóng tối.",
  // "Hãy là sự thay đổi mà bạn muốn thấy trên thế giới.",
  // "Bắt đầu mỗi ngày với một suy nghĩ tích cực và một trái tim biết ơn.",
  // "Đừng bao giờ ngừng tin rằng những điều tốt đẹp đang đến.",
  // "Cách trả thù tốt nhất là sống tốt hơn họ.",
  "Truyện cổ tích: Bà Chúa Tuyết\nTác giả: Andersen\n",
  "Ngày xưa có một con quỷ xấu xí và hung tợn. Quỷ có một tấm gương rất kì dị. Soi vào đó, cái tốt sẽ méo mó đi, còn cái xấu xa thì nhân lên gấp bội.\nMột hôm, quỷ mang tấm gương bay lên trời định soi vào Thượng Đế và các thiên thần. Nhưng khi quỷ tới gần cổng trời, tấm gương đột nhiên vỡ tan thành muôn vàn mảnh vụn. Những mảnh vỡ này thật khủng khiếp! Người nào không may bị nó bắn vào tim hay vào mắt thì sẽ trở nên lạnh lùng, vô cảm.",
  "Thật bất hạnh! Trong không trung còn vô số những mảnh vỡ ấy đang bay lơ lửng. Hôm ấy có một đôi bạn rất thân đang ngồi đọc sách bên cửa sổ. Cậu bé tên là Kay còn cô bé là Giéc-đa. Giéc-đa có giọng đọc êm ái và du dương nên Kay rất thích được nghe cô bé đọc sách\nĐang ngồi, Kay bỗng khuỵu ngã và kêu lên:\n- Ái, Giéc-đa ơi, sao mình thấy đau nhói ở tim và mắt thế này!",
  "Thật tội nghiệp! Cậu bé không hề biết rằng mắt và tim mình đã bị những mảnh gương quỷ bắn vào. Từ lúc đó, Kay không muốn chơi với ai nữa. Cậu bé luôn tìm cách xa lánh mọi người, kể cả Giéc-đa. Rồi một ngày mùa đông tuyết rơi dày đặc, Kay đã rời nhà đi theo bà Chúa Tuyết trên một cỗ xe lớn màu trắng.\nBà Chúa Tuyết đã hôn lên trán Kay khiến cậu quên hết tất cả. Rồi bà đưa Kay lên thật cao và thật xa. Chẳng ai biết cậu bé đi đâu. Người ta đồn rằng Kay đã ngã xuống sông và bị dòng nước cuốn đi. Giéc-đa buồn lắm!",
  "Mùa đông lạnh lẽo đã trôi qua và mùa xuân ấm áp đã quay lại. Cô bé hỏi tia nắng và những đàn chim đi tránh rét trở về, nhưng không có tin tức gì của Kay. Giéc-đa đem đôi giày đỏ mà cô bé rất thích ra bờ sông. Cô bé hỏi dòng sông:\n- Sông ơi, có phải sông đã lấy mất Kay yêu quý của tôi không? Hãy trả bạn ấy cho tôi! Tôi sẽ tặng sông đôi giày đỏ này.\nGiéc-đa thả đôi giày xuống nước. Nhưng sông trả lại đôi giày cho cô bé vì sông có bắt Kay đâu. Giéc-đa tưởng mình thả giày chưa đúng chỗ nên sông không nhận. Cô bé liền bước xuống một chiếc xuồng đang đậu sát bờ để thả giày ra xa hơn. Chiếc xuồng chòng chành rồi bị tuột dây buộc, từ từ trôi đi, Giéc-đa sợ hãi oà lên khóc.",
  "Cô bé không biết làm cách nào để đưa được chiếc xuồng vào bờ, đành cứ mặc cho nó trôi theo dòng nước. Khi xuồng trôi đến gần một ngôi nhà bên bờ sông, Giéc-đa vội cất tiếng kêu cứu. Nghe tiếng kêu, một bà già từ trong nhà chạy ra.\nBà vừa giơ gậy lên, chiếc thuyền đã dạt ngay vào bến. Bà già đưa cô bé tội nghiệp vào nhà. Bà bày ra bàn rất nhiều món ăn ngon để cô bé đang lả người đi vì đói được ăn uống thoả thích.\nĐã từ lâu, bà già phải sống cô đơn một mình, bà rất mừng khi được gặp Giéc-đa. Bà muốn giữ cô bé ở lại, nên tìm đủ mọi cách để cô bé được sống đầy đủ và vui vẻ.",
  "Một hôm, Giéc-đa dạo chơi trong vườn. Cô bé nhìn thấy những bông hoa hồng tươi thắm, loài hoa mà cả Giéc-đa và Kay đều thích. Những bồng hồng ấy nhắc nhở cô bé nhớ đến bạn. Giéc-đa khẽ hỏi hoa hồng:\n- Hoa ơi, hoa có biết Kay đang ở đâu không?\nCác bông hồng đều lắc đầu. Giéc- đa buồn lắm. Cô bé vụt chạy ra khỏi vườn, quyết đi tìm Kay. Giéc-đa đi mãi, cô bé đã qua bao nhiêu làng mạc, hỏi thăm bao nhiêu người, nhưng vẫn chưa tìm thấy Kay.",
  "Rồi mùa đông ào tới, tuyết rơi phủ trắng khắp nơi. Giéc-đa vừa đói, vừa mệt, dừng lại nghỉ bên một cây to đã rụng hết lá. Trên cây có vợ chồng anh Quạ đỏm dáng cũng đang đứng nghỉ.\nQuạ hỏi:\n- Cô bé ơi, cô đi đâu giữa mùa đông giá lạnh thế này?\nGiéc-đa kể cho Quạ nghe chuyện của Kay. Quạ bảo:\n- Tôi biết có một cậu bé giống như Kay của cô. Ta thử đến đó xem sao.",
  "Vợ chồng anh Quạ bay trước dẫn đường, đưa Giéc-đa đến một toà cung điện nguy nga. Nơi đó có một căn phòng sang trọng và ấm áp. Giéc-đa bước vào căn phòng ấy và gặp một cô bé xinh xắn có mái tóc vàng óng, cùng một cậu bé giống hệt Kay.\nNhưng họ đều là công chúa và hoàng tử của xứ sở tươi đẹp mà Giéc- đa vừa đặt chân đến.\nHai người bạn mới đã khóc khi nghe vợ chồng anh Quạ kể về hành trình tìm bạn của Giéc-đa. Họ tặng ngay cô bé cỗ xe trượt tuyết bằng vàng cùng mọi vật dụng cần thiết để cô tiếp tục lên đường.",
  "Vì muốn sớm tìm được bạn nên Giéc-đa đi suốt đêm ngày không nghỉ. Một đêm kia, cỗ xe đang lao vun vút thì bị một toán cướp xông ra chặn đường.\nLũ cướp loá mắt khi nhìn thấy cỗ xe vàng, chúng bắt người đánh xe quang vào rừng, đem con ngựa xẻ thịt nướng ăn. Còn Giéc-đa bị chúng lôi khỏi xe, bắt quỳ trên tuyết lạnh.Khi mụ tướng cướp vừa kề con dao sáng loáng vào cổ Giéc-đa, thì con gái mụ chạy đến níu giữ tay mẹ lại:\n- Mẹ đừng giết cô bé này! Hãy để cô ta làm bạn với con.",
  "Rồi con gái mụ tướng cướp kéo tay Giéc-đa lôi xềnh xệch về phòng.\nTừ hôm đó, Giéc-đa không được đi đâu, suốt ngày phải quanh quẩn chơi với con gái mụ tướng cướp. Thấy Giéc- đa không vui, cô ta gặng hỏi và Giéc- đa đã đem chuyện của Kay kể cho cô ta nghe.\nBỗng mấy con chim bồ câu đang đậu trong phòng nghe thấy câu chuyện, cùng kêu lên:\n- Cô bé ơi, cách đây ít ngày, chúng tôi có gặp Kay ngồi trên xe của bà Chúa Tuyết đấy.\n- Thế các bạn có biết bà Chúa Tuyết ở đâu không? – Giéc-đa mừng rỡ hỏi.",
  "- Cô bé cứ hỏi bác Tuần Lộc, bác ấy biết rất rõ nơi ở của bà Chúa Tuyết – Bầy chim ríu rít trả lời.\nCon gái mụ tướng cướp rất xúc động trước tình bạn của Giéc-đa. Cô ta an ủi bạn:\n- Cậu đừng lo, sáng mai tớ sẽ sai Tuần Lộc chở cậu đi.\nHôm sau, hai cô bé dậy rất sớm. Con gái mụ tướng cướp chuẩn bị cho Giéc-đa đủ mọi thứ, rồi đỡ cô bé leo lên lưng Tuần Lộc.\nCô còn ghé tai Tuần Lộc dặn dò rất nhiều. Chú ta gật đầu và chở Giéc-đa lao vút đi.",
  "Tuần Lộc băng qua rừng núi, qua những cánh đồng mênh mông phủ đầy tuyết trắng. Một ngày kia, Tuần Lộc ghé vào nhà bà cụ Tốt Bụng.\nBà cụ chỉ đường cho Tuần Lộc đi tiếp và còn viết thư nhờ bà bạn Thông Thái ở tít trên một đỉnh núi Tuyết giúp đỡ Giéc-đa.\nTuần Lộc và Giéc-đa lại tiếp tục cuộc hành trình.",
  "Đường đi mỗi ngày một khó khăn vất vả. Vách núi Tuyết dựng đứng, Tuần Lộc phải ráng sức nhích từng tí một. Bão tuyết dữ dội như muốn chôn vùi đôi bạn trong tuyết lạnh. Phải chật vật lắm, Tuần Lộc mới đưa Giéc-đa lên được đỉnh núi và tìm đến chỗ bà cụ Thông Thái.\nBà cụ Thông Thái chỉ đường cho Giéc-đa và Tuần Lộc đi tiếp. Bà còn ân cần căn dặn:\n- Các cháu còn phải vượt qua rất nhiều trở ngại mới tìm thấy được Kay. Cháu phải tìm cách lấy hết những mảnh gương quỷ trong người cậu ấy ra thì cậu ấy mới thoát khỏi bùa độc. Khi nào gặp nguy hiểm, cháu nhớ đọc kinh cầu nguyện. Chúa nhân từ sẽ giúp đỡ cháu.",
  "Nghe bà cụ Thông Thái nói xong, Tuần Lộc và Giéc-đa vội vã lên đường ngay. Gần đến nơi bà Chúa Tuyết ở, họ gặp phải lũ quái vật tuyết khổng lồ. Chúng chồm lên như muốn nuốt gọn cả Giéc-đa và Tuần Lộc.\nNhớ lời bà cụ Thông Thái dặn, Giéc-đa thành kính đọc kinh cầu nguyện. Mỗi tiếng cô bé đọc lên là một thiên thần xuất hiện. Các thiên thần cầm vũ khí lao vào tấn công lũ quái vật tuyết. Trong chốc lát, đám quái vật đã tan tành thành những hạt tuyết li ti.\nKhông còn bị đám quái vật chặn đường, Giéc-đa vội vã giục Tuần Lộc đi nhanh tới toà lâu đài bằng băng của bà Chúa Tuyết.",
  "Trong toà lâu đài băng giá đó, Kay đang tím tái vì rét. Cậu bé ngồi bất động trước một đống những mảnh băng vụn và không hề biết Giéc-đa đang đứng ngay bên cạnh.\nGiéc-đa thương Kay quá, nước mắt lăn dài trên má cô bé rồi nhỏ xuống ngực Kay. Những giọt nước mắt đầy tình yêu thương ấy thấm vào tận trái tim lạnh lùng của cậu bé, làm tan biến mảnh gương quỷ. Trái tim Kay ấm áp trở lại và cậu bé bật khóc. Mảnh gương quỷ trong mắt cậu bị nước mắt cuốn trôi đi, và Kay nhận ra Giéc-đa…",
  "Cậu bé như bừng tỉnh cơn mơ, xúc động nói với bạn:\n- Ôi Giéc-đa, mình lạnh quá! Mình ước ao nhanh chóng được trở về ngôi nhà ấm áp và quen thuộc đầy hương hoa hồng. Mình sẽ lại được ngồi bên cửa sổ nghe bạn đọc sách!",
  "Khi bà Chúa Tuyết quay về, thấy Giéc-đa và Kay ra khỏi toà lâu đài băng giá. Bà biết rằng tình bạn của Giéc-đa đã giúp Kay thoát khỏi bùa phép của quỷ. Bà đành để đôi bạn rời khỏi xứ sở đầy băng tuyết lạnh lẽo trở về quê hương.\nLúc này mùa đông đã trôi qua, và mùa xuân đã trở lại.\nKhắp nơi cây cối đâm chồi nảy lộc xanh tươi mơn mởn. Trăm hoa đua nở rực rỡ dưới ánh nắng mặt trời ấm áp. Giéc-đa và Kay như được chắp cánh, chẳng mấy chốc đôi bạn đã trở về nhà. Cả nhà mừng rỡ mở tiệc ăn mừng.\nTrong bữa tiệc ấy, bạn bè của Kay và Giéc-đa cùng cất cao tiếng hát ca ngợi tình bạn cao quý và đẹp đẽ.",
];

// selecting required elements
let timer_text = document.querySelector(".curr_time");
let accuracy_text = document.querySelector(".curr_accuracy");
let error_text = document.querySelector(".curr_errors");
let cpm_text = document.querySelector(".curr_cpm");
let wpm_text = document.querySelector(".curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_group = document.querySelector(".cpm");
let wpm_group = document.querySelector(".wpm");
let error_group = document.querySelector(".errors");
let accuracy_group = document.querySelector(".accuracy");

let timeLeft = TIME_LIMIT;
let timeElapsed = 0;
let total_errors = 0;
let errors = 0;
let accuracy = 0;
let characterTyped = 0;
let current_quote = "";
let quoteNo = 0;
let timer = null;

function updateQuote() {
  quote_text.textContent = null;
  current_quote = quotes_array[quoteNo];

  // separate each character and make an element 
  // out of each of them to individually style them
  current_quote.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    quote_text.appendChild(charSpan)
  })

  // roll over to the first quote
  if (quoteNo < quotes_array.length - 1)
    quoteNo++;
  else
    quoteNo = 0;
}

function processCurrentText() {

  // get current input text and split it
  curr_input = input_area.value;
  curr_input_array = curr_input.split('');

  // increment total characters typed
  characterTyped++;

  errors = 0;

  quoteSpanArray = quote_text.querySelectorAll('span');
  quoteSpanArray.forEach((char, index) => {
    let typedChar = curr_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      errors++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + errors;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + errors));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (curr_input.length == current_quote.length) {
    updateQuote();

    // update total errors
    total_errors += errors;

    // clear the input area
    input_area.value = "";
  }
}

function updateTimer() {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

function finishGame() {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.disabled = true;

  // show finishing text
  quote_text.textContent = "Nhấn vào khu vực ở dưới để bắt đầu.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  cpm = Math.round(((characterTyped / timeElapsed) * 60));
  wpm = Math.round(((characterTyped / timeElapsed/ 5) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_group.style.display = "block";
  wpm_group.style.display = "block";
}


function startGame(time) {
  TIME_LIMIT = time;
  resetValues();
  updateQuote();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

function resetValues() {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  errors = 0;
  total_errors = 0;
  accuracy = 0;
  characterTyped = 0;
  quoteNo = 0;
  input_area.disabled = false;

  input_area.value = "";
  quote_text.textContent = 'Nhấn vào khu vực ở dưới để bắt đầu chơi.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_group.style.display = "none";
  wpm_group.style.display = "none";
}
