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
     * @param oldHeroPos
     * @param leftButtonNumber
     * @param rightButtonNumber
     * @returns {number}
     */
    getNewHeroPos(oldHeroPos, leftButtonNumber, rightButtonNumber)
    {
        let newHeroPos = parseInt(oldHeroPos) - (d[leftButtonNumber] ? x : 0) + (d[rightButtonNumber] ? x : 0),
        result;

        if (this.isHeroPosMin()) {
            result = HERO_MIN_POS;
        } else if (this.isHeroPosMax()) {
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
        let oldHeroPos = this.getHeroPos(),
        newHeroPos = this.getNewHeroPos(oldHeroPos, 37, 39);

        this.hero.css({left: newHeroPos});
    }

    /**
     * Герой в минимальной позиции
     * @returns {boolean}
     */
    isHeroPosMin()
    {
        return this.getHeroPos() < HERO_MIN_POS;
    }

    /**
     * Герой в максимальной позиции
     * @returns {boolean}
     */
    isHeroPosMax()
    {
        return this.getHeroPos() > HERO_MAX_POS;
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