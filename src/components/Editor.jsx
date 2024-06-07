import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Editor = ({ sticker, onStickerUpdate }) => {
    const [formData, setFormData] = useState({
        name: '',
        playstyle: '',
        manaSymbols: '',
        format: '',
        isPrecon: false,
        set: '',
    });

    useEffect(() => {
        if (sticker) {
            setFormData(sticker);
        } else {
            setFormData({
                name: '',
                playstyle: '',
                manaSymbols: '',
                format: '',
                isPrecon: false,
                set: '',
            });
        }
    }, [sticker])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const updatedFormData = {
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        };
        setFormData(updatedFormData);
        onStickerUpdate(updatedFormData);
    };

    return (
        <div>
            <form>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                </div>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="playstyle"
                        value={formData.playstyle}
                        onChange={handleChange}
                        placeholder="Playstyle"
                    />
                </div>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="manaSymbols"
                        value={formData.manaSymbols}
                        onChange={handleChange}
                        placeholder="Mana Symbols"
                    />
                </div>
                <div>
                    <select
                        className="bg-gray-200"
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                    >
                        <option value=""></option>
                        <option value="Commander">Commander</option>
                        <option value="Modern">Modern</option>
                        <option value="Pauper">Pauper</option>
                        <option value="Standard">Standard</option>
                    </select>
                </div>
                <div>
                    <input type="checkbox" name="isPrecon" checked={formData.isPrecon} onChange={handleChange} />
                    Precon?
                </div>
                <div>
                    <input
                        className="bg-gray-200"
                        type="text"
                        name="set"
                        value={formData.set}
                        onChange={handleChange}
                        placeholder="Set Code"
                    />
                </div>
            </form>
        </div>
    );
};

Editor.propTypes = {
    sticker: PropTypes.shape({
        name: PropTypes.string.isRequired,
        playstyle: PropTypes.string.isRequired,
        manaSymbols: PropTypes.string.isRequired,
        format: PropTypes.string.isRequired,
        isPrecon: PropTypes.bool.isRequired,
        set: PropTypes.string.isRequired,
    }),
    onStickerUpdate: PropTypes.func.isRequired,
};

export default Editor;
