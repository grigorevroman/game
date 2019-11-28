class Hero
{
    constructor()
    {
        this.hero = $('#hero');
        this.heroPosMin = 0;
    }

    getNewHeroPos(oldHeroPos, leftButtonNumber, rightButtonNumber)
    {
        let newHeroPos = parseInt(oldHeroPos) - (d[leftButtonNumber] ? x : 0) + (d[rightButtonNumber] ? x : 0),
        result;
        if (this.isHeroPosMin(newHeroPos)) {
            result = this.heroPosMin;
        } else if (this.isHeroPosMax(newHeroPos)) {
            result = bg.width() - this.hero.width();
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

    isHeroPosMin(heroPos)
    {
        return heroPos < this.heroPosMin;
    }

    isHeroPosMax(heroPos)
    {
        return heroPos > bg.width() - this.hero.width();
    }

    isHeroCenter(heroPos)
    {
        return heroPos >= heroPosCenterMin && heroPos <= heroPosCenterMax;
    }
}