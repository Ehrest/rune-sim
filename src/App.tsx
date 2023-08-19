import StatGroupEditable from './components/StatGroupEditable'
import StatGroupDisplay from './components/StatGroupDisplay'
import RunePanel from './components/RunePanel'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Rune, RuneSet, StatEdit } from './components/RuneDefinition';
import { useState } from 'react';

function App() {

  const [cachedRunes, setCachedRunes] = useState<Rune[]>([]);
  const [cachedEnabledRuneSet, setCachedEnabledRuneSet] = useState<RuneSet[]>([]);
  const [cachedStats, setCachedStats] = useState<StatEdit[]>([]);

  const handleRuneChange = (runes: Rune[], enabledRuneSet: RuneSet[]) => {
    console.log(enabledRuneSet);
    setCachedRunes(runes);
    setCachedEnabledRuneSet(enabledRuneSet);
  };

  const handleStatChange = (stats: StatEdit[]) => {
    setCachedStats(stats);
  };

  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>Rune Simulation</h1>
        </Col>
      </Row>
      <Row>
        <Col xs={5} md={5} lg={5}>
          <Row>
            <StatGroupEditable onStatChange={(stats: StatEdit[]) => handleStatChange(stats)}/>
          </Row>
          <Row className='mt-4'>
            <StatGroupDisplay runes={cachedRunes} enabledRuneSets={cachedEnabledRuneSet} baseStats={cachedStats}/>
          </Row>
        </Col>
        <Col xs={7} md={7} lg={7}>
          <RunePanel onRuneChange={(runes: Rune[], enabledRuneSet: RuneSet[]) => handleRuneChange(runes, enabledRuneSet)} />
        </Col>
      </Row>
      <Row>
        {/* <Col className="text-center mt-5">
          <h3>Skill Simulator</h3>
          + button with modal that ask for name and details
        </Col> */}
      </Row>
    </Container>
  )
}

export default App
