class Bg
{
    /**
     * Инициализация заднего фона
     * @param heroObj
     */
    constructor(heroObj)
    {
        this.bg = $('#bg');
        this.heroObj = heroObj;
    }

    /**
     * Получить новую позицию заднего фона
     * @param curBgPos
     * @param leftButtonNumber
     * @param rightButtonNumber
     * @returns {number}
     */
    getNewBgPos(curBgPos, leftButtonNumber, rightButtonNumber)
    {
        let newBgPos = parseInt(curBgPos) - (d[leftButtonNumber] ? x : 0) + (d[rightButtonNumber] ? x : 0),
        result;

        if (this.isBgScroll()) {
            result = newBgPos;
        }
        return result;
    }

    /**
     * Получить позицию заднего фона
     * @returns {number}
     */
    getBgPos()
    {
        return parseInt(this.bg.css('left'));
    }

    /**
     * Задать позицию заднего фона
     */
    setBgPos()
    {
        let
        curBgPos = this.getBgPos(),
        newBgPos = this.getNewBgPos(curBgPos, 39, 37);

        this.bg.css({left: newBgPos});
    }

    /**
     * Задний фон должен прокручиваться
     * @returns {boolean}
     */
    isBgScroll()
    {
        return this.heroObj.isHeroPosCenter();
    }
}