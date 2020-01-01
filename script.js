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

init();

let
x = 2, // Количество пикселей, которое преодолевает герой при одном нажатии на клавишу
d = {}, // Состояние клавишь <- и ->
pause = false, // Пауза
end = false, // Гибель героя
userNameJq = $('#user-name'),
userName,
startJq = $('#start'),
usersJson,
user = {},
users = {},
menuJq = $('#menu');

/**
 * Инициальзация объектов
 */
let heroObj = new Hero();
let bgObj = new Bg(heroObj);
new Screen();
let monstersObj = new Monsters(bgObj);

userNameJq.keyup(function() {
    userName = userNameJq.val();
    if (userName != '') {
        startJq.removeAttr('disabled');
    } else {
        startJq.attr('disabled', 'disabled');
    }
});

startJq.click(function() {
    usersJson = localStorage.getItem(users);
    users = JSON.parse(usersJson);
    if (users) {
        if (userName in users) {
            users = users;
        } else {
            user.name = userName;
            user.points = [];
            users[userName] = [user];
            usersJson = JSON.stringify(users);
            localStorage.setItem(users, usersJson);
        }
    }
    menuJq.hide();

    /**
     * Зажатие клавишь
     */
    $(window).keydown(function(e) {
        d[e.which] = true;
    });

    /**
     * Отжатие клавишь
     */
    $(window).keyup(function(e) {
        d[e.which] = false;
    });

    game();
});

function game()
{
    setInterval(function() {
        console.log(1);
    }, 1000);

    /**
     * Пауза
     */
    setPause();

    setInterval(function()
    {
        /**
         * Гибель героя
         */
        if (end) {
            $('#pause').fadeIn(100);
            return;
        }

        /**
         * Пауза
         */
        if (pause) {
            $('#pause').fadeIn(100);
            return;
        } else {
            $('#pause').fadeOut(100);
        }

        /**
         * Новая позиция героя
         */
        heroObj.setHeroPos();

        /**
         * Новая позиция заднего фона
         */
        bgObj.setBgPos();

        /**
         * Стрельба героя
         */
        heroObj.shootArrow();

        /**
         * Манипуляции с монстрами
         */
        monstersObj.getMonsters().each(function() {
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
                    let dmc = parseInt($('#dead-monster-counter > span').html());
                    $('#dead-monster-counter > span').html(dmc + 1);
                }
            }
        });

        /**
         * Определение ближайшего монстра к герою
         */
        let minPosMonster = 10000;
        $('.monster').each(function() {
            if (minPosMonster > parseInt($(this).css('left'))) {
                minPosMonster = parseInt($(this).css('left'));
            }
        });

        /**
         * Уменьшение здоровья героя при столкновении с монстром
         */
        if (heroObj.getHeroPos() + HERO_WIDTH >= minPosMonster) {
            heroObj.setHeroHealth(heroObj.getHeroHealth() - 1);
        }

        /**
         * Гибель героя
         */
        if (heroObj.getHeroHealth() <= 0) {
            heroObj.healthJq.hide();
            $('#hero').fadeOut(500);
            end = true;
        }

        /**
         * Изменение линии жизни героя
         */
        heroObj.healthJq.width(heroObj.getHeroHealth());

    }, 20);
}