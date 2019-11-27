let
screen = $('#screen'), // Jq экран
bg = $('#bg'), // Jq задний фон
hero = $('#hero'), // Jq герой
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
betweenMonsters = 500, // Число пикселей между монстрами
bgWidth = 3000, // Длинна заднего фона
screenWidth = 1000, // Длинна экрана
heroPosMin = 0, // Минимальная позиция героя
monstersPos = [], // Позиции монстров
d = {}, // Состояние клавишь <- и ->
heroPosCenter, // Позиция центра для героя
heroPosMax, // Максимальная позиция героя

/**
 * Получение позиции заднего фона
 * @returns {number}
 */
function getBgPos() 
{
	return -parseInt(bg.css('left'));
}

/**
 * Получение позиции героя
 * @returns {number}
 */
function getHeroPos() 
{
	return parseInt(hero.css('left'));
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
function isBgScroll(heroPos)
{
	return isHeroCenter(heroPos);
}

/**
 * Герой находится в центре
 * @param heroPos
 * @returns {boolean}
 */
function isHeroCenter(heroPos)
{
	return heroPos >= heroPosCenter && heroPos <= 3000 - 1000 + heroPosCenter;
}

/**
 * Минимальная позиция героя
 * @param heroPos
 * @returns {boolean}
 */
function isHeroPosMin(heroPos)
{
	return heroPos < heroPosMin;
}

/**
 * Максимальная позиция героя
 * @param heroPos
 * @returns {boolean}
 */
function isHeroPosMax(heroPos)
{
	return heroPos > 2900;
}

/**
 * Перемещение героя
 * @param v
 * @param a
 * @param b
 * @returns {number}
 */
function heroPos(v, a, b) 
{
    let newHeroPos = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0),
	result;

	if (isHeroPosMin(newHeroPos)) {
		result = heroPosMin;
	} else if (isHeroPosMax(newHeroPos)) {
		result = 2900;
	} else {
		result = newHeroPos;
	}
    return result;
}

/**
 * Перемещение заднего фона
 * @param v
 * @param a
 * @param b
 * @returns {number}
 */
function bgPos(v, a, b)
{
	let newBgPos = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0),
	result;

	if (isBgScroll(getHeroPos())) {
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
		$('.monster').css({left: screenWidth + monsterPos});
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

bg.width(bgWidth); // Длинна заднего фона
numberMonsters = parseInt(bgWidth / betweenMonsters); // Количество монстров
monstersPos = getMonstersPos(); // Позиции монстров
heroPosMax = screen.width() - hero.width(); // Максимальная позиция героя
heroPosCenter = heroPosMax / 2; // Позиция героя в центре

$(window).keydown(function(e) { 
	d[e.which] = true; 
});

$(window).keyup(function(e) { 
	d[e.which] = false; 
});

setInterval(function() {
	hero.css({
		left: function(i, v) {
			return heroPos(v, 37, 39);
		}
	});
	bg.css({
		left: function(i, v) {
			return bgPos(v, 39, 37);
		}
	});
	addMonster();
	getMonsterJq().css({
        left: function() {
            return getMonsterPos() - 1;
        }
    });
}, 20);