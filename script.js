const
SCREEN_WIDTH = 1000, // Ширина экрана
BG_WIDTH = 3000, // Ширина заднего фона
HERO_WIDTH = 100, // Ширина героя
HERO_MIN_POS = 0, // Минимальная позиция героя
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH, // Максимальная позиция героя
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2, // Минимальная поциция героя в центре
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER, // Максимальная позиция героя в центре
MONSTER_WIDTH = 100,
START_MONSTER_FIELD = [SCREEN_WIDTH, BG_WIDTH - MONSTER_WIDTH];

let
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
heroObj = {}, // Герой
bgObj = {}, // Задний фон
monsterPoss = [];

function getMonsterPoss(startMonsterField)
{
	console.log(startMonsterField);
}

$('#screen').width(SCREEN_WIDTH);
monsterPoss.push(getMonsterPoss(START_MONSTER_FIELD));

$(window).keydown(function(e) { 
	d[e.which] = true; 
});

$(window).keyup(function(e) { 
	d[e.which] = false; 
});

heroObj = new Hero();
bgObj = new Bg(heroObj);

setInterval(function() {
	heroObj.setHeroPos();
	bgObj.setBgPos();
}, 20);