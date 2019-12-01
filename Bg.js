class Bg
{
    constructor(heroObj)
    {
        this.bg = $('#bg');
        this.heroObj = heroObj;
    }

    getNewBgPos(oldBgPos, leftButtonNumber, rightButtonNumber)
    {
        let newBgPos = parseInt(oldBgPos) - (d[leftButtonNumber] ? x : 0) + (d[rightButtonNumber] ? x : 0),
        result;

        if (this.isBgScroll()) {
            result = newBgPos;
        }
        return result;
    }

    getBgPos()
    {
        return parseInt(this.bg.css('left'));
    }

    setBgPos()
    {
        let
        oldBgPos = this.getBgPos(),
        newBgPos = this.getNewBgPos(oldBgPos, 39, 37);

        this.bg.css({left: newBgPos});
    }

    isBgScroll()
    {
        return this.heroObj.isHeroPosCenter();
    }
}