import React, { useEffect, useState } from 'react';
import { ManaSymbol, StickerData } from '../types';
import { ManaSymbolSelector, TextInput } from './form';

const defaultFormData: Partial<StickerData> = {
    title: '',
    subtitle: '',
    manaSymbols: [] as ManaSymbol[],
    format: '',
    bracket: undefined,
};

interface IEditorProps {
    sticker: StickerData | null;
    onStickerUpdate: (updatedSticker: StickerData) => void;
}

export default function Editor({ sticker, onStickerUpdate }: IEditorProps) {
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (sticker) {
            setFormData(sticker);
        } else {
            setFormData(defaultFormData);
        }
    }, [sticker]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        let newValue: string | boolean | undefined = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        // Special handling for the bracket field
        if (name === 'bracket' && value !== '') {
            const bracketValue = parseInt(value as string, 10);
            if (isNaN(bracketValue) || bracketValue < 1 || bracketValue > 5) {
                // Invalid bracket value, don't update
                return;
            }
            newValue = String(bracketValue);
        } else if (name === 'bracket' && value === '') {
            // Empty bracket value, set to undefined
            newValue = undefined;
        }

        const updatedFormData = {
            ...formData,
            [name]: newValue,
        };

        setFormData(updatedFormData);
        onStickerUpdate(updatedFormData as StickerData);
    };

    return (
        <div className="flex flex-col gap-4">
            <TextInput label="Title" name="title" onChange={handleChange} placeholder="E.g. Goblins'R'Us" value={formData.title || ''} />

            <TextInput label="Subtitle" name="subtitle" onChange={handleChange} placeholder="E.g. Krenko, Bob Ross" value={formData.subtitle || ''} />

            <TextInput
                helperText="(Top left)"
                label="Format"
                name="format"
                onChange={handleChange}
                placeholder="E.g. Commander"
                value={formData.format || ''}
            />

            <TextInput
                helperText="(Bottom left, values 1-5)"
                label="Bracket"
                name="bracket"
                onChange={handleChange}
                placeholder="Enter a value from 1 to 5"
                value={formData.bracket?.toString() || ''}
                type="number"
                min={1}
                max={5}
            />

            <ManaSymbolSelector
                helperText="(Top right)"
                label="Mana Symbols"
                name="manaSymbols"
                onChange={handleChange}
                value={formData.manaSymbols || []}
            />
        </div>
    );
}
