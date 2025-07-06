import React from 'react';
import { ManaSymbol } from '../../types';

interface IManaSymbolSelectorProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: ManaSymbol[];
    helperText?: string;
}

export function ManaSymbolSelector({ label, name, onChange, value, helperText }: IManaSymbolSelectorProps) {
    const manaSymbols: ManaSymbol[] = ['W', 'U', 'B', 'R', 'G', 'C'];

    const handleSymbolClick = (symbol: ManaSymbol) => {
        // Create a synthetic event to match the onChange interface
        const syntheticEvent = {
            target: {
                name,
                value: toggleSymbol(value, symbol),
                type: 'text',
            },
        } as React.ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
    };

    // Toggle a symbol in the value array
    const toggleSymbol = (currentValue: ManaSymbol[], symbol: ManaSymbol): ManaSymbol[] => {
        // Special handling for colorless (C)
        if (symbol === 'C') {
            // If C is already selected, just remove it
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
        const sortOrder: ManaSymbol[] = ['W', 'U', 'B', 'R', 'G'];

        return newSymbols.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b));
    };

    // Check if a symbol is selected
    const isSymbolSelected = (symbol: ManaSymbol): boolean => {
        return value.includes(symbol);
    };

    // Get color class based on mana symbol
    const getSymbolColorClass = (symbol: ManaSymbol): string => {
        const colorMap: Record<ManaSymbol, string> = {
            W: 'bg-amber-50 border-amber-200 hover:bg-amber-100',
            U: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
            B: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
            R: 'bg-red-50 border-red-200 hover:bg-red-100',
            G: 'bg-green-50 border-green-200 hover:bg-green-100',
            C: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
        };
        return colorMap[symbol];
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
            <label className="text-primary-dark mb-1 block text-sm font-bold uppercase">{label}</label>

            <div className="mt-2 flex flex-wrap gap-3">
                {manaSymbols.map((symbol) => (
                    <button
                        key={symbol}
                        type="button"
                        className={`flex h-12 w-12 items-center justify-center rounded-full border-2 shadow-sm transition-all hover:shadow-md ${
                            isSymbolSelected(symbol) ? `ring-primary-light ring-2 ${getSymbolColorClass(symbol)}` : getSymbolColorClass(symbol)
                        }`}
                        onClick={() => handleSymbolClick(symbol)}
                        title={getSymbolTitle(symbol)}
                    >
                        <img src={`/src/assets/images/symbols/${symbol.toLowerCase()}.svg`} alt={symbol} className="h-8 w-8 drop-shadow-sm" />
                    </button>
                ))}
            </div>

            {helperText && <p className="text-text-light mt-1 text-xs">{helperText}</p>}
        </div>
    );
}
