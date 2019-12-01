const
SCREEN_WIDTH = 1000,
BG_WIDTH = 1100,
HERO_WIDTH = 100,
HERO_MIN_POS = 0,
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH,
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2,
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER;

let
bg = $('#bg'), // Jq задний фон
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
heroObj = {},
bgObj = {};

/**
 * Задний фон прокручивается
 */
function isBgScroll(heroObj)
{
	return heroObj.isHeroPosCenter();
}

/**
 *
 * @param v
 * @param a
 * @param b
 * @param heroObj
 * @returns {number}
 */
function bgPos(v, a, b, heroObj)
{
	let newBgPos = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0),
	result;

	if (isBgScroll(heroObj)) {
		result = newBgPos;
	}
	return result;
}

$(window).keydown(function(e) { 
	d[e.which] = true; 
});

$(window).keyup(function(e) { 
	d[e.which] = false; 
});

heroObj = new Hero();

setInterval(function() {
	heroObj.setHeroPos();
	bg.css({
		left: function(i, v) {
			return bgPos(v, 39, 37, heroObj);
		}
	});
}, 20);