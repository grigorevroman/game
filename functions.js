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