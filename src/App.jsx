import { useEffect, useState } from "react";
import Editor from "./components/Editor.jsx";
import StickerSheet from "./components/StickerSheet.jsx";

const App = () => {
    const [stickers, setStickers] = useState(() => {
        const storedStickers = JSON.parse(localStorage.getItem('stickers'));
        return storedStickers ? storedStickers : [];
    });
    const [selectedStickerIndex, setSelectedStickerIndex] = useState(0);

    useEffect(() => {
        localStorage.setItem('stickers', JSON.stringify(stickers));
    }, [stickers]);

    const handleStickerClick = (index) => {
        setSelectedStickerIndex(index);
    }

    const handleStickerDragDrop = (dragIndex, dropIndex) => {
        const newStickers = [...stickers];
        [newStickers[dragIndex], newStickers[dropIndex]] = [newStickers[dropIndex], newStickers[dragIndex]];
        setStickers(newStickers);
        setSelectedStickerIndex(dropIndex);
    };

    const handleStickerUpdate = (newSticker) => {
        const newStickers = [...stickers];
        newStickers[selectedStickerIndex] = newSticker;
        setStickers(newStickers);
    };

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 font-beleren">Stickerbox</h1>

            <div className="flex gap-4">
                <StickerSheet
                    stickers={stickers}
                    selectedStickerIndex={selectedStickerIndex}
                    onStickerClick={handleStickerClick}
                    onStickerDragDrop={handleStickerDragDrop}
                />

                <Editor
                    sticker={stickers[selectedStickerIndex]}
                    onStickerUpdate={handleStickerUpdate}
                />
            </div>
        </>
    );
};

export default App;
