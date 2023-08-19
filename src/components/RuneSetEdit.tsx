import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { RuneSet, RuneSlotRestriction, StatType, Stat, Rune } from './RuneDefinition';

interface Props {
    rune: Rune;
    onChangeType: (rune: Rune, runeSet: RuneSet) => void;
}

function RuneSetEdit(props: Props) {

    const runeSets: Array<RuneSet> = [
        RuneSet.None,
        RuneSet.Energy,
        RuneSet.Guard,
        RuneSet.Blade,
        RuneSet.Rage,
        RuneSet.Fatal,
        RuneSet.Swift,
        RuneSet.Focus,
        RuneSet.Endure,
        RuneSet.Foresight,
        RuneSet.Assemble,
        RuneSet.Despair,
        RuneSet.Vampire,
        RuneSet.Shield,
        RuneSet.Destroy,
    ]

    const onSelectSet = (index : number) =>
    {
        props.rune.set = runeSets[index];
        props.onChangeType(props.rune, props.rune.set);
    }

    const runeSetSelect = runeSets.map((item, index) =>
        <option key={item + '_' + index} value={index}>{item}</option>
    );

    const getSetIndex = () =>
    {
        return runeSets.indexOf(props.rune.set);
    }

    return (
        <>
            <Row className='mb-2'>
                <Col sm="3">
                    <b>Rune {props.rune.slot.value}</b> :
                </Col>
                <Col md="auto">
                    <Form.Select size="sm" value={getSetIndex()} onChange={(e) => onSelectSet(Number(e.target.value))}>
                        {runeSetSelect}
                    </Form.Select>
                </Col>
            </Row>
        </>
    );
}

export default RuneSetEdit;