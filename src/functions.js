export function getBackgroundImageUrl(manaSymbols) {
    if (!manaSymbols) {
        return null;
    }

    if (manaSymbols.length === 1) {
        return `/src/assets/images/symbols/${manaSymbols}.svg`;
    }

    const guild = getGuildName(manaSymbols);

    if (manaSymbols.length === 2) {
        return `/src/assets/images/guilds/${guild.toLowerCase()}.png`;
    }

    if (manaSymbols.length === 3) {
        return `/src/assets/images/guilds/${guild.toLowerCase()}.jpg`
    }

    // todo: 4+5 color symbols

    return null;
}

export function getGuildName(manaSymbols) {
    if (!manaSymbols) {
        return null;
    }

    const guilds = {
        C: 'Colorless',
        W: 'Mono',
        U: 'Mono',
        B: 'Mono',
        R: 'Mono',
        G: 'Mono',
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

    return guilds[manaSymbols];
}

// todo: use external lib
export function getSetName(setCode) {
    const sets = {
        AVR: 'Avacyn Restored',
        C13: 'Commander 2013',
        GTC: 'Gatecrash',
        LTR: 'Tales of Middle Earth',
        NPH: 'New Phyrexia',
    };

    return sets[setCode];
}
