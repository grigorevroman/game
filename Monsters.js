class Monsters
{
    /**
     * Инициализация
     * @param bgObj
     */
    constructor(bgObj)
    {
        this.addMonsters(this.getMonsterPoss(), bgObj);
    }

    /**
     * Расчет позиций монстров
     * @returns {Array}
     */
    getMonsterPoss()
    {
        let monsterFields = [START_MONSTER_FIELD];
        let monsterPoss = [];
        let i = 1;
        while (i <= COUNT_MONSTERS) {
            let monsterFieldsNum = monsterFields.length;
            if (monsterFieldsNum > 0) {
                let currentFieldNum = Math.floor(Math.random() * (monsterFieldsNum - 1 + 1)) + 1;
                let currentField = monsterFields[currentFieldNum - 1];
                let monsterPos = Math.floor(Math.random() * (currentField[1] - currentField[0] + 1)) + currentField[0];
                delete monsterFields[currentFieldNum - 1];
                let first = [currentField[0], monsterPos - MONSTER_WIDTH];
                let second = [monsterPos + MONSTER_WIDTH, currentField[1] - MONSTER_WIDTH];
                if (first[1] - first[0] > MONSTER_WIDTH) {
                    monsterFields.push(first);
                }
                if (second[1] - second[0] > MONSTER_WIDTH) {
                    monsterFields.push(second);
                }
                monsterFields = arrayValues(monsterFields);
                monsterPoss.push(monsterPos);
            }
            i++;
        }
        return monsterPoss;
    }

    /**
     * Добавление монстров
     * @param monsterPoss
     */
    addMonsters(monsterPoss)
    {
        let monstersNum = monsterPoss.length;
        let i = 1;
        while (i <= monstersNum) {
            bgObj.bg.append('<div class="monster monster-' + i + '">' +
                '<div class="monster-width monster-width-' + i + '"></div>' +
                '<div>');
            $('.monster-' + i).css({
                left: monsterPoss[i - 1]
            });
            i++;
        }
    }

    /**
     * Получить монстров
     * @returns {jQuery|HTMLElement}
     */
    getMonsters()
    {
        return $('.monster');
    }
}