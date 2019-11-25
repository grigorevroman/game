let
screen = $('#screen'), // Jq экран
bg = $('#bg'), // Jq задний фон
hero = $('#hero'), // Jq герой
x = 3, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
betweenMonsters = 500, // Число пикселей между монстрами
bgWidth = 3000, // Длинна заднего фона
screenWidth = 1000, // Длинна экрана
monstersPos = [], // Позиции монстров
d = {}, // Состояние клавишь <- и ->
diff, // Разница между длинной фона и экраном
heroPosCenter; // Позиция центра экрана для героя

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

	if (newHeroPos < 0) { // Если позиция героя максимально слева, то герой не движется левее
		result = 0;
	} else if ( // Если позиция героя в середине экрана и задний фон не прокручен до конца, то герой стоит в центре
        newHeroPos >= heroPosCenter
		&& getBgPos() < diff
	) {
		result = heroPosCenter;
	} else if (newHeroPos > screen.width() - hero.width() - 50) { // Если позиция героя максимально справа, не двигаться правее
		result = screen.width() - hero.width() - 50;
	} else { // Движение героя в остальных случаях
		result = newHeroPos;
	}
    return result;
}

/* Перемещение заднего фона */
function bgPos(v, a, b)
{
	var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0),
	result;

	/* Если герой в середине экрана и задний фон не прокручен до конца, то прокручиваем его */
	if (
		getHeroPos() >= heroPosCenter
		&& getBgPos() < diff
	) {
		result = n;

	/* Если задний фон прокручен до конца, то останавливаем его */
	} else if (-n >= diff) {
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
heroPosCenter = (screen.width() - hero.width()) / 2;

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