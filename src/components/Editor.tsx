import React, { useEffect, useState } from "react";
import { StickerData } from "../types";
import { TextInput } from "./form";

interface EditorProps {
    sticker: StickerData | null;
    onStickerUpdate: (updatedSticker: StickerData) => void;
}

const defaultFormData: Partial<StickerData> = {
    title: '',
    subtitle: '',
    manaSymbols: '',
    format: '',
};

const Editor: React.FC<EditorProps> = ({ sticker, onStickerUpdate }) => {
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (sticker) {
            setFormData(sticker);
        } else {
            setFormData(defaultFormData);
        }
    }, [sticker])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

        const updatedFormData = {
            ...formData,
            [name]: newValue
        };

        setFormData(updatedFormData);
        onStickerUpdate(updatedFormData as StickerData);
    };

    return (
        <div className="flex flex-col gap-4">
            <TextInput
                label="Title"
                name="title"
                onChange={handleChange}
                placeholder="E.g. Goblins'R'Us"
                value={formData.title || ''}
            />

            <TextInput
                label="Subtitle"
                name="subtitle"
                onChange={handleChange}
                placeholder="E.g. Krenko, Bob Ross"
                value={formData.subtitle || ''}
            />

            <TextInput
                helperText="(Top left)"
                label="Format"
                name="format"
                onChange={handleChange}
                placeholder="E.g. Commander"
                value={formData.format || ''}
            />

            <TextInput
                helperText="(Top right)"
                label="Mana Symbols"
                name="manaSymbols"
                onChange={handleChange}
                placeholder="E.g. rgb"
                value={formData.manaSymbols || ''}
            />
        </div>
    );
};

export default Editor;
