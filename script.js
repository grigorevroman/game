const
SCREEN_WIDTH = 1000, // Ширина экрана
BG_WIDTH = 2000, // Ширина заднего фона
HERO_WIDTH = 100, // Ширина героя
HERO_MIN_POS = 0, // Минимальная позиция героя
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH, // Максимальная позиция героя
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2, // Минимальная поциция героя в центре
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER, // Максимальная позиция героя в центре
MONSTER_WIDTH = 100,
START_MONSTER_FIELD = [SCREEN_WIDTH, BG_WIDTH - MONSTER_WIDTH];

let
x = 5, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
heroObj = {}, // Герой
bgObj = {}; // Задний фон

function getMonsterPoss(startMonsterField)
{
    let monsterFields = [startMonsterField];
    let monsterPoss = [];
    let i = 1;
    while (i <= 5) {
        let monsterFieldsNum = monsterFields.length;
        let currentFieldNum = Math.floor(Math.random() * (monsterFieldsNum - 1 + 1)) + 1;
        let currentField = monsterFields[currentFieldNum - 1];
        let monsterPos = Math.floor(Math.random() * (currentField[1] - currentField[0] + 1)) + currentField[0];
        delete monsterFields[currentFieldNum - 1];
        let first = [currentField[0], monsterPos];
        let second = [monsterPos + MONSTER_WIDTH, currentField[1] - MONSTER_WIDTH];
        monsterFields.push(first);
        monsterFields.push(second);
        monsterFields = arrayValues(monsterFields);
        monsterPoss.push(monsterPos);
        i++;
    }
    return monsterPoss;
}

function arrayValues(input)
{
    let tmp_arr = [],
    cnt = 0;
    for (key in input){
        tmp_arr[cnt] = input[key];
        cnt++;
    }
    return tmp_arr;
}

function addMonsters(monsterPoss)
{
    let monstersNum = monsterPoss.length;
    let i = 1;
    while (i <= monstersNum) {
        bgObj.bg.append('<div class="monster monster-' + i + '"><div>');
        $('.monster-' + i).css({
            left: monsterPoss[i - 1]
        });
        i++;
    }
}

$('#screen').width(SCREEN_WIDTH);
let monsterPoss = getMonsterPoss(START_MONSTER_FIELD);

$(window).keydown(function(e) { 
	d[e.which] = true; 
});

$(window).keyup(function(e) { 
	d[e.which] = false; 
});

heroObj = new Hero();
bgObj = new Bg(heroObj);

addMonsters(monsterPoss, bgObj);

setInterval(function() {
	heroObj.setHeroPos();
	bgObj.setBgPos();
}, 20);