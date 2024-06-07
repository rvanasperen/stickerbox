import classNames from "classnames";
import PropTypes from "prop-types";
import Sticker from "./Sticker.jsx";

const StickerSheet = ({ stickers, selectedStickerIndex, onStickerClick, onStickerDragDrop }) => {
    const handleDragStart = (e, index) => {
        e.dataTransfer.setData('dragIndex', index);
    }

    const handleDrop = (e, dropIndex) => {
        const dragIndex = parseInt(e.dataTransfer.getData('dragIndex'), 10);
        onStickerDragDrop(dragIndex, dropIndex);
    };

    const paperTemplate = 'HERMA 8632';

    const classes = classNames(
        // Template configuration
        {'px-[7.21mm] py-[15.15mm] gap-x-[2.54mm] gap-y-0': (paperTemplate === 'HERMA 8632')},

        // A4 paper size
        'w-[210mm] min-w-[210mm] h-[297mm] min-h-[297mm]',

        // General styling
        'grid grid-cols-3 bg-slate-100 print:bg-white',
    );

    return (
        <div className={classes}>
            {[...Array(21)].map((_, index) => (
                <Sticker
                    key={index}
                    sticker={stickers[index]}
                    index={index}
                    isSelected={selectedStickerIndex === index}
                    onClick={onStickerClick}
                    onDragStart={handleDragStart}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                />
            ))}
        </div>
    );
}

StickerSheet.propTypes = {
    stickers: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            playstyle: PropTypes.string.isRequired,
            manaSymbols: PropTypes.string.isRequired,
            format: PropTypes.string.isRequired,
            isPrecon: PropTypes.bool.isRequired,
            set: PropTypes.string.isRequired,
        })
    ).isRequired,
    selectedStickerIndex: PropTypes.number.isRequired,
    onStickerClick: PropTypes.func.isRequired,
    onStickerDragDrop: PropTypes.func.isRequired,
};

export default StickerSheet;
