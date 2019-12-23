const
SCREEN_WIDTH = 1000, // Ширина экрана
BG_WIDTH = 2000, // Ширина заднего фона
HERO_WIDTH = 100, // Ширина героя
HERO_MIN_POS = 0, // Минимальная позиция героя
HERO_MAX_POS = BG_WIDTH - HERO_WIDTH, // Максимальная позиция героя
HERO_MIN_POS_CENTER = (SCREEN_WIDTH - HERO_WIDTH) / 2, // Минимальная поциция героя в центре
HERO_MAX_POS_CENTER = BG_WIDTH - SCREEN_WIDTH + HERO_MIN_POS_CENTER, // Максимальная позиция героя в центре
MONSTER_WIDTH = 100,
START_MONSTER_FIELD = [SCREEN_WIDTH, BG_WIDTH],
HERO_HEALTH = 100;

let
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
pause = false; // Пауза

$(window).keydown(function(e) { 
	d[e.which] = true; 
});

$(window).keyup(function(e) { 
	d[e.which] = false; 
});

let heroObj = new Hero();
let bgObj = new Bg(heroObj);
new Screen();
new Monsters(bgObj);
let arrowObj = new Arrow();

setPause();

setInterval(function()
{
    if (pause) {
        return;
    }

	heroObj.setHeroPos();
	bgObj.setBgPos();
	heroObj.shootArrow();

    $('.monster').each(function() {
        let pos = parseInt($(this).css('left'));
        $(this).css({
            left: pos - 1
        });
        let arrowObj = new Arrow();
        if (parseInt(arrowObj.arrow.css('left')) >= pos) {
            arrowObj.arrow.remove();
            let width = parseInt($(this).find('.monster-width').width());
            $(this).find('.monster-width').width(width - 25);
            if (parseInt($(this).find('.monster-width').width()) <= 0) {
                $(this).remove();
            }
        }
    });

    let minPosMonster = 10000;
    $('.monster').each(function() {
        if (minPosMonster > parseInt($(this).css('left'))) {
            minPosMonster = parseInt($(this).css('left'));
        }
    });

    if (heroObj.getHeroPos() + HERO_WIDTH >= minPosMonster) {
        heroObj.setHeroHealth(heroObj.getHeroHealth() - 1);
    }

    if (heroObj.getHeroHealth() <= 0) {
        heroObj.healthJq.hide();
        $('#hero').fadeOut(500);
    }
    heroObj.healthJq.width(heroObj.getHeroHealth());

}, 20);