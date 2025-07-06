import { GUILD_NAMES, MANA_SYMBOLS, MANA_SYMBOL_SORT_ORDER } from './constants';
import { ManaSymbol } from './types';

export function getBackgroundImageUrl(manaSymbols: ManaSymbol[]): string | null {
    const sanitizedManaSymbols = sanitizeManaSymbols(manaSymbols);

    if (!sanitizedManaSymbols.length) {
        return null;
    }

    if (sanitizedManaSymbols.length === 1) {
        return `${import.meta.env.BASE_URL}images/symbols/${sanitizedManaSymbols[0]}.svg`;
    }

    const guild = getGuildName(sanitizedManaSymbols);

    if (!guild) {
        return null;
    }

    if (sanitizedManaSymbols.length === 2) {
        return `${import.meta.env.BASE_URL}images/guilds/${guild.toLowerCase()}.png`;
    }

    if (sanitizedManaSymbols.length === 3) {
        return `${import.meta.env.BASE_URL}images/guilds/${guild.toLowerCase()}.jpg`;
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

    // Join the symbols to form a key for the GUILD_NAMES object
    const key = sanitizedManaSymbols.join('');
    return GUILD_NAMES[key] || '';
}

export function sanitizeManaSymbols(manaSymbols: ManaSymbol[]): ManaSymbol[] {
    if (!manaSymbols || manaSymbols.length === 0) {
        return [];
    }

    const seen = new Set<ManaSymbol>();

    // Filter out duplicates and invalid symbols
    return manaSymbols
        .filter((symbol) => {
            if (MANA_SYMBOL_SORT_ORDER.includes(symbol) && !seen.has(symbol)) {
                seen.add(symbol);
                return true;
            }
            return false;
        })
        .sort((a, b) => MANA_SYMBOL_SORT_ORDER.indexOf(a) - MANA_SYMBOL_SORT_ORDER.indexOf(b));
}

// Helper function to convert string to ManaSymbol array (for backward compatibility)
export function stringToManaSymbols(manaString: string): ManaSymbol[] {
    if (!manaString) {
        return [];
    }

    const result: ManaSymbol[] = [];
    const seen = new Set<ManaSymbol>();

    // Process each character in the string
    manaString.split('').forEach((char) => {
        const upperChar = char.toUpperCase() as ManaSymbol;
        if (MANA_SYMBOLS.includes(upperChar) && !seen.has(upperChar)) {
            seen.add(upperChar);
            result.push(upperChar);
        }
    });

    return result.sort((a, b) => MANA_SYMBOL_SORT_ORDER.indexOf(a) - MANA_SYMBOL_SORT_ORDER.indexOf(b));
}

// Helper function to convert ManaSymbol array to string (for localStorage)
export function manaSymbolsToString(manaSymbols: ManaSymbol[]): string {
    return manaSymbols.join('');
}
