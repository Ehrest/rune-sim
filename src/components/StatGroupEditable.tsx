import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { StatEdit, StatType } from './RuneDefinition';
import { useState } from 'react';

interface Props {
    onStatChange: (stats: StatEdit[]) => void;
}

function StatGroupEditable(props : Props) {
    const [stats, setStats] = useState<StatEdit[]>([
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
    ])

    const editableKey = "edit";

    const handleChangeValue = (statIndex: number, newValue: number) => {
        let newStats = stats;
        newStats[statIndex].value = newValue;
        setStats(newStats);

        props.onStatChange(newStats);

        let newStat = { type: stats[statIndex].type, value: newValue, bonusValue: stats[statIndex].bonusValue };

        setStats(
            stats.map((stat) => {
                if (stat.type === newStat.type)
                    return { ...newStat };

                return { ...stat };
            }
            ));
    };

    const handleChangeBonusValue = (statIndex: number, newValue: number) => {
        let newStats = stats;
        newStats[statIndex].bonusValue = newValue;
        setStats(newStats);

        props.onStatChange(newStats);

        let newStat = { type: stats[statIndex].type, value: stats[statIndex].value, bonusValue: newValue };

        setStats(
            stats.map((stat) => {
                if (stat.type === newStat.type)
                    return { ...newStat };

                return { ...stat };
            }
            ));
    };

    const statList = stats.map((stat, index) =>
        <Row key={stat.type + editableKey}>
            <Col>
                {stat.type}
            </Col>
            <Col key={stat.type + editableKey + 'base'}>
                <Form.Control type="number" size="sm" className="me-auto" placeholder="" value={stat.value} onChange={(e) => handleChangeValue(index, Number(e.target.value))}/>
            </Col>
            <Col key={stat.type + editableKey + 'bonus'}>
                <Form.Control type="number" size="sm" className="me-auto" placeholder="" value={stat.bonusValue} onChange={(e) => handleChangeBonusValue(index, Number(e.target.value))}/>
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
                        Base Stats
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

export default StatGroupEditable;