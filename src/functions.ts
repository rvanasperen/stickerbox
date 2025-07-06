export function getBackgroundImageUrl(manaSymbols: string): string | null {
    const sanitizedManaSymbols = sanitizeManaSymbols(manaSymbols);

    if (!sanitizedManaSymbols) {
        return null;
    }

    if (sanitizedManaSymbols.length === 1) {
        return `/src/assets/images/symbols/${sanitizedManaSymbols}.svg`;
    }

    const guild = getGuildName(sanitizedManaSymbols);

    if (!guild) {
        return null;
    }

    if (sanitizedManaSymbols.length === 2) {
        return `/src/assets/images/guilds/${guild.toLowerCase()}.png`;
    }

    if (sanitizedManaSymbols.length === 3) {
        return `/src/assets/images/guilds/${guild.toLowerCase()}.jpg`;
    }

    // Note: 3-color guilds are fan-made. There are no known images for 4/5
    // color guilds

    return null;
}

export function getGuildName(manaSymbols: string): string {
    const sanitizedManaSymbols = sanitizeManaSymbols(manaSymbols);

    if (!sanitizedManaSymbols) {
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

    return guilds[sanitizedManaSymbols.toUpperCase()] || '';
}

export function sanitizeManaSymbols(manaSymbols: string): string {
    if (!manaSymbols) {
        return '';
    }

    const sortOrder = ['w', 'u', 'b', 'r', 'g', 'W', 'U', 'B', 'R', 'G'];
    const seen = new Set();

    const sanitizedSymbols = manaSymbols
        .split('')
        .filter((char) => {
            const lowerChar = char.toLowerCase();
            if (sortOrder.includes(char) && !seen.has(lowerChar)) {
                seen.add(lowerChar);
                return true;
            }
            return false;
        })
        .sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b))
        .join('');

    return sanitizedSymbols || '';
}
