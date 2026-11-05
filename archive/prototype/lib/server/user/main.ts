import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserIdOrNull } from "../user"
import { use } from "marked";


export const getUserData = async (supabase: SupabaseClient) => {
    const user_id = await getUserIdOrNull(supabase);
    
    //if user id is null
    if(!user_id){
        return {error: "User not authenticated.", status: 401};
    }

    //proceed when user_id exists

    const {data: userData, error} = await supabase.from("user").select("*,project(count),challenges(count),course(count),challenge_topics(count),challenge_submission(count),api_keys(count)").eq("id", user_id).single();
    if (error) {
        return {error, status: 500}
    }
    //get rid of the user_id from the userData object before sending to client
    delete userData.id;
    return {userData};

}
export const editUserData = async (supabase: SupabaseClient, data: any) => {
    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){
        return {error: "User not authenticated.", status: 401}
    }
    const {data: userData, error} = await supabase.from("user").update({
        name: data.name,
        username: data.username,
    }).eq("id", user_id).single();
    if(error){
        return {error, status: 500}
    }
    return {userData}
}