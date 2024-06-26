import { supabase } from "../lib/supabase";

// post
export const uploadImagePost = async (file: any) => {
    const fileName = `/post/${Date.now()+file.originalname}`;

    const { error } = await supabase.storage
        .from("capstone")
        .upload(fileName, file.buffer, {
            cacheControl: "image/jpg",
            contentType: "image/jpg"
        });

    if (error) {
        throw error;
    }

    const { data } = await supabase.storage
        .from("capstone")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

// syllabus, pdf
export const uploadSyllabus = async (file: any) => {
    const fileName = `/syllabus/${Date.now()+file.originalname}`;

    const { error } = await supabase.storage
        .from("capstone")
        .upload(fileName, file.buffer, {
            cacheControl: "no-cache",
            contentType: "application/pdf"
        });

    if (error) {
        throw error;
    }

    const { data } = await supabase.storage
        .from("capstone")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

// any file type
export const uploadResourceFile = async (file: any) => {
    const fileName = `/resource/${Date.now()+file.originalname}`;
    //const fileName = `/files/${file.originalname}`;

    const contentType = file.mimetype || `application/octet-stream`;

    const { error } = await supabase.storage
        .from("capstone")
        .upload(fileName, file.buffer, {
            cacheControl: "no-cache",
            contentType: contentType
        });

    if (error) {
        throw error;
    }

    const { data } = await supabase.storage
        .from("capstone")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

export const uploadAssignmentFile = async (file: any) => {
    const fileName = `/assignment/${Date.now()+file.originalname}`;
    //const fileName = `/files/${file.originalname}`;

    const contentType = file.mimetype || `application/octet-stream`;

    const { error } = await supabase.storage
        .from("capstone")
        .upload(fileName, file.buffer, {
            cacheControl: "no-cache",
            contentType: contentType
        });

    if (error) {
        throw error;
    }

    const { data } = await supabase.storage
        .from("capstone")
        .getPublicUrl(fileName);

    return data.publicUrl;
};

export const uploadTurninFile = async (file: any) => {
    const fileName = `/assignment_turnin/${Date.now()+file.originalname}`;
    //const fileName = `/files/${file.originalname}`;

    const contentType = file.mimetype || `application/octet-stream`;

    const { error } = await supabase.storage
        .from("capstone")
        .upload(fileName, file.buffer, {
            cacheControl: "no-cache",
            contentType: contentType
        });

    if (error) {
        throw error;
    }

    const { data } = await supabase.storage
        .from("capstone")
        .getPublicUrl(fileName);

    return data.publicUrl;
};