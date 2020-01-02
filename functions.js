function arrayValues(input)
{
    let tmp_arr = [],
        cnt = 0;
    for (key in input){
        tmp_arr[cnt] = input[key];
        cnt++;
    }
    return tmp_arr;
}

/**
 * Изменить состояние паузы
 */
function setPause()
{
	$('body').keydown(function(event) {
		if (event.which == 27) {
			event.preventDefault();
			pause = !pause;
		}
	});
}

function init()
{
    $('#screen').html(
        '<div id="menu">' +
            '<div>Введите имя:</div>' +
            '<div>' +
                '<input id="user-name">' +
            '</div>' +
            '<div>' +
                '<button id="start" disabled="disabled">Начать</button>' +
            '</div>' +
        '</div>' +
        '<div id="pause"></div>' +
        '<div id="health"></div>' +
        '<div id="magic"></div>' +
        '<div id="user">Имя игрока</div>' +
        '<div id="timer">00:00</div>' +
        '<div id="dead-monster-counter">Монстров убито: <span>0</span></div>' +
        '<div id="bg">' +
            '<div id="hero"></div>' +
        '</div>'
    );
}

function timer()
{
    setInterval(function() {
        if (pause || end) {
            return;
        }
        let timer = $('#timer').html();
        let time = timer.split(':');
        time[1] = parseInt(time[1]) + 1;
        if (time[1] <= 9) {
            time[1] = '0' + (time[1]).toString();
        }
        if (time[1] == 60) {
            time[1] = '00';
            time[0] = parseInt(time[0]) + 1;
            if (time[0] <= 9) {
                time[0] = '0' + (time[0]).toString();
            }
        }
        $('#timer').html(time[0] + ':' + time[1]);
    }, 1000);
}

function healthRecovery()
{
    setInterval(function() {
        if (pause) {
            return;
        }
        let health = parseInt(heroObj.healthJq.width());
        if (health < 100 && health > 0) {
            health = health + 2;
            if (health > 100) {
                health = 100;
            }
            $('#health').width(health);
            heroObj.healthJq.width(health);
            heroObj.health = health;
        }
    }, 1000);
}