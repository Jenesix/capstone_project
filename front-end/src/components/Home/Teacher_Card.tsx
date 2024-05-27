import React from "react";
import Image from "next/legacy/image";
import Link from "next/link";
import banner from "../../../public/Homebanner.svg";
import { Class } from "@/interface/interface";
import Teacher_EditButton from "../NewEdit/Teacher_EditButton";

interface Teacher_CardProps {
    role: 'teacher' | 'student';
    classData: Class;
}

const Teacher_Card: React.FC<Teacher_CardProps> = ({ role, classData }) => {

    const linkHref = role === 'teacher' ? `/Teacher/${classData._id}/Home` : `/${classData._id}/Home`;

    return (
        <Link href={linkHref}>
            <div className="relative rounded-xl overflow-hidden shadow-lg">
                <div className="rounded-xl overflow-hidden">
                    <Image
                        src={banner}
                        layout="responsive"
                        objectFit="cover"
                        objectPosition="center"
                        alt="banner"
                        className="rounded-xl"
                        width={500}
                        height={300}
                        priority
                    />
                </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white rounded-b-xl bg-gradient-to-t from-black via-transparent to-transparent">
                        <div className="flex flex-row">
                            <div className="overflow-hidden">
                                <p className="text-sm mb-1 text-salate-400 font-bold md:text-base lg:text-lg">Section {classData.section}</p>
                                <p className="text-lg font-bold md:text-xl lg:text-2xl">{classData.class_code}</p>
                                <p className="text-xl font-bold md:text-2xl lg:text-3xl truncate ">{classData.class_name}</p>
                                <p className="text-sm md:text-xs font-semibold text-salate-400 lg:text-sm">(Semester {classData.semester}/{classData.year})</p>
                            </div>
                            <div className="content-end ml-auto ">
                                <Teacher_EditButton
                                editLink="classID/Edit"/>
                            </div>
                        </div>
                    </div>
            </div>
        </Link>
        
    );
};

export default Teacher_Card;
