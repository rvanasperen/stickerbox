import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import StickerSheet from './components/StickerSheet';
import { manaSymbolsToString, stringToManaSymbols } from './functions';
import { StickerData } from './types';

export default function App() {
    const [stickers, setStickers] = useState<StickerData[]>(() => {
        const storedStickers = localStorage.getItem('stickers');
        if (!storedStickers) return [];

        // Parse stickers and convert manaSymbols from string to array
        const parsedStickers = JSON.parse(storedStickers) as Array<
            Omit<StickerData, 'manaSymbols'> & {
                manaSymbols: string;
            }
        >;
        return parsedStickers.map((sticker) => ({
            ...sticker,
            manaSymbols: stringToManaSymbols(sticker.manaSymbols),
        }));
    });
    const [selectedStickerIndex, setSelectedStickerIndex] = useState<number>(0);

    useEffect(() => {
        // Convert manaSymbols from array to string for storage
        const stickersForStorage = stickers.map((sticker) => ({
            ...sticker,
            manaSymbols: manaSymbolsToString(sticker.manaSymbols),
        }));
        localStorage.setItem('stickers', JSON.stringify(stickersForStorage));
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
