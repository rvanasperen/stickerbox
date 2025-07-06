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
        'grid grid-cols-3 bg-slate-100 print:bg-white',
    );

    return (
        <div className={classes} ref={ref}>
            {[...Array(21)].map((_, index) => (
                <Sticker
                    key={index}
                    sticker={stickers[index]}
                    index={index}
                    isSelected={selectedStickerIndex === index}
                    onClick={onStickerClick}
                    onDragStart={handleDragStart}
                    // onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
});

export default StickerSheet;
