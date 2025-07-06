import classNames from 'classnames';
import React, { ForwardedRef } from 'react';
import { StickerData } from '../types.ts';
import Sticker from './Sticker.tsx';

interface IStickerSheetProps {
    stickers: StickerData[];
    selectedStickerIndex: number;
    onStickerClick: (index: number) => void;
    onStickerDragDrop: (dragIndex: number, dropIndex: number) => void;
}

const StickerSheet = React.forwardRef(function StickerSheet(
    { stickers, selectedStickerIndex, onStickerClick, onStickerDragDrop }: IStickerSheetProps,
    ref: ForwardedRef<HTMLDivElement>,
) {
    const handleDragStart = (e: React.DragEvent, index: number) => {
        e.dataTransfer.setData('dragIndex', String(index));
    };

    const handleDrop = (e: React.DragEvent, dropIndex: number) => {
        const dragIndex = parseInt(e.dataTransfer.getData('dragIndex'), 10);
        onStickerDragDrop(dragIndex, dropIndex);
    };

    const paperTemplate = 'HERMA 8632';

    const classes = classNames(
        // Template configuration
        { 'px-[7.21mm] py-[15.15mm] gap-x-[2.54mm] gap-y-0': paperTemplate === 'HERMA 8632' },

        // A4 paper size
        'w-[210mm] min-w-[210mm] h-[297mm] min-h-[297mm]',

        // General styling
        'grid grid-cols-3 bg-background print:bg-white shadow-lg rounded-sm overflow-hidden',
    );

    return (
        <div className="relative">
            <div className="absolute -top-6 right-0 left-0 flex justify-center">
                <div className="bg-primary-light rounded-t-md px-3 py-1 text-xs font-medium text-white shadow-sm">A4 Sticker Sheet</div>
            </div>

            <div className={classes} ref={ref}>
                {[...Array(21)].map((_, index) => (
                    <Sticker
                        key={index}
                        sticker={stickers[index]}
                        index={index}
                        isSelected={selectedStickerIndex === index}
                        onClick={onStickerClick}
                        onDragStart={handleDragStart}
                        onDrop={handleDrop}
                    />
                ))}
            </div>

            <div className="absolute right-0 -bottom-6 left-0 flex justify-center">
                <div className="text-text-light text-xs">{paperTemplate} • 210mm × 297mm</div>
            </div>
        </div>
    );
});

export default StickerSheet;
