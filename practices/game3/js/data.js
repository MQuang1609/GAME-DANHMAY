list_words = {
    // hàng giữa - ASDFGHJKL
    level1: "ads ags ahs als ash ask dag dah dak dal fad fas gad gal gas had hag haj has jag kaf kas lad lag las sad sag sal sha ska",
    level2: "dags dahl dahs daks dals dash dhak dhal fads fash flag flak gads gals gash glad hadj hags half jags kafs khaf lads lags lakh lash shad skag slag",
    level3: "dahls dhaks dhals flags flash flask glads khafs lakhs skald",
    // hàng trên - QWERTYUIOP
    level4: "ire ope opt ore ort our out owe per pet pew pie pit piu poi pot pow pro pry pur put pye rei rep ret rip roe rot row rue rut rye tew tie tip toe top tor tow toy try tui tup two tye upo urp ute wet wit woe wot wry wye yep yet yew yip you yow yup",
    level5: "etui euro iter oyer peri pert pier pity poet pore port pour pout prey prow ptui pure puri pyre pyro quey quip quit repo riot ripe rite rope ropy rote roti roue roup rout ryot tier tire tiro tope topi tore tori tory tour towy trey trio trip trop trow troy true tyer type typo tyre tyro weir wept wert wipe wire wiry wite wore wort writ wyte yeti yipe yore your yowe yurt",
    level6: "equip erupt ourie outer outre pewit piety pique pouty power purty query quiet quire quirt quite quoit quote repot ropey roque roupy route tepoy toper toque tower towie toyer tripe trope tuyer twerp twier twirp twyer uteri wiper write wrote yowie",
    // hàng giữa - ASDFGHJKL + hàng trên - QWERTYUIOP
    level7: "fluish pilous poilus polish plough afters dafter daters defats defray derats derays drafts drafty dryest duster estray faders farted fasted faster feuars frauds frayed frusta quarte quarts quatre queasy rafted rudest rusted safety sauted square stared stayed stayer steady strafe sturdy sudary surety folkish surfed trades treads turfed tuyers urates yarest dasyure defrays estuary feudary quartes quatres restudy squared strafed strayed",
    // hàng giữa - ASDFGHJKL + hàng dưới - ZXCVBNM
    level8: "bandhs bhangs blacks blanch blands blanks chalks changs chanks clangs clanks flacks flanch flanks glands klangs schmalz",
    // hàng trên - QWERTYUIOP + hàng dưới - ZXCVBNM
    level9: "pointer poutier poutine promine protein protium remount routine tourney tropine pointy potmen pouter protei pterin punier punter purine purity pyrite pyrone remint roupet tenour tonier triune trompe tropin troupe turion turnip typier umpire uniter unripe untrim uptime uptore uptorn coverup cowrite croquet cuprite cutover evictor overcut overtip picquet picture piroque poutier poverty purview pyretic quivery viceroy victory wipeout equipt equity expiry export peroxy piquet poetry potzer pouter powter poxier protei purity pyrite quoter qwerty roquet roupet torque towery troupe typier uptore piroque poutier quixote wipeout",
    // kết hợp 3 hàng
    level10: "thirteen, Thursday, princess, assonant, thousand, fourteen, language, chipotle, American, business, favorite, elephant, children, birthday, mountain, feminine, football, kindness, syllable, abdicate, treasure, Virginia, envelope, strength, together, memories, darkness, February, sandwich, calendar, bullying, equation, violence, marriage, building, internal, function, November, drooping, abortion, Victoria, squirrel, tomorrow, champion, sentence, personal, remember, daughter, hospital, ordinary",
    level11: "fireboard, identical, chocolate, Christmas, beautiful, happiness, Wednesday, challenge, celebrate, adventure, important, consonant, Christian, dangerous, masculine, Australia, irregular, something, Elizabeth, knowledge, macaronic, pollution, President, wrestling, pineapple, adjective, secretary, undefined, Halloween, Amerindic, ambulance, alligator, seventeen, affection, congruent, marijuana, community, different, vegetable, influence, structure, invisible, wonderful, packaging, provoking, nutrition, crocodile, education, abounding, beginning",
    level12: "California, everything, aboveboard, Washington, basketball, weathering, characters, literature, perfection, volleyball, depression, homecoming, technology, maleficent, watermelon, appreciate, relaxation, convection, government, abominable, salmonella, strawberry, aberration, retirement, television, contraband, Alzheimers, silhouette, friendship, punishment, loneliness, university, Cinderella, confidence, restaurant, abstinence, blancmange, blackboard, discipline, renovation, helicopter, generation, adaptation, skateboard, lightboard, Apocalypse, understand, leadership, revolution, Antarctica",
}
for (var i in list_words) {
    if (i != 'level10' && i != 'level11' && i != 'level12')
        list_words[i] = list_words[i].split(' ');
    else
        list_words[i] = list_words[i].split(', ');
}
console.log(list_words)