import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import StickerSheet from './components/StickerSheet';
import { StickerData } from './types';

export default function App() {
    const [stickers, setStickers] = useState<StickerData[]>(() => {
        const storedStickers = localStorage.getItem('stickers');
        return storedStickers ? JSON.parse(storedStickers) : [];
    });
    const [selectedStickerIndex, setSelectedStickerIndex] = useState<number>(0);

    useEffect(() => {
        localStorage.setItem('stickers', JSON.stringify(stickers));
    }, [stickers]);

    const handleStickerClick = (index: number) => {
        setSelectedStickerIndex(index);
    };

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
    });

    return (
        <>
            <h1 className="font-beleren mb-4 text-2xl font-bold">Stickerbox</h1>
            <p className="mb-4 text-gray-500">Supported sticker sheet format: HERMA 8632</p>

            <div className="flex gap-4">
                <StickerSheet
                    ref={stickerSheetRef}
                    stickers={stickers}
                    selectedStickerIndex={selectedStickerIndex}
                    onStickerClick={handleStickerClick}
                    onStickerDragDrop={handleStickerDragDrop}
                />

                <div>
                    <Editor sticker={stickers[selectedStickerIndex]} onStickerUpdate={handleStickerUpdate} />

                    <button className="mt-4 rounded-sm bg-green-300 px-4 py-2 shadow-sm" onClick={handlePrint}>
                        Print!
                    </button>
                </div>
            </div>
        </>
    );
}
