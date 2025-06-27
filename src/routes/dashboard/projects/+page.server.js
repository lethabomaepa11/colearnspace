import { getUserIdOrNull } from '$lib/server/user.js';

export const load = async ({locals: {supabase}}) => {
    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){
        return {error: "User not logged in"};
    }
    const {data: projects, error} = await supabase.from("project").select("*").eq("user_id", user_id).order('created_at', { ascending: false });

    if(error) {
        return {error, status: 500}
    }
    delete projects.user_id;
    return {projects};
}