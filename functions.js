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

function setPause()
{
    setInterval(function() {
        if (d[27]) {
            pause = !pause;
        }
    }, 100);
}