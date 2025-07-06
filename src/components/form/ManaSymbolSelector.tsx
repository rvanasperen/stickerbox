import React from 'react';

interface IManaSymbolSelectorProps {
    label: string;
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    value: string;
    helperText?: string;
}

export function ManaSymbolSelector({ label, name, onChange, value, helperText }: IManaSymbolSelectorProps) {
    const manaSymbols = ['W', 'U', 'B', 'R', 'G', 'C'];

    const handleSymbolClick = (symbol: string) => {
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

    // Toggle a symbol in the value string
    const toggleSymbol = (currentValue: string, symbol: string): string => {
        const lowerSymbol = symbol.toLowerCase();
        const currentLower = currentValue.toLowerCase();

        // Special handling for colorless (C)
        if (lowerSymbol === 'c') {
            // If C is already selected, just remove it
            if (currentLower.includes('c')) {
                return '';
            }
            // If C is being selected, clear all other symbols
            return 'c';
        }

        // If a WUBRG symbol is clicked and C is currently selected, remove C
        if (currentLower.includes('c')) {
            return lowerSymbol;
        }

        // If the symbol is already in the string, remove it
        if (currentLower.includes(lowerSymbol)) {
            return currentLower
                .split('')
                .filter((char) => char.toLowerCase() !== lowerSymbol)
                .join('');
        }

        // Otherwise, add it and sort according to WUBRG order
        const newSymbols = [...currentLower, lowerSymbol];
        const sortOrder = ['w', 'u', 'b', 'r', 'g'];

        return newSymbols.sort((a, b) => sortOrder.indexOf(a) - sortOrder.indexOf(b)).join('');
    };

    // Check if a symbol is selected
    const isSymbolSelected = (symbol: string): boolean => {
        return value.toLowerCase().includes(symbol.toLowerCase());
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
