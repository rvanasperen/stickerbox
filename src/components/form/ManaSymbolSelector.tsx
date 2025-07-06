import React from 'react';
import { MANA_SYMBOLS, MANA_SYMBOL_COLORS, MANA_SYMBOL_SORT_ORDER } from '../../constants';
import { ManaSymbol } from '../../types';

interface IManaSymbolSelectorProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: ManaSymbol[];
    helperText?: string;
}

export const ManaSymbolSelector = React.memo(function ManaSymbolSelector({ label, name, onChange, value, helperText }: IManaSymbolSelectorProps) {
    const manaSymbols: ManaSymbol[] = [...MANA_SYMBOLS];

    const handleSymbolClick = (symbol: ManaSymbol) => {
        // Create a synthetic event to match the onChange interface
        const syntheticEvent = {
            target: {
                name,
                value: toggleSymbol(value, symbol),
                type: 'text',
            },
        } as unknown as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    // Toggle a symbol in the value array
    const toggleSymbol = (currentValue: ManaSymbol[], symbol: ManaSymbol): ManaSymbol[] => {
        // Special handling for colorless (C)
        if (symbol === 'C') {
            // If C is already selected, remove it
            if (currentValue.includes('C')) {
                return [];
            }
            // If C is being selected, clear all other symbols
            return ['C'];
        }

        // If a WUBRG symbol is clicked and C is currently selected, remove C
        if (currentValue.includes('C')) {
            return [symbol];
        }

        // If the symbol is already in the array, remove it
        if (currentValue.includes(symbol)) {
            return currentValue.filter((s) => s !== symbol);
        }

        // Otherwise, add it and sort according to WUBRG order
        const newSymbols = [...currentValue, symbol];

        return newSymbols.sort((a, b) => MANA_SYMBOL_SORT_ORDER.indexOf(a) - MANA_SYMBOL_SORT_ORDER.indexOf(b));
    };

    // Check if a symbol is selected
    const isSymbolSelected = (symbol: ManaSymbol): boolean => {
        return value.includes(symbol);
    };

    // Get color class based on mana symbol
    const getSymbolColorClass = (symbol: ManaSymbol): string => {
        return MANA_SYMBOL_COLORS[symbol];
    };

    const getSymbolTitle = (symbol: ManaSymbol): string => {
        switch (symbol) {
            case 'W':
                return 'White';
            case 'U':
                return 'Blue';
            case 'B':
                return 'Black';
            case 'R':
                return 'Red';
            case 'G':
                return 'Green';
            default:
                return 'Colorless';
        }
    };

    return (
        <div className="mb-4">
            <label className="mb-1 block text-sm font-bold text-blue-700 uppercase">{label}</label>

            <div className="mt-2 flex flex-wrap gap-3">
                {manaSymbols.map((symbol) => (
                    <button
                        key={symbol}
                        type="button"
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm transition-all hover:shadow-md ${
                            isSymbolSelected(symbol) ? `ring-2 ring-blue-700 ${getSymbolColorClass(symbol)}` : getSymbolColorClass(symbol)
                        }`}
                        onClick={() => handleSymbolClick(symbol)}
                        title={getSymbolTitle(symbol)}
                    >
                        <img
                            src={`${import.meta.env.BASE_URL}images/symbols/${symbol}.svg`}
                            alt={symbol}
                            className={`h-8 w-8 drop-shadow-sm ${isSymbolSelected(symbol) ? '' : 'opacity-10'}`}
                        />
                    </button>
                ))}
            </div>

            {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
        </div>
    );
});
