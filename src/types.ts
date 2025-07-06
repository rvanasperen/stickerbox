export type ManaSymbol = 'W' | 'U' | 'B' | 'R' | 'G' | 'C';

export interface StickerData {
    title: string;
    subtitle: string;
    manaSymbols: ManaSymbol[];
    format: string;
}
