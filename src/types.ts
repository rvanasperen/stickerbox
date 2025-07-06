/**
 * Enum for mana symbols
 */
export enum ManaSymbol {
    White = 'W',
    Blue = 'U',
    Black = 'B',
    Red = 'R',
    Green = 'G',
    Colorless = 'C',
}

export interface StickerData {
    title: string;
    subtitle: string;
    manaSymbols: ManaSymbol[];
    format: string;
    bracket?: number; // Values from 1 to 5
    customBackgroundUrl?: string; // URL to a custom background image
}
