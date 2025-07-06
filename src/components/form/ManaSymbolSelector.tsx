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

    return (
        <div>
            <div className="text-sm font-bold text-gray-700 uppercase">{label}</div>

            <div className="mt-2 flex gap-2">
                {manaSymbols.map((symbol) => (
                    <button
                        key={symbol}
                        type="button"
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                            isSymbolSelected(symbol) ? 'border-2 border-blue-500 bg-gray-200' : 'border border-gray-300 bg-gray-100'
                        }`}
                        onClick={() => handleSymbolClick(symbol)}
                    >
                        <img src={`/src/assets/images/symbols/${symbol.toLowerCase()}.svg`} alt={symbol} className="h-6 w-6" />
                    </button>
                ))}
            </div>

            {helperText && <p className="mt-1 text-xs text-gray-500">{helperText}</p>}
        </div>
    );
}
