import classNames from 'classnames';
import 'keyrune/css/keyrune.css';
import React, { useEffect, useState } from 'react';
import { getBackgroundImageUrl, getGuildName, sanitizeManaSymbols } from '../functions';
import { StickerData } from '../types';

interface IStickerProps {
    sticker: StickerData | null;
    index: number;
    isSelected: boolean;
    onClick: (stickerIndex: number) => void;
    onDragStart: (event: React.DragEvent, stickerIndex: number) => void;
    onDrop: (event: React.DragEvent, stickerIndex: number) => void;
}

export default function Sticker({ sticker, index, isSelected, onClick, onDragStart, onDrop }: IStickerProps) {
    const [guild, setGuild] = useState('');
    const [backgroundImageUrl, setBackgroundImageUrl] = useState('');

    useEffect(() => {
        if (!sticker) {
            return;
        }

        setGuild(getGuildName(sticker.manaSymbols));
        setBackgroundImageUrl(getBackgroundImageUrl(sticker.manaSymbols) || '');
    }, [sticker]);

    return (
        <div
            className={classNames(
                'relative flex h-[38.1mm] w-[63.5mm] cursor-pointer flex-col rounded-md border bg-white p-1 hover:bg-gray-200 print:border-0',
                { 'border-blue-500': isSelected },
            )}
            onClick={() => onClick(index)}
            draggable="true"
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => onDrop(e, index)}
        >
            {backgroundImageUrl && (
                <img
                    src={backgroundImageUrl}
                    alt=""
                    className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-10 print:opacity-20"
                />
            )}

            <div className="flex h-8 justify-between">
                <div className="flex flex-col">{sticker?.format && <div className="text-center text-xs text-gray-500">{sticker.format}</div>}</div>

                <div className="flex flex-col">
                    <div className="flex justify-end gap-1">
                        {sticker?.manaSymbols &&
                            sanitizeManaSymbols(sticker?.manaSymbols)
                                .split('')
                                .map((symbol, index) => (
                                    <img key={index} src={`/src/assets/images/symbols/${symbol}.svg`} alt="" className="h-6 w-6" />
                                ))}
                    </div>
                    <div className="text-right text-xs text-gray-500">{guild}</div>
                </div>
            </div>
            <div className="font-beleren flex grow flex-col items-center justify-center text-center text-2xl">
                {sticker?.title}
                {sticker?.subtitle && <div className="text-sm text-gray-500">{sticker.subtitle}</div>}
            </div>
            <div className="flex h-6 items-end justify-between text-right text-sm text-gray-500">{/* reserved space */}</div>
        </div>
    );
}
