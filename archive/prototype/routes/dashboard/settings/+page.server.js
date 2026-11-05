import { getUserIdOrNull } from '$lib/server/user.js';

export const load = async({locals: {supabase}}) => {
    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){
        return {error: "User not logged in"};
    }

    const {data: apiKeys, error} = await supabase.from("api_keys").select("*").eq("user_id", user_id).order('created_at', { ascending: false });
    if (error) {
        return {error, status: 500};
    }

    if(apiKeys.length === 0){
        //generate a new key.
        const {data: apiKey, error} = await supabase.from("api_keys").insert({user_id: user_id, name: "Default"}).select("*").single();
        if(error){
            return {error, status: 500};
        }
        return {apiKeys: [apiKey], initialKey: true};
    }
    return {apiKeys};
    
}