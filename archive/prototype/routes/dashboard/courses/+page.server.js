import { getUserIdOrNull } from '$lib/server/user.js';

export const load = async ({locals: {supabase}}) => {
    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){
        return {error: "User not logged in"}
    }
    const {data: courses, error} = await supabase.from("course").select("*").eq("user_id", user_id).order('created_at', { ascending: false });

    if (error) {
        return {error, status: 500}
    }
    delete courses.user_id;
    return {courses}
}