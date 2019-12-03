class Hero
{
    /**
     * Инициализация героя
     */
    constructor()
    {
        this.hero = $('#hero');
    }

    /**
     * Получить новую позицию героя
     * @param curHeroPos
     * @param leftButtonNumber
     * @param rightButtonNumber
     * @returns {number}
     */
    getNewHeroPos(curHeroPos, leftButtonNumber, rightButtonNumber)
    {
        let newHeroPos = parseInt(curHeroPos) - (d[leftButtonNumber] ? x : 0) + (d[rightButtonNumber] ? x : 0),
        result;

        if (this.isHeroPosMin(newHeroPos)) {
            result = HERO_MIN_POS;
        } else if (this.isHeroPosMax(newHeroPos)) {
            result = HERO_MAX_POS;
        } else {
            result = newHeroPos;
        }
        return result;
    }

    /**
     * Получить позицию героя
     * @returns {number}
     */
    getHeroPos()
    {
        return parseInt(this.hero.css('left'));
    }

    /**
     * Задать позицию герою
     */
    setHeroPos()
    {
        let 
        curHeroPos = this.getHeroPos(),
        newHeroPos = this.getNewHeroPos(curHeroPos, 37, 39);

        this.hero.css({left: newHeroPos});
    }

    /**
     * Герой в минимальной позиции
     * @param newHeroPos
     * @returns {boolean}
     */
    isHeroPosMin(newHeroPos)
    {
        return newHeroPos <= HERO_MIN_POS;
    }

    /**
     * Герой в максимальной позиции
     * @param newHeroPos
     * @returns {boolean}
     */
    isHeroPosMax(newHeroPos)
    {
        return newHeroPos >= HERO_MAX_POS;
    }

    /**
     * Герой в центральной позиции
     * @returns {boolean}
     */
    isHeroPosCenter()
    {
        return this.getHeroPos() >= HERO_MIN_POS_CENTER && this.getHeroPos() <= HERO_MAX_POS_CENTER;
    }
}