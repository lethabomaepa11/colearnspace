import type { SupabaseClient } from "@supabase/supabase-js"
import type { feature } from "../comments/main"
import { getUserIdOrNull } from "../user"



export type Upvote = {
    id: string,
    feature: feature
    user_id: string,
}

export const toggleUpVote = async (feature: feature, supabase: SupabaseClient) => {
    
    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){
        return {error: "User not logged in"}
    }

    const {data: upvotes, error: er} = await supabase.from("upvote").select("*").eq("feature_id", feature.id).eq("feature_type", feature.name).eq("user_id", user_id).limit(1);
    if(upvotes.length > 0){
        //delete the upvote
        const {error} = await supabase.from("upvote").delete().eq("feature_id", feature.id).eq("feature_type", feature.name).eq("user_id", user_id);
        if(error){
            return {error};
        }
        return {success: true};
    }
    //else insert it
    const {data, error} = await supabase.from("upvote").insert({
        feature_id: feature.id, 
        feature_type: feature.name,
        user_id: user_id,
    });

    if(error){
        return {error};
    }
    return {success: true};
}

export const getUpvotesForFeature = async (feature: feature, supabase: SupabaseClient) => {
    const {data: upvotes, error} = await supabase.from("upvote").select("id,user(id)").eq("feature_id", feature.id).eq("feature_type", feature.name);
    if(error){
        return {error};
    }
    return {data: upvotes};
}