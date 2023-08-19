import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { StatType, StatIndex, Rune } from './RuneDefinition';

interface Props {
    statIndex: StatIndex,
    rune: Rune;
    onChangeType: (rune: Rune) => void;
    onChangeValue: (rune: Rune) => void;
}

function RuneStatEdit(props: Props) {

    let statRestriction : Array<StatType>;
    if(props.statIndex === StatIndex.Main)
    {
        if(props.rune.slot.main.length == 1)
            statRestriction = [...props.rune.slot.main];
        else
            statRestriction = [StatType.None, ...props.rune.slot.main];
    }
    else
        statRestriction = [StatType.None, StatType.ATK, StatType.ATKPCT, StatType.DEF, StatType.DEFPCT, StatType.HP, StatType.HPPCT, StatType.ATKSPD, StatType.CRRATE, StatType.CDMG, StatType.ACC,  StatType.RES,  StatType.Precision,  StatType.Evasion]

    const statTypeSelect = statRestriction.map((item, index) =>
        <option key={"select_" + item + "_type"} value={index}>{item}</option>
    );

    const onSelectType = (index : number) =>
    {
        let newType = statRestriction[index];

        switch (props.statIndex) {
            case StatIndex.Main:
                props.rune.main.type = newType;
                break;
            case StatIndex.Stone:
                props.rune.stone.type = newType;
                break;
            case StatIndex.Book:
                props.rune.book.type = newType;
                break;
            // Subs
            default:
                let subIndex = (Object.keys(StatIndex).indexOf(props.statIndex) - 3);
                props.rune.subs[subIndex].type = newType;
                break;
        }

        props.onChangeType(props.rune);
    }

    const getStatTypeIndex = () =>
    {
        let statType : StatType;

        switch (props.statIndex) {
            case StatIndex.Main:
                statType = props.rune.main.type;
                break;
            case StatIndex.Stone:
                statType = props.rune.stone.type;
                break;
            case StatIndex.Book:
                statType = props.rune.book.type;
                break;
            // Subs
            default:
                let subIndex = (Object.keys(StatIndex).indexOf(props.statIndex) - 3);
                statType = props.rune.subs[subIndex].type;
                break;
        }

        return statRestriction.indexOf(statType);
    }

    const onSelectValue = (newValue : number) =>
    {
        switch (props.statIndex) {
            case StatIndex.Main:
                props.rune.main.value = newValue;
                break;
            case StatIndex.Stone:
                props.rune.stone.value = newValue;
                break;
            case StatIndex.Book:
                props.rune.book.value = newValue;
                break;
            // Subs
            default:
                let subIndex = (Object.keys(StatIndex).indexOf(props.statIndex) - 3);
                props.rune.subs[subIndex].value = newValue;
                break;
        }

        props.onChangeValue(props.rune);
    }

    const getStatValue = () =>
    {
        switch (props.statIndex) {
            case StatIndex.Main:
                return props.rune.main.value;
            case StatIndex.Stone:
                return props.rune.stone.value;
            case StatIndex.Book:
                return props.rune.book.value;
            // Subs
            default:
                let subIndex = (Object.keys(StatIndex).indexOf(props.statIndex) - 3);
                return props.rune.subs[subIndex].value;
        }
    }

    return (
        <>
            <Row>
                <Col sm={2}>
                    {props.statIndex}
                </Col>
                <Col>
                    <Form.Select size="sm" value={getStatTypeIndex()} onChange={(e) => onSelectType(Number(e.target.value))}>
                        {statTypeSelect}
                    </Form.Select>
                </Col>
                <Col>
                    <Form.Control type="number" size="sm" className="me-auto" placeholder='' value={getStatValue()} onChange={(e) => onSelectValue(Number(e.target.value))}/>
                </Col>
            </Row>
        </>
    );
}

export default RuneStatEdit;