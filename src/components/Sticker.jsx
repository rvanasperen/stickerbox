import classNames from "classnames";
import PropTypes from "prop-types";
import { getBackgroundImageUrl, getGuildName, getSetName } from "../functions";
import 'keyrune/css/keyrune.css';

const Sticker = ({ sticker, index, isSelected, onClick, onDragStart, onDragOver, onDrop }) => {
    const guild = getGuildName(sticker?.manaSymbols);
    const backgroundImageUrl = getBackgroundImageUrl(sticker?.manaSymbols);

    const classes = classNames(
        "relative flex flex-col w-[63.5mm] h-[38.1mm] p-1 bg-white border print:border-0 rounded-md cursor-pointer hover:bg-gray-200",
        { "border-blue-500": isSelected },
    );

    return (
        <div
            className={classes}
            onClick={() => onClick(index)}
            draggable
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
                        <>
                            {sticker.format === "Commander" && (
                                <img
                                    src="/src/assets/images/symbols/Commander.svg"
                                    alt=""
                                    className="w-8 h-8"
                                />
                            )}

                            <div className="text-center text-xs text-gray-500">
                                {sticker.format}
                            </div>
                        </>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="flex gap-1 justify-end">
                        {sticker?.manaSymbols && sticker.manaSymbols.split('').map((symbol, index) => (
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
                {sticker?.name}
                {sticker?.playstyle && (
                    <div className="text-sm text-gray-500">
                        {sticker.playstyle}
                    </div>
                )}
            </div>
            <div className="h-6 flex items-end justify-between text-gray-500 text-sm text-right">
                <div>
                    {sticker?.isPrecon && "Precon"}
                </div>

                {sticker?.set && (
                    <div className="flex items-center gap-1">
                        {getSetName(sticker.set.toUpperCase())}
                        <i className={`ss ss-${sticker.set.toLowerCase()}`}></i>
                    </div>
                )}
            </div>
        </div>
    );
}

Sticker.propTypes = {
    sticker: PropTypes.shape({
        name: PropTypes.string.isRequired,
        playstyle: PropTypes.string.isRequired,
        manaSymbols: PropTypes.string.isRequired,
        format: PropTypes.string.isRequired,
        isPrecon: PropTypes.bool.isRequired,
        set: PropTypes.string.isRequired,
    }),
    index: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired,
};

export default Sticker;
