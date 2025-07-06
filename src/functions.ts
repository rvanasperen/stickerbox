import { ManaSymbol } from './types';

export function getBackgroundImageUrl(manaSymbols: ManaSymbol[]): string | null {
    const sanitizedManaSymbols = sanitizeManaSymbols(manaSymbols);

    if (!sanitizedManaSymbols.length) {
        return null;
    }

    if (sanitizedManaSymbols.length === 1) {
        return `images/symbols/${sanitizedManaSymbols[0]}.svg`;
    }

    const guild = getGuildName(sanitizedManaSymbols);

    if (!guild) {
        return null;
    }

    if (sanitizedManaSymbols.length === 2) {
        return `images/guilds/${guild.toLowerCase()}.png`;
    }

    if (sanitizedManaSymbols.length === 3) {
        return `images/guilds/${guild.toLowerCase()}.jpg`;
    }

    // Note: 3-color guilds are fan-made. There are no known images for 4/5
    // color guilds

    return null;
}

export function getGuildName(manaSymbols: ManaSymbol[]): string {
    const sanitizedManaSymbols = sanitizeManaSymbols(manaSymbols);

    if (!sanitizedManaSymbols.length) {
        return '';
    }

    const guilds: { [index: string]: string } = {
        C: 'Colorless',
        W: 'White',
        U: 'Blue',
        B: 'Black',
        R: 'Red',
        G: 'Green',
        WU: 'Azorius',
        WB: 'Orzhov',
        WR: 'Boros',
        WG: 'Selesnya',
        UB: 'Dimir',
        UR: 'Izzet',
        UG: 'Simic',
        BR: 'Rakdos',
        BG: 'Golgari',
        RG: 'Gruul',
        WUB: 'Esper',
        WUR: 'Jeskai',
        WUG: 'Bant',
        WBR: 'Mardu',
        WBG: 'Abzan',
        WRG: 'Naya',
        UBR: 'Grixis',
        UBG: 'Sultai',
        URG: 'Temur',
        BRG: 'Jund',
        WUBR: 'Yore-Tiller',
        WUBG: 'Witch-Maw',
        WURG: 'Ink-Treader',
        WBRG: 'Dune-Brood',
        UBRG: 'Glint-Eye',
        WUBRG: 'Rainbow',
    };

    // Join the symbols to form a key for the guilds object
    const key = sanitizedManaSymbols.join('');
    return guilds[key] || '';
}

export function sanitizeManaSymbols(manaSymbols: ManaSymbol[]): ManaSymbol[] {
    if (!manaSymbols || manaSymbols.length === 0) {
        return [];
    }

    const sortOrder: ManaSymbol[] = ['W', 'U', 'B', 'R', 'G', 'C'];
    const seen = new Set<ManaSymbol>();

    // Filter out duplicates and invalid symbols
    return manaSymbols
        .filter((symbol) => {
            if (sortOrder.includes(symbol) && !seen.has(symbol)) {
                seen.add(symbol);
                return true;
            }
            return false;
        })
        .sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
}

// Helper function to convert string to ManaSymbol array (for backward compatibility)
export function stringToManaSymbols(manaString: string): ManaSymbol[] {
    if (!manaString) {
        return [];
    }

    const validSymbols: ManaSymbol[] = ['W', 'U', 'B', 'R', 'G', 'C'];
    const result: ManaSymbol[] = [];
    const seen = new Set<ManaSymbol>();

    // Process each character in the string
    manaString.split('').forEach((char) => {
        const upperChar = char.toUpperCase() as ManaSymbol;
        if (validSymbols.includes(upperChar) && !seen.has(upperChar)) {
            seen.add(upperChar);
            result.push(upperChar);
        }
    });

    return result.sort((a, b) => validSymbols.indexOf(a) - validSymbols.indexOf(b));
}

// Helper function to convert ManaSymbol array to string (for localStorage)
export function manaSymbolsToString(manaSymbols: ManaSymbol[]): string {
    return manaSymbols.join('');
}
