export type ManaSymbol = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';

export interface StickerData {
    title: string;
    subtitle: string;
    manaSymbols: ManaSymbol[];
    format: string;
    bracket?: number; // Values from 1 to 5
    customBackgroundUrl?: string; // URL to a custom background image
}
