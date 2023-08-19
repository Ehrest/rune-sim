import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rune, RuneSet, RuneSetBonus, StatEdit, StatType, StatTypeFlat } from './RuneDefinition';

interface Props
{
    runes : Rune[];
    enabledRuneSets : RuneSet[];
    baseStats : StatEdit[];
}

function deepCopy(obj: any): any {
    var copy : any;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = deepCopy(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = deepCopy(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
}

function StatGroupDisplay(props : Props) {

    let stats : StatEdit[] = [];

    if (props.baseStats.length === 0) {
        stats = [
            { type: StatType.ATK, value: 0, bonusValue: 0 },
            { type: StatType.DEF, value: 0, bonusValue: 0 },
            { type: StatType.HP, value: 0, bonusValue: 0 },
            { type: StatType.ATKSPD, value: 0, bonusValue: 0 },
            { type: StatType.CRRATE, value: 0, bonusValue: 0 },
            { type: StatType.CDMG, value: 0, bonusValue: 0 },
            { type: StatType.ACC, value: 0, bonusValue: 0 },
            { type: StatType.RES, value: 0, bonusValue: 0 },
            { type: StatType.Precision, value: 0, bonusValue: 0 },
            { type: StatType.Evasion, value: 0, bonusValue: 0 }
        ]
    }
    else
        stats = deepCopy(props.baseStats) as StatEdit[];
        // stats = [...props.baseStats];

    const getRuneBonus = (statType : StatType) : number =>
    {   
        let value = 0;
        // Add rune value
        props.runes.forEach(rune => {
            if(rune.main.type === statType)
                value += rune.main.value;
            if(rune.stone.type === statType)
                value += rune.stone.value;
            if(rune.book.type === statType)
                value += rune.book.value;

            rune.subs.forEach(sub => {
                if (sub.type === statType)
                    value += sub.value;
            });
        });

        // Add set value
        props.enabledRuneSets.forEach(runeSet => {
            if(RuneSetBonus.get(runeSet).stat.type === statType)
                value += RuneSetBonus.get(runeSet).stat.value;
        });

        return value;
    }

    const applyPctStatFormula = (baseStat : number, pctStat : StatType, flatStat : StatType, bonusValue : number) : number =>
    {
        return baseStat + Math.ceil(baseStat * getRuneBonus(pctStat) / 100) + getRuneBonus(flatStat) + bonusValue;
    }

    
    // Du coup la formule ATK DEF HP c'est : Base Stat + Base Stat * % + Bonus flats
    // Base stat c'est (stat - bonus stat)
    for (let i = 0; i < props.baseStats.length; i++) {

        const stat = stats[i];

        let baseStat = props.baseStats[i].value - props.baseStats[i].bonusValue;

        switch (stat.type) {
            case StatType.ATK:
                stat.value = applyPctStatFormula(baseStat, StatType.ATKPCT, StatType.ATK, props.baseStats[i].bonusValue);
                break;
            case StatType.DEF:
                stat.value = applyPctStatFormula(baseStat, StatType.DEFPCT, StatType.DEF, props.baseStats[i].bonusValue);
                break;
            case StatType.HP:
                stat.value = applyPctStatFormula(baseStat, StatType.HPPCT, StatType.HP, props.baseStats[i].bonusValue);
                break;
            case StatType.ATKSPD:
                stat.value = applyPctStatFormula(baseStat, StatType.ATKSPDPCT, StatType.ATKSPD, props.baseStats[i].bonusValue);
                    break;
            default:
                stat.value = Math.ceil((baseStat + getRuneBonus(stat.type) + props.baseStats[i].bonusValue) * 100) / 100;
                break;
        }

        stat.bonusValue = Math.ceil((stat.value - baseStat) * 100) / 100;
    };

    const getStatValueFormated = (type: StatType, value: number) => {
        let node: React.ReactNode;
        if (Object.values<string>(StatTypeFlat).includes(type))
            node = value;
        else
            node = value + '%';

        return node;
    };

    const displayKey = "display";

    const statList = stats.map((stat) =>
        <Row key={stat.type + displayKey}>
            <Col>
                {stat.type}
            </Col>
            <Col key={stat.type + displayKey + 'base'}>
                {getStatValueFormated(stat.type, stat.value)}
            </Col>
            <Col key={stat.type + displayKey + 'bonus'}>
                (+ {getStatValueFormated(stat.type, stat.bonusValue)})
            </Col>
        </Row>
    );

    return (
        <>
            {/* Label */}
            <Container fluid>
                <Row>
                    <Col>

                    </Col>
                    <Col className="fw-bold">
                        Final Stats
                    </Col>
                    <Col className="fw-bold">
                        Bonus
                    </Col>
                </Row>
            </Container>

            {/* Stats */}
            <Container fluid>
                {statList}
            </Container>
        </>
    );
}

export default StatGroupDisplay;