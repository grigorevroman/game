const
SCREEN_WIDTH = 1000,
BG_WIDTH = 2000,
HERO_WIDTH = 100,
HERO_MIN_POS = 0,
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH,
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2,
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER;

let
screen = $('#screen'), // Jq экран
bg = $('#bg'), // Jq задний фон
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
betweenMonsters = 500, // Число пикселей между монстрами
monstersPos = [], // Позиции монстров
d = {}, // Состояние клавишь <- и ->
heroObj = {},
bgObj = {};

/**
 * Получение позиции заднего фона
 * @returns {number}
 */
function getBgPos() 
{
	return -parseInt(bg.css('left'));
}

/**
 * Получение Jq монстра
 * @returns {jQuery|HTMLElement}
 */
function getMonsterJq()
{
	return $('.monster');
}

/**
 * Получение позиции монстра
 * @returns {number}
 */
function getMonsterPos()
{
	return parseInt(getMonsterJq().css('left'));
}

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

/**
 * Добавление монстра
 */
function addMonster()
{
    if (getBgPos() >= monstersPos[0]) {
        let monsterPos = monstersPos.shift();
        bg.append('<div class="monster"></div>');
		$('.monster').css({left: screen.width() + monsterPos});
    }
}

/**
 * Получение позиций монстров
 * @returns {Array}
 */
function getMonstersPos()
{
    let i = 0,
    result = [],
	pos = 0;
    while (i < numberMonsters) {
        result.push(pos);
        pos += betweenMonsters;
        i++;
    }
    return result;
}

numberMonsters = parseInt(bg.width() / betweenMonsters); // Количество монстров
monstersPos = getMonstersPos(); // Позиции монстров

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
	addMonster();
	getMonsterJq().css({
        left: function() {
            return getMonsterPos() - 1;
        }
    });
}, 20);