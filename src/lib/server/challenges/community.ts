import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserIdOrGhost } from "../user";
import { getChallengeId } from "./main";




//get all topics for a particular challenge given the slug of the challenge
export const getTopics = async(challengeSlug:string, supabase: SupabaseClient) => {
    const challengeId = await getChallengeId(challengeSlug,supabase);
    const {data: topics, error} = await supabase.from("challenge_topics").select("*,user(name,username)").eq('challenge_id', challengeId).order('created_at', { ascending: false });
    if (error) {
        return {error: error.message, status: 500};
    }
    return {topics} //return an array
}

//get a particular topic by its ID
export const getTopic = async(id:string,supabase: SupabaseClient) => {
    const {data: topic, error} = await supabase.from("challenge_topics").select("*,user(name,username)").eq('id', id);
    if (error) {
        return {error status: 500};
    }
    return {topic: topic[0]} //return a single object
}
type topicData = {
    title: string;
    content: string;
}
//create a topic for a particular challenge given a slug of the challenge

export const createTopic = async(challengeSlug:string, supabase: SupabaseClient, topicData: topicData) => {
    const challenge_id = await getChallengeId(challengeSlug,supabase);

    const user_id = await getUserIdOrGhost(supabase);

    const {data: topic, error} = await supabase.from("challenge_topics").insert({
        challenge_id: challenge_id,
        title: topicData.title,
        content: topicData.content,
        user_id: user_id,
    })
    .select("*,user(name,username)").single();
    if (error) {
        return {error, status: 500};
    }

    return {topic}//return a single object
}