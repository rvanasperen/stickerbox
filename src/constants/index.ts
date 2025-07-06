import { ManaSymbol } from '../types';

/**
 * Mana symbols used in the application
 */
export const MANA_SYMBOLS = [ManaSymbol.White, ManaSymbol.Blue, ManaSymbol.Black, ManaSymbol.Red, ManaSymbol.Green, ManaSymbol.Colorless] as const;

/**
 * Guild names mapping
 */
export const GUILD_NAMES: Record<string, string> = {
    [ManaSymbol.Colorless]: 'Colorless',
    [ManaSymbol.White]: 'White',
    [ManaSymbol.Blue]: 'Blue',
    [ManaSymbol.Black]: 'Black',
    [ManaSymbol.Red]: 'Red',
    [ManaSymbol.Green]: 'Green',
    [`${ManaSymbol.White}${ManaSymbol.Blue}`]: 'Azorius',
    [`${ManaSymbol.White}${ManaSymbol.Black}`]: 'Orzhov',
    [`${ManaSymbol.White}${ManaSymbol.Red}`]: 'Boros',
    [`${ManaSymbol.White}${ManaSymbol.Green}`]: 'Selesnya',
    [`${ManaSymbol.Blue}${ManaSymbol.Black}`]: 'Dimir',
    [`${ManaSymbol.Blue}${ManaSymbol.Red}`]: 'Izzet',
    [`${ManaSymbol.Blue}${ManaSymbol.Green}`]: 'Simic',
    [`${ManaSymbol.Black}${ManaSymbol.Red}`]: 'Rakdos',
    [`${ManaSymbol.Black}${ManaSymbol.Green}`]: 'Golgari',
    [`${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Gruul',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Black}`]: 'Esper',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Red}`]: 'Jeskai',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Green}`]: 'Bant',
    [`${ManaSymbol.White}${ManaSymbol.Black}${ManaSymbol.Red}`]: 'Mardu',
    [`${ManaSymbol.White}${ManaSymbol.Black}${ManaSymbol.Green}`]: 'Abzan',
    [`${ManaSymbol.White}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Naya',
    [`${ManaSymbol.Blue}${ManaSymbol.Black}${ManaSymbol.Red}`]: 'Grixis',
    [`${ManaSymbol.Blue}${ManaSymbol.Black}${ManaSymbol.Green}`]: 'Sultai',
    [`${ManaSymbol.Blue}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Temur',
    [`${ManaSymbol.Black}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Jund',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Black}${ManaSymbol.Red}`]: 'Yore-Tiller',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Black}${ManaSymbol.Green}`]: 'Witch-Maw',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Ink-Treader',
    [`${ManaSymbol.White}${ManaSymbol.Black}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Dune-Brood',
    [`${ManaSymbol.Blue}${ManaSymbol.Black}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Glint-Eye',
    [`${ManaSymbol.White}${ManaSymbol.Blue}${ManaSymbol.Black}${ManaSymbol.Red}${ManaSymbol.Green}`]: 'Rainbow',
};

/**
 * Sticker dimensions
 */
export const STICKER_DIMENSIONS = {
    width: '63.5mm',
    height: '38.1mm',
};

/**
 * Default empty sticker data
 */
export const DEFAULT_STICKER = {
    title: '',
    subtitle: '',
    manaSymbols: [] as ManaSymbol[],
    format: '',
    bracket: undefined,
    customBackgroundUrl: '',
};

/**
 * Sort order for mana symbols
 */
export const MANA_SYMBOL_SORT_ORDER = [ManaSymbol.White, ManaSymbol.Blue, ManaSymbol.Black, ManaSymbol.Red, ManaSymbol.Green, ManaSymbol.Colorless];

/**
 * Color classes for mana symbols
 */
export const MANA_SYMBOL_COLORS = {
    [ManaSymbol.White]: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
    [ManaSymbol.Blue]: 'bg-blue-100 border-blue-300 hover:bg-blue-200',
    [ManaSymbol.Black]: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
    [ManaSymbol.Red]: 'bg-red-50 border-red-200 hover:bg-red-100',
    [ManaSymbol.Green]: 'bg-green-50 border-green-200 hover:bg-green-100',
    [ManaSymbol.Colorless]: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
};
