// import { RuneSet, RuneSlotRestriction, StatType, Stat, Rune} from './RuneDefinition';

export enum RuneSet {
    None = "None",
    Energy = "Energy",
    Guard = "Guard",
    Blade = "Blade",
    Rage = "Rage",
    Fatal = "Fatal",
    Swift = "Swift",
    Focus = "Focus",
    Endure = "Endure",
    Foresight = "Foresight",
    Assemble = "Assemble",
    Despair = "Despair",
    Vampire = "Vampire",
    Shield = "Shield",
    Destroy = "Destroy",
}

export enum StatType {
    None = 'None',
    ATK = 'ATK',
    ATKPCT = "ATK (%)",
    DEF = 'DEF',
    DEFPCT = 'DEF (%)',
    HP = 'HP',
    HPPCT = 'HP (%)',
    ATKSPD = 'ATK SPD',
    ATKSPDPCT = 'ATK SPD (%)',
    CRRATE = 'CRIT Rate',
    CDMG = 'CRIT DMG',
    ACC = 'Accuracy',
    RES = 'Resistance',
    Precision = 'Precision',
    Evasion = 'Evasion',
}

export enum StatTypeFlat
{
    None = 'None',
    ATK = 'ATK',
    DEF = 'DEF',
    HP = 'HP',
    ATKSPD = 'ATK SPD',
}

export enum StatIndex {
    Main = 'Main',
    Stone = 'Stone',
    Book = 'Book',
    Sub1 = 'Sub1',
    Sub2 = 'Sub2',
    Sub3 = 'Sub3',
    Sub4 = 'Sub4',
}

interface RuneSlotRestriction {
    value: number,
    main: Array<StatType>,
}

interface Stat {
    type: StatType,
    value: number,
}

interface StatEdit {
    type: StatType,
    value: number,
    bonusValue: number
}

interface Rune {
    slot: RuneSlotRestriction,
    set: RuneSet,
    main: Stat,
    stone: Stat,
    book: Stat,
    subs: Array<Stat>
}

export const RuneSetBonus: any = new Map([
    [RuneSet.None, { setCount: 0, stat: { type: StatType.None, value: 0 } }],
    [RuneSet.Energy, { setCount: 2, stat: { type: StatType.HPPCT, value: 15 } }],
    [RuneSet.Guard, { setCount: 2, stat: { type: StatType.DEFPCT, value: 15 } }],
    [RuneSet.Blade, { setCount: 2, stat: { type: StatType.CRRATE, value: 12 } }],
    [RuneSet.Rage, { setCount: 4, stat: { type: StatType.CDMG, value: 40 } }],
    [RuneSet.Fatal, { setCount: 4, stat: { type: StatType.ATKPCT, value: 35 } }],
    [RuneSet.Swift, { setCount: 4, stat: { type: StatType.ATKSPDPCT, value: 35 } }],
    [RuneSet.Focus, { setCount: 2, stat: { type: StatType.ACC, value: 15 } }],
    [RuneSet.Endure, { setCount: 2, stat: { type: StatType.RES, value: 15 } }],
    [RuneSet.Foresight, { setCount: 2, stat: { type: StatType.Evasion, value: 20 } }],
    [RuneSet.Assemble, { setCount: 2, stat: { type: StatType.Precision, value: 20 } }],
    [RuneSet.Despair, { setCount: 4, stat: { type: StatType.None, value: 0 } }],
    [RuneSet.Vampire, { setCount: 4, stat: { type: StatType.None, value: 0 } }],
    // [RuneSet.Shield, { setCount: 2, stat: { type: StatType.ATKPCT, value: 250 } }],
    [RuneSet.Shield, { setCount: 2, stat: { type: StatType.None, value: 0 } }],
    [RuneSet.Destroy, { setCount: 2, stat: { type: StatType.None, value: 0 } }],
]);

export type
{
    RuneSlotRestriction,
    Stat,
    StatEdit,
    Rune
}