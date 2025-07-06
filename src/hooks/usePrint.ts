import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

/**
 * Custom hook to handle printing functionality
 */
export function usePrint() {
    const printRef = useRef(null);

    const handlePrint = useReactToPrint({
        content: () => printRef.current,
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

    return {
        printRef,
        handlePrint,
    };
}
