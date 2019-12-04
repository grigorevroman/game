const
SCREEN_WIDTH = 1000, // Ширина экрана
BG_WIDTH = 1100, // Ширина заднего фона
HERO_WIDTH = 100, // Ширина героя
HERO_MIN_POS = 0, // Минимальная позиция героя
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH, // Максимальная позиция героя
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2, // Минимальная поциция героя в центре
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER; // Максимальная позиция героя в центре

let
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
heroObj = {}, // Герой
bgObj = {}; // Задний фон

$('#screen').width(SCREEN_WIDTH);

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