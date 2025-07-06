import React, { useEffect, useRef, useState } from "react";
import Editor from "./components/Editor";
import StickerSheet from "./components/StickerSheet";
import { StickerData } from "./types";
import { useReactToPrint } from "react-to-print";

const App: React.FC = () => {
    const [stickers, setStickers] = useState<StickerData[]>(() => {
        const storedStickers = localStorage.getItem('stickers');
        return storedStickers ? JSON.parse(storedStickers) : [];
    });
    const [selectedStickerIndex, setSelectedStickerIndex] = useState(0);

    useEffect(() => {
        localStorage.setItem('stickers', JSON.stringify(stickers));
    }, [stickers]);

    const handleStickerClick = (index: number) => {
        setSelectedStickerIndex(index);
    }

    const handleStickerDragDrop = (dragIndex: number, dropIndex: number) => {
        const newStickers = [...stickers];
        [newStickers[dragIndex], newStickers[dropIndex]] = [newStickers[dropIndex], newStickers[dragIndex]];
        setStickers(newStickers);
        setSelectedStickerIndex(dropIndex);
    };

    const handleStickerUpdate = (newSticker: StickerData) => {
        const newStickers = [...stickers];
        newStickers[selectedStickerIndex] = newSticker;
        setStickers(newStickers);
    };

    const stickerSheetRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => stickerSheetRef.current,
    })

    return (
        <>
            <h1 className="text-2xl font-bold mb-4 font-beleren">Stickerbox</h1>
            <p className="mb-4 text-gray-500">
                Supported sticker sheet format: HERMA 8632
            </p>

            <div className="flex gap-4">
                <StickerSheet
                    ref={stickerSheetRef}
                    stickers={stickers}
                    selectedStickerIndex={selectedStickerIndex}
                    onStickerClick={handleStickerClick}
                    onStickerDragDrop={handleStickerDragDrop}
                />

                <div>
                    <Editor
                        sticker={stickers[selectedStickerIndex]}
                        onStickerUpdate={handleStickerUpdate}
                    />

                    <button className="mt-4 bg-green-300 px-4 py-2 rounded shadow" onClick={handlePrint}>
                        Print!
                    </button>
                </div>
            </div>
        </>
    );
};

export default App;
