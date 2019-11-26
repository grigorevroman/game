let
screen = $('#screen'), // Jq экран
bg = $('#bg'), // Jq задний фон
hero = $('#hero'), // Jq герой
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
betweenMonsters = 500, // Число пикселей между монстрами
bgWidth = 3000, // Длинна заднего фона
screenWidth = 1000, // Длинна экрана
heroPosMaxLeft = 0, // Максимальная позиция героя слева
monstersPos = [], // Позиции монстров
d = {}, // Состояние клавишь <- и ->
diff, // Разница между длинной фона и экраном
heroPosCenter, // Позиция центра экрана для героя
heroPosMaxRight; // Максимальная позиция героя справа

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
 * Задний фон прокручен до конца
 * @returns {boolean}
 */
function isBgScrolled ()
{
	return getBgPos() >= diff;
}

/**
 * Герой находится в центре
 * @param heroPos
 * @returns {boolean}
 */
function isHeroCenter(heroPos)
{
	return heroPos >= heroPosCenter
}

/**
 * Позиция героя максимально слева
 * @param heroPos
 * @returns {boolean}
 */
function isHeroPosMaxLeft(heroPos)
{
	return heroPos < heroPosMaxLeft;
}

/**
 * Позиция героя в центре
 */
function isHeroPosCenter(heroPos)
{
	return isHeroCenter(heroPos) && !isBgScrolled();
}

/**
 * Позиция героя максимально справа
 * @param heroPos
 * @returns {boolean}
 */
function isHeroPosMaxRight(heroPos)
{
	return heroPos > heroPosMaxRight;
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

	if (isHeroPosMaxLeft(newHeroPos)) {
		result = heroPosMaxLeft;
	} else if (isHeroPosCenter(newHeroPos)) {
		result = heroPosCenter;
	} else if (isHeroPosMaxRight(newHeroPos)) {
		result = heroPosMaxRight;
	} else {
		result = newHeroPos;
	}
    return result;
}

/* Перемещение заднего фона */
function bgPos(v, a, b)
{
	let newBgPos = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0),
	result;

	/* Если герой в середине экрана и задний фон не прокручен до конца, то прокручиваем его */
	if (
		isHeroCenter(getHeroPos()) && !isBgScrolled()
	) {
		result = newBgPos;

	/* Если задний фон прокручен до конца, то останавливаем его */
	} else if (-newBgPos >= diff) {
		result = -(diff);
	}
	return result;
}

/**
 * Добавление монстра
 */
function addMonster()
{
    if (getBgPos() >= monstersPos[0]) {
        let pos = monstersPos.shift();
        $('#bg').append('<div class="monster"></div>');
        $('.monster').css({left: screenWidth + pos});
    }
    /*return getMonsterPos() - 1;*/
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

bg.width(bgWidth);
numberMonsters = parseInt(bgWidth / betweenMonsters);
monstersPos = getMonstersPos();
diff = bg.width() - screen.width();
heroPosMaxRight = screen.width() - hero.width();
heroPosCenter = heroPosMaxRight / 2;

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
}, 20);