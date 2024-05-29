"use client"
import PdfViewer from '@/components/Syllabus/PdfViewer';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { axioslib } from '@/lib/axioslib';
import { Syllabus as SylInterface } from '@/interface/interface';


const syllabusmock = [
    { subjectID: 'CSS234', pdffile: '/pdftest.pdf' }
];

const Syllabus: React.FC = () => {
    const currentSyllabus = syllabusmock[0];

    const { classID } = useParams();
    const [syllabus, setSyllabus] = useState<SylInterface[]>([]);

    const fetchSyllabus = async () => {
        try {
            const response = await axioslib.get(`/api/admin/getsyllabus/${classID}`);
            setSyllabus(response.data);
            console.log(response.data);
        } catch (error) {
            console.log(error);  
        }
    }

    useEffect(() => {
        fetchSyllabus();
    }, []);

    const file = syllabus[0]?.file_syl;
    const fileName = `Syllabus`;

    return (
        <div className="container mx-auto p-4">
            {/* <PdfViewer file={currentSyllabus.pdffile} fileName={`${currentSyllabus.subjectID} Syllabus`} /> */}
            <PdfViewer file={file} fileName={fileName} />
        </div>
    );
};

export default Syllabus;
