import { useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import Editor from './components/Editor';
import StickerSheet from './components/StickerSheet';
import { manaSymbolsToString, stringToManaSymbols } from './functions';
import { StickerData } from './types';

export default function App() {
    const [stickers, setStickers] = useState<(StickerData | null)[]>(() => {
        const storedStickers = localStorage.getItem('stickers');
        if (!storedStickers) return [];

        // Parse stickers and convert manaSymbols from string to array
        const parsedStickers = JSON.parse(storedStickers) as Array<
            Omit<StickerData, 'manaSymbols'> & {
                manaSymbols: string;
            }
        >;
        return parsedStickers.map((sticker) => {
            if (!sticker) return null;
            return {
                ...sticker,
                manaSymbols: stringToManaSymbols(sticker.manaSymbols),
            };
        });
    });
    const [selectedStickerIndex, setSelectedStickerIndex] = useState<number>(0);

    useEffect(() => {
        // Convert manaSymbols from array to string for storage
        const stickersForStorage = stickers.map((sticker) => {
            if (!sticker) return null;
            return {
                ...sticker,
                manaSymbols: manaSymbolsToString(sticker.manaSymbols),
            };
        });
        localStorage.setItem('stickers', JSON.stringify(stickersForStorage));
    }, [stickers]);

    const handleStickerClick = (index: number) => {
        setSelectedStickerIndex(index);
    };

    const handleStickerDragDrop = (dragIndex: number, dropIndex: number) => {
        const newStickers = [...stickers];

        // Create default empty stickers if they don't exist
        if (!newStickers[dragIndex]) {
            newStickers[dragIndex] = {
                title: '',
                subtitle: '',
                manaSymbols: [],
                format: '',
                bracket: undefined,
            };
        }

        if (!newStickers[dropIndex]) {
            newStickers[dropIndex] = {
                title: '',
                subtitle: '',
                manaSymbols: [],
                format: '',
                bracket: undefined,
            };
        }

        // Swap the stickers
        [newStickers[dragIndex], newStickers[dropIndex]] = [newStickers[dropIndex], newStickers[dragIndex]];

        setStickers(newStickers);
        setSelectedStickerIndex(dropIndex);
    };

    const handleStickerUpdate = (newSticker: StickerData) => {
        const newStickers = [...stickers];

        // Ensure the array has enough elements
        while (newStickers.length <= selectedStickerIndex) {
            newStickers.push({
                title: '',
                subtitle: '',
                manaSymbols: [],
                format: '',
                bracket: undefined,
            });
        }

        newStickers[selectedStickerIndex] = newSticker;
        setStickers(newStickers);
    };

    const stickerSheetRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => stickerSheetRef.current,
        pageStyle: `
            @page {
                size: A4;
                margin: 0;
            }
            html, body {
                margin: 0;
                padding: 0;
                height: 297mm;
                overflow: hidden;
            }
        `,
        removeAfterPrint: true,
    });

    return (
        <div className="animate-fade-in container mx-auto max-w-7xl">
            <header className="mb-8 border-b border-blue-700 pb-4">
                <h1 className="font-beleren text-4xl font-bold text-blue-700">Stickerbox</h1>
                <p className="mt-2 text-gray-500">A Magic: the Gathering deckbox sticker designer tool.</p>
                <p className="mt-2 text-gray-500">
                    Supported sticker sheet format: <span className="font-semibold">HERMA 8632</span>
                </p>
                <p className="mt-2 text-gray-500">Click on a sticker to edit it. Drag and drop stickers to rearrange them.</p>
            </header>

            <main className="flex flex-col gap-8 md:flex-row">
                <div className="animate-slide-in overflow-x-auto md:w-2/3">
                    <div className="mx-auto mb-4 rounded-lg border border-gray-100 bg-white p-4 shadow-md">
                        <StickerSheet
                            ref={stickerSheetRef}
                            stickers={stickers}
                            selectedStickerIndex={selectedStickerIndex}
                            onStickerClick={handleStickerClick}
                            onStickerDragDrop={handleStickerDragDrop}
                        />
                    </div>
                </div>

                <div className="animate-slide-in md:w-1/3" style={{ animationDelay: '0.1s' }}>
                    <div className="sticky top-4">
                        <div className="mb-4 rounded-lg border border-gray-100 bg-white p-6 shadow-md">
                            <h2 className="font-beleren mb-4 text-2xl text-blue-700">Editor</h2>
                            <Editor sticker={stickers[selectedStickerIndex] || null} onStickerUpdate={handleStickerUpdate} />
                        </div>

                        <button
                            className="w-full rounded-lg bg-blue-700 px-6 py-3 font-bold text-white shadow-md transition-all hover:bg-blue-800 hover:shadow-lg focus:ring-2 focus:ring-blue-700 focus:outline-none"
                            onClick={handlePrint}
                        >
                            Print Stickers
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
