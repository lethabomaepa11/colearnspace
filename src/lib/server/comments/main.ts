import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserIdOrNull } from "../user";

/**
 * @description A feature can either be challenge_submission, or project
 * @type {feature}
 */
export type feature = {
    id:  string,
    name: string,
}
/**
 * @description Submit a comment to the DB
 * @param {string} comment - The text for the comment
 * @param {string} parentId - The id of the parent comment
 * @param {feature} feature - The feature that the comment belongs to
 * @param {SupabaseClient} supabase - The Supabase client
 * @returns {Promise<void>}
 */
export const submitComment = async(comment: string, parentId:string, feature: feature,supabase: SupabaseClient) => {
    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){
        return {error: "User not logged in"};
    }
    const {data,error} = await supabase.from("comment").insert({
        content: comment,
        parent_id: parentId,
        feature_type: feature.name,
        feature_id: feature.id,
        user_id: user_id,
        is_reply: parentId ? true : false,
    }).select();
    if (error) {
        return {error};
    }
    else{
        return {data};
    }
}

/**
 * @description Get all comments for a given feature
 * @param {feature} feature - The feature that the comments belong to
 * @param {SupabaseClient} supabase - The Supabase client
 * @returns {Promise<{comments: Comment[]}>}
 */

export const getCommentsForFeature = async(feature: feature,supabase: SupabaseClient) => {
    //fetch comments along with their replies
    const {data:comments, error} = await supabase.from("comment").select("*,user(name,username),comment(*,user(name,username))").eq('feature_type', feature.name).eq('feature_id', feature.id).eq('is_reply', false).order('created_at', { ascending: false });
    if (error) {
        return {error};
    }
    else{
        //fetch replies of a comment
        
        return {comments};
    }
}