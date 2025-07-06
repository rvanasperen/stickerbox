import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { getBackgroundImageUrl, getGuildName, sanitizeManaSymbols } from "../functions";
import { StickerData } from "../types";
import 'keyrune/css/keyrune.css';
 // todo: move to index.css or main.tsx?

interface IStickerProps {
    sticker: StickerData | null;
    index: number;
    isSelected: boolean;
    onClick: (stickerIndex: number) => void;
    onDragStart: (event: React.DragEvent, stickerIndex: number) => void;
    onDrop: (event: React.DragEvent, stickerIndex: number) => void;
}

const Sticker: React.FC<IStickerProps> = ({ sticker, index, isSelected, onClick, onDragStart, onDrop }: IStickerProps) => {
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
                "relative flex flex-col w-[63.5mm] h-[38.1mm] p-1 bg-white border print:border-0 rounded-md cursor-pointer hover:bg-gray-200",
                { "border-blue-500": isSelected },
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
                    className="absolute opacity-10 print:opacity-20 w-28 h-28 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                />
            )}

            <div className="h-8 flex justify-between">
                <div className="flex flex-col">
                    {sticker?.format && (
                        <div className="text-center text-xs text-gray-500">
                            {sticker.format}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-1 justify-end">
                        {sticker?.manaSymbols && sanitizeManaSymbols(sticker?.manaSymbols).split('').map((symbol, index) => (
                            <img
                                key={index}
                                src={`/src/assets/images/symbols/${symbol}.svg`}
                                alt=""
                                className="w-6 h-6"
                            />
                        ))}
                    </div>
                    <div className="text-right text-xs text-gray-500">
                        {guild}
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-grow items-center justify-center text-center font-beleren text-2xl">
                {sticker?.title}
                {sticker?.subtitle && (
                    <div className="text-sm text-gray-500">
                        {sticker.subtitle}
                    </div>
                )}
            </div>
            <div className="h-6 flex items-end justify-between text-gray-500 text-sm text-right">
                {/* reserved space */}
            </div>
        </div>
    );
}

export default Sticker;
