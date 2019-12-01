const
SCREEN_WIDTH = 1000,
BG_WIDTH = 1100,
HERO_WIDTH = 100,
HERO_MIN_POS = 0,
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH,
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2,
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER;

let
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
heroObj = {},
bgObj = {};

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