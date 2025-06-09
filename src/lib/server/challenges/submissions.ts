import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserIdOrGhost } from "../user";
import { getChallengeId } from "./main";




//get all submissions for a particular challenge given the slug of the challenge
export const getSubmissions = async(challengeSlug:string, supabase: unknown) => {
    const challengeId = await getChallengeId(challengeSlug,supabase);
    const {data: submissions, error} = await supabase.from("challenge_submission").select("*,user(name,username)").eq('challenge_id', challengeId).order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    }
    return {submissions}
}

//get a particular submission by its ID
export const getSubmission = async(id,supabase: SupabaseClient) => {
    const {data: submission, error} = await supabase.from("challenge_submission").select("*,user(name,username)").eq('id', id);
    if (error) {
        console.log(error);
    }
    return {submission}
}

//create a submission for a particular challenge given a slug of the challenge

export const createSubmission = async(challengeSlug:string, supabase: SupabaseClient, submissionData) => {
    const challenge_id = await getChallengeId(challengeSlug,supabase);

    const user_id = await getUserIdOrGhost(supabase);

    const {data: submission, error} = await supabase.from("challenge_submission").insert({
        challenge_id: challenge_id,
        title: submissionData.title,
        content: submissionData.content,
        user_id: user_id,
    })
    .select("*,user(name,username)").single();
    if (error) {
        console.log(error);
    }

    return {submission}
}