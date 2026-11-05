import type { SupabaseClient } from "@supabase/supabase-js";

export const createUserProgress = async (courseId: string, supabase: SupabaseClient) => {
    const { data, error } = await supabase.from("user_progress").insert({ course_id: courseId });
    if (error) {
        return {error, status: 500};
    }
}
