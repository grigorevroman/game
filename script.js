let

/* Jq экран */
screen = $('#screen'),

/* Jq задний фон */
bg = $('#bg'),

/* Jq герой */
hero = $('#hero'),

/* Jq монстр */
monster = $('.monster'),

/* Состояние клавишь <- и -> */
d = {},

/* Количество пикселей, которое преодолевает герой при одном нажатии на клавишу */
x = 3,

monsters = [],

numberPixelsBetweenMonsters = 500;

bg.width(2000);

numberMonsters = parseInt(bg.width() / numberPixelsBetweenMonsters);

monsters = getMonsters();

console.log(monsters);

function getHeroPosCenter()
{
	return (screen.width() - hero.width()) / 2;
}

function getMonsters()
{
	var i = 0,
	c = [],
	b = 0;
	while (i < 4) { // выводит 0, затем 1, затем 2
		b += numberPixelsBetweenMonsters;
		c[b] = false;
		i++;
	}
	return c;
}

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
		n >= getHeroPosCenter()
		&& -getBgPos() < bg.width() - screen.width()
	) {
		result = (screen.width() - hero.width()) / 2;
		
	/* Если позиция героя максимально справа, то не двигаться правее */
	} else if (n > screen.width() - hero.width() - 50) {
		result = screen.width() - hero.width() - 50;
		
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
		getHeroPos() >= getHeroPosCenter()
		&& -getBgPos() < bg.width() - screen.width()
	) {
		result = n;

	/* Если задний фон прокручен до конца, то останавливаем его */
	} else if (-n >= bg.width() - screen.width()) {
		result = -(bg.width() - screen.width());
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