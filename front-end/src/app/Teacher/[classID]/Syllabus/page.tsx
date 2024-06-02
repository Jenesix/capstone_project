"use client"
import PdfViewer from '@/components/Syllabus/PdfViewer';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import { axioslib } from '@/lib/axioslib';
import { Syllabus as SylInterface } from '@/interface/interface';

const TeacherSyllabus: React.FC = () => {
    const { classID } = useParams();
    const [syllabus, setSyllabus] = useState<SylInterface[]>([]);

    const fetchSyllabus = useCallback(async () => {
        try {
            const response = await axioslib.get(`/api/admin/getsyllabus/${classID}`);
            setSyllabus(response.data);
        } catch (error) {
            console.log(error);
        }
    }, [classID]);

    useEffect(() => {
        fetchSyllabus();
    }, [fetchSyllabus]);

    const file = syllabus[0]?.file_syl;
    const fileName = `Syllabus`;

    return (
        <div className="container mx-auto p-4">
            <PdfViewer file={file} fileName={fileName} />
        </div>
    );
};

export default TeacherSyllabus;
