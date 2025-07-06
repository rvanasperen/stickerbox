import { useEffect, useState } from 'react';
import { DEFAULT_STICKER } from '../constants';
import { manaSymbolsToString, stringToManaSymbols } from '../functions';
import { StickerData } from '../types';

/**
 * Custom hook to manage stickers state and localStorage persistence
 */
export function useStickers() {
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
            newStickers[dragIndex] = { ...DEFAULT_STICKER };
        }

        if (!newStickers[dropIndex]) {
            newStickers[dropIndex] = { ...DEFAULT_STICKER };
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
            newStickers.push({ ...DEFAULT_STICKER });
        }

        newStickers[selectedStickerIndex] = newSticker;
        setStickers(newStickers);
    };

    return {
        stickers,
        selectedStickerIndex,
        handleStickerClick,
        handleStickerDragDrop,
        handleStickerUpdate,
    };
}
