import { supabase } from "../lib/supabase";

export const uploadImagePost = async (file: any) => {
    const fileName = `/post/${Date.now()}.jpg`;

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

export const uploadSyllabus = async (file: any) => {
    const fileName = `/syllabus/${Date.now()}.pdf`;

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
