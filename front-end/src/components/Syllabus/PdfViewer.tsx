import React, { useState, useEffect, useRef } from 'react';
import { MdDownload } from "react-icons/md";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { saveAs } from 'file-saver';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PdfViewerProps {
    fileName: string;
    file: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({ file, fileName }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [width, setWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.clientWidth;
                setWidth(containerWidth);
            }
        };

        updateWidth();
        window.addEventListener('resize', updateWidth);
        return () => window.removeEventListener('resize', updateWidth);
    }, []);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    const downloadPdf = () => {
        saveAs(file, `${fileName}.pdf`);
    };

    return (
        <div className="flex flex-col items-center h-full w-full mx-auto max-w-full px-4 overflow-hidden">
            {/* Header */}
            <div className="w-full flex items-center gap-3 py-2 bg-gray-200">
                <div className="flex items-center">
                    <h2 className="text-sm md:text-xl font-semibold px-4 py-2 mt-2 text-white bg-primary-light rounded-full">
                        {fileName}
                    </h2>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => setPageNumber(prevPage => Math.max(prevPage - 1, 1))}
                            disabled={pageNumber <= 1}
                            className="px-2 md:px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-l disabled:bg-gray-300"
                        >
                            &lt;
                        </button>
                        <button
                            onClick={() => setPageNumber(prevPage => (numPages ? Math.min(prevPage + 1, numPages) : prevPage))}
                            disabled={pageNumber >= (numPages || 0)}
                            className="px-2 md:px-4 py-2 text-gray-700 bg-gray-300 hover:bg-gray-400 rounded-r disabled:bg-gray-300"
                        >
                            &gt;
                        </button>
                        <span className="text-sm md:text-lg text-gray-700 font-bold">
                            Page {pageNumber} of {numPages}
                        </span>
                    </div>
                    <MdDownload
                        onClick={downloadPdf}
                        className="text-2xl text-gray-700 cursor-pointer"
                    />
                </div>
            </div>

            {/* PDF Viewer */}
            <div ref={containerRef} className="flex-1 w-full overflow-hidden h-full">
                <div className="h-full overflow-y-auto">
                    <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} width={width} />
                    </Document>
                </div>
            </div>
        </div>
    );
};

export default PdfViewer;
