"use client"
import PdfViewer from '@/components/Syllabus/PdfViewer';
import React from 'react';


const syllabus = [
    { subjectID: 'CSS234', pdffile: '/pdftest.pdf' }
];

const Syllabus: React.FC = () => {
    const currentSyllabus = syllabus[0];

    return (
        <div className="container mx-auto p-4">
            <PdfViewer file={currentSyllabus.pdffile} fileName={`${currentSyllabus.subjectID} Syllabus`} />
        </div>
    );
};

export default Syllabus;
