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
        '<div id="user">Имя игрока</div>' +
        '<div id="timer">00:00</div>' +
        '<div id="dead-monster-counter">Монстров убито: <span>0</span></div>' +
        '<div id="bg">' +
            '<div id="hero"></div>' +
        '</div>'
    );
}