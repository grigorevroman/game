class Hero
{
    constructor()
    {
        this.hero = $('#hero');
    }

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

    getHeroPos()
    {
        return parseInt(this.hero.css('left'));
    }

    setHeroPos()
    {
        let oldHeroPos = this.hero.css('left'),
        newHeroPos = this.getNewHeroPos(oldHeroPos, 37, 39);
        this.hero.css({left: newHeroPos});
    }

    isHeroPosMin()
    {
        return this.getHeroPos() < HERO_MIN_POS;
    }

    isHeroPosMax()
    {
        return this.getHeroPos() > HERO_MAX_POS;
    }

    isHeroPosCenter()
    {
        return this.getHeroPos() >= HERO_MIN_POS_CENTER && this.getHeroPos() <= HERO_MAX_POS_CENTER;
    }
}