var

/* Jq экран */
game = $('#game'),

/* Jq задний фон */
bg = $('#bg'),

/* Jq герой */
hero = $('#hero'),

/* Jq монстр */
monster = $('.monster'),

/* Состояние клавишь <- и -> */
d = {},

/* Количество пикселей, которое преодолевает герой при одном нажатии на клавишу */
x = 3;

/* Получение текущей позиции заднего фона */
function getBgPos() 
{
	return parseInt(bg.css('left'));
}

/* Получение текущей позиции героя */
function getHeroPos() 
{
	return parseInt(hero.css('left'));
}

/* Получение текущей позиции монстра */
function getMonsterPos()
{
	return parseInt(monster.css('left'));
}

/* Перемещение героя */
function heroPos(v, a, b) 
{
    var n = parseInt(v, 10) - (d[a] ? x : 0) + (d[b] ? x : 0),
	result;
	
	/* Если позиция героя максимально слева, то герой не движется левее */
	if (n < 0) {
		result = 0;
		
	/* Если позиция героя в середине экрана и задний фон не прокручен до конца, то герой стоит на месте */
	} else if (
		n >= (game.width() - hero.width()) / 2 
		&& -getBgPos() < bg.width() - game.width()
	) {
		result = (game.width() - hero.width()) / 2;
		
	/* Если позиция героя максимально справа, то не двигаться правее */
	} else if (n > game.width() - hero.width() - 50) {
		result = game.width() - hero.width() - 50;
		
	/* Движение героя в остальных случаях */
	} else {
		result = n;
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
		getHeroPos() >= (game.width() - hero.width()) / 2
		&& -getBgPos() < bg.width() - game.width()
	) {
		result = n;

	/* Если задний фон прокручен до конца, то останавливаем его */
	} else if (-n >= bg.width() - game.width()) {
		result = -(bg.width() - game.width());
	}
	return result;
}

function bgMonster()
{
	return getMonsterPos() - 1;
}

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
	monster.css({
		left: function() {
			return bgMonster();
		}
	});
}, 20);