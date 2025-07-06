import classNames from 'classnames';
import 'keyrune/css/keyrune.css';
import React, { ForwardedRef, useEffect, useState } from 'react';
import { getBackgroundImageUrl, getGuildName } from '../functions';
import { ManaSymbol, StickerData } from '../types';

interface IStickerProps {
    sticker: StickerData | null;
    index: number;
    isSelected: boolean;
    isDragOver?: boolean;
    onClick: (stickerIndex: number) => void;
    onDragStart: (event: React.DragEvent, stickerIndex: number) => void;
    onDragOver: (event: React.DragEvent) => void;
    onDragLeave: (event: React.DragEvent) => void;
    onDrop: (event: React.DragEvent, stickerIndex: number) => void;
}

const Sticker = React.forwardRef(function Sticker(
    { sticker, index, isSelected, isDragOver, onClick, onDragStart, onDragOver, onDragLeave, onDrop }: IStickerProps,
    ref: ForwardedRef<HTMLDivElement>,
) {
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
            ref={ref}
            className={classNames(
                'relative flex h-[38.1mm] w-[63.5mm] cursor-pointer flex-col rounded-lg border bg-white p-2 shadow-sm transition-all hover:shadow-md print:border-0 print:shadow-none print:ring-0',
                isSelected ? 'z-10 border-blue-700 ring-2 ring-blue-700' : 'border-gray-200 hover:border-blue-600',
                isDragOver ? 'z-10 border-blue-700 bg-blue-100 ring-2 ring-blue-700' : '',
            )}
            onClick={() => onClick(index)}
            draggable="true"
            onDragStart={(e) => onDragStart(e, index)}
            onDragOver={(e) => {
                e.preventDefault();
                onDragOver(e);
            }}
            onDragLeave={(e) => onDragLeave(e)}
            onDrop={(e) => onDrop(e, index)}
        >
            {backgroundImageUrl && (
                <img
                    src={backgroundImageUrl}
                    alt=""
                    className="absolute top-1/2 left-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 opacity-15 transition-opacity print:opacity-25"
                />
            )}

            <div className="flex h-8 justify-between">
                <div className="flex flex-col">
                    {sticker?.format && <div className="rounded-sm bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">{sticker.format}</div>}
                </div>

                <div className="flex flex-col">
                    <div className="flex justify-end gap-1">
                        {sticker?.manaSymbols &&
                            sticker.manaSymbols.map((symbol: ManaSymbol, index) => (
                                <img
                                    key={index}
                                    src={`/src/assets/images/symbols/${symbol.toLowerCase()}.svg`}
                                    alt={symbol}
                                    className="h-5 w-5 drop-shadow-sm print:drop-shadow-none"
                                />
                            ))}
                    </div>
                    <div className="text-right text-xs font-medium text-gray-500">{guild}</div>
                </div>
            </div>

            <div className="font-beleren flex grow flex-col items-center justify-center text-center text-2xl text-gray-700">
                {sticker?.title}
                {sticker?.subtitle && <div className="mt-1 text-sm font-normal text-gray-500">{sticker.subtitle}</div>}
            </div>

            <div className="flex h-6 items-end justify-between text-right text-xs text-gray-500">
                {sticker?.bracket && (
                    <div className="rounded-sm bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">Bracket {sticker.bracket}</div>
                )}
                {/* reserved space for future sticker input extensions */}
            </div>
        </div>
    );
});

export default Sticker;
