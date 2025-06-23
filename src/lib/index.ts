// place files you want to import through the `$lib` alias in this folder.

import type { SupabaseClient } from "@supabase/supabase-js";

export type QueryOptions = {
    limit: number,
    offset: number,
}
export const getFeature = (url: URL) => {
    return {
        name: url.searchParams.get('name'),
        id: url.searchParams.get('id')
    }
}
export const uploadImage = async (file: File,folder: string, supabase: SupabaseClient) => {
        try {
            const fileName = `images/${folder}/${Date.now()}-${file.name}`;
            const { error } = await supabase.storage.from('files').upload(fileName, file);

            if (error) throw error;

            const {
                data: { publicUrl }
            } = supabase.storage.from('files').getPublicUrl(fileName);

            return publicUrl;
        } catch (error) {
            console.error('Upload error:', error);
            return null;
        }
    };