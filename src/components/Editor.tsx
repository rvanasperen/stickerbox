import React, { useEffect, useState } from "react";
import { StickerData as StickerType } from "../types";

interface EditorProps {
    sticker: StickerType | null;
    onStickerUpdate: (updatedSticker: StickerType) => void;
}

const defaultFormData: Partial<StickerType> = {
    title: '',
    subtitle: '',
    manaSymbols: '',
    format: '',
};

const Editor: React.FC<EditorProps> = ({ sticker, onStickerUpdate }) => {
    const [formData, setFormData] = useState(defaultFormData);

    useEffect(() => {
        if (!sticker) {
            setFormData(defaultFormData);
        } else {
            setFormData(sticker);
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
        onStickerUpdate(updatedFormData as StickerType);
    };

    return (
        <div>
            <form>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        placeholder="Title"
                    />
                </div>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="subtitle"
                        value={formData.subtitle || ''}
                        onChange={handleChange}
                        placeholder="Subtitle"
                    />
                </div>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="manaSymbols"
                        value={formData.manaSymbols || ''}
                        onChange={handleChange}
                        placeholder="Mana Symbols"
                    />
                </div>
                <div>
                    <select
                        className="bg-gray-200"
                        name="format"
                        value={formData.format || ''}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        <option value="Commander">Commander</option>
                        <option value="Modern">Modern</option>
                        <option value="Pauper">Pauper</option>
                        <option value="Standard">Standard</option>
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Editor;
