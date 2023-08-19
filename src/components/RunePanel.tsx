import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { RuneSet, RuneSlotRestriction, StatType, StatTypeFlat, Stat, StatIndex, Rune, RuneSetBonus } from './RuneDefinition';
import RuneStatEdit from './RuneStatEdit';
import RuneSetEdit from './RuneSetEdit';
import { useState } from "react";
import React from 'react';

interface Props {
    onRuneChange: (runes: Rune[], enabledRuneSet: RuneSet[]) => void;
}

function RunePanel(props: Props) {

    // Set up rune slot rules
    const runeSlot1: RuneSlotRestriction = { value: 1, main: [StatType.ATK] };
    const runeSlot2: RuneSlotRestriction = { value: 2, main: [StatType.ATK, StatType.ATKPCT, StatType.DEF, StatType.DEFPCT, StatType.HP, StatType.HPPCT, StatType.ATKSPD] };
    const runeSlot3: RuneSlotRestriction = { value: 3, main: [StatType.DEF] };
    const runeSlot4: RuneSlotRestriction = { value: 4, main: [StatType.ATK, StatType.ATKPCT, StatType.DEF, StatType.DEFPCT, StatType.HP, StatType.HPPCT, StatType.CRRATE, StatType.CDMG] };
    const runeSlot5: RuneSlotRestriction = { value: 5, main: [StatType.HP] };
    const runeSlot6: RuneSlotRestriction = { value: 6, main: [StatType.ATK, StatType.ATKPCT, StatType.DEF, StatType.DEFPCT, StatType.HP, StatType.HPPCT, StatType.ACC, StatType.RES] };

    const [runes, setRunes] = useState<Rune[]>([
        { slot: runeSlot1, set: RuneSet.None, main: { type: StatType.ATK, value: 0 }, stone: { type: StatType.None, value: 0 }, book: { type: StatType.None, value: 0 }, subs: [{ type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }] },
        { slot: runeSlot2, set: RuneSet.None, main: { type: StatType.None, value: 0 }, stone: { type: StatType.None, value: 0 }, book: { type: StatType.None, value: 0 }, subs: [{ type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }] },
        { slot: runeSlot3, set: RuneSet.None, main: { type: StatType.DEF, value: 0 }, stone: { type: StatType.None, value: 0 }, book: { type: StatType.None, value: 0 }, subs: [{ type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }] },
        { slot: runeSlot4, set: RuneSet.None, main: { type: StatType.None, value: 0 }, stone: { type: StatType.None, value: 0 }, book: { type: StatType.None, value: 0 }, subs: [{ type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }] },
        { slot: runeSlot5, set: RuneSet.None, main: { type: StatType.HP, value: 0 }, stone: { type: StatType.None, value: 0 }, book: { type: StatType.None, value: 0 }, subs: [{ type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }] },
        { slot: runeSlot6, set: RuneSet.None, main: { type: StatType.None, value: 0 }, stone: { type: StatType.None, value: 0 }, book: { type: StatType.None, value: 0 }, subs: [{ type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }, { type: StatType.None, value: 0 }] }
    ]
    )

    const [selectedRuneIndex, setSelectedRuneIndex] = useState(-1);

    const onRuneSelect = (index: number) => {
        if (index === selectedRuneIndex)
            index = -1;

        setSelectedRuneIndex(index);
    }

    const getStatValueFormated = (stat: Stat) => {
        let node: React.ReactNode;
        if (Object.values<string>(StatTypeFlat).includes(stat.type))
            node = stat.value;
        else
            node = stat.value + '%';

        return node;
    };

    const runeList = runes.map((item, index) =>
        <ListGroup.Item key={item.slot.value + '_' + index} onClick={() => onRuneSelect(index)}
            active={index === selectedRuneIndex}
        >
            {item.slot.value}. {item.set}
            <span role="img" aria-label="main">🔸</span> {item.main.type} {getStatValueFormated(item.main)}
            {/* <span role="img" aria-label="stone">🔷</span>{item.stone.type} {item.stone.value} 
            <span role="img" aria-label="book">🔶</span>{item.book.type} {item.book.value} 
            <span role="img" aria-label="sub one">🔹</span>{item.subs[0].type}
            <span role="img" aria-label="sub two">🔹</span>{item.subs[1].type}
            <span role="img" aria-label="sub three">🔹</span>{item.subs[2].type}
            <span role="img" aria-label="sub four">🔹</span>{item.subs[3].type} */}
            {/* https://www.prosettings.com/emoji-list/ */}
        </ListGroup.Item>
    );



    // Compute runes sets
    let setEquipped : Map<any, any>;
    let enabledRuneSet: RuneSet[];
    let setDisplayText: string = '';

    const computeRuneSet = () => {
        setEquipped = new Map();
        enabledRuneSet = [];
        setDisplayText = '<b>Set : </b>';

        for (let i = 0; i < runes.length; i++) {
            let rune = runes[i];
            if (rune.set === RuneSet.None)
                continue;

            let runeSetCount = 0;
            if (setEquipped.has(rune.set))
                runeSetCount = setEquipped.get(rune.set);

            setEquipped.set(rune.set, ++runeSetCount);
        }

        // Display runes sets
        setEquipped.forEach((value, runeSet) => {
            // store total for set
            const setBonusCount = RuneSetBonus.get(runeSet).setCount;
            let setRuneLeft = value;

            let setText: string = '';
            // while there are rune left to add (it means that there is several times the same set in the rune build)
            while (setRuneLeft > 0) {
                // Compute the display string
                let setCount = setRuneLeft <= setBonusCount
                    ? `${setRuneLeft}`
                    : `${setBonusCount}`;

                setText = `${runeSet} (${setCount}/${setBonusCount})`

                // if the set is complete, write in bold else in italic
                if (setCount == setBonusCount) {
                    setText = `<span class="text-body-emphasis">${setText}</span>`
                    // and add it to the list so that the rest of the app can be updated
                    enabledRuneSet.push(runeSet);
                }
                else
                    setText = `<span class="text-body-tertiary">${setText}</span>`

                // Decrement count
                setRuneLeft -= setBonusCount;

                setDisplayText += ` ${setText}`;
            }
        });
    }

    computeRuneSet();

    const handleRuneChangeType = (newRune: Rune) => {
        setRunes(
            runes.map((rune) => {
                if (rune.slot.value === newRune.slot.value)
                    return { ...newRune };

                return { ...rune };
            }
            ));

        computeRuneSet();
        props.onRuneChange(runes, enabledRuneSet);
    };

    const handleRuneChangeValue = (newRune: Rune) => {
        setRunes(
            runes.map((rune) => {
                if (rune.slot.value === newRune.slot.value)
                    return { ...newRune };

                return { ...rune };
            }
            ));

        computeRuneSet();
        props.onRuneChange(runes, enabledRuneSet);
    };

    const handleRuneSetChange = (newRune: Rune) => {
        setRunes(
            runes.map((rune) => {
                if (rune.slot.value === newRune.slot.value)
                    return { ...newRune };

                return { ...rune };
            }
            ));

        computeRuneSet();
        props.onRuneChange(runes, enabledRuneSet);
    };

    const runeEditDisplay =
        selectedRuneIndex < 0
            ?
            <p className="text-center fst-italic align-middle">
                Click on a rune to change it
            </p>
            :
            <>
                <RuneSetEdit rune={runes[selectedRuneIndex]} onChangeType={handleRuneSetChange} />

                <Col>
                    <RuneStatEdit statIndex={StatIndex.Main} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                    <RuneStatEdit statIndex={StatIndex.Stone} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                    <RuneStatEdit statIndex={StatIndex.Book} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                </Col>
                <Col>
                    <RuneStatEdit statIndex={StatIndex.Sub1} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                    <RuneStatEdit statIndex={StatIndex.Sub2} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                    <RuneStatEdit statIndex={StatIndex.Sub3} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                    <RuneStatEdit statIndex={StatIndex.Sub4} rune={runes[selectedRuneIndex]} onChangeType={handleRuneChangeType} onChangeValue={handleRuneChangeValue} />
                </Col>
            </>

    // ---
    return (
        <>
            <Container fluid className="mt-4">
                {/* Rune list */}
                <ListGroup>
                    {runeList}
                </ListGroup>

                {/* Set Display */}
                <Row className="mx-3 mt-1">
                    <p dangerouslySetInnerHTML={{ __html: setDisplayText }}></p>
                </Row>

                {/* Rune Config */}
                <Row className="mx-3">
                    {runeEditDisplay}
                </Row>
            </Container>
        </>
    );
}

export default RunePanel;