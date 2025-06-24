//shared functions across the /challenges folder
//the getChallengeId is used in submissions.ts and community.ts

import type { SupabaseClient } from "@supabase/supabase-js";


export const getChallengeId = async(challengeSlug:string, supabase: SupabaseClient) => {
        const {data: challenge, error} = await supabase.from("challenges").select("id").eq('slug', challengeSlug);
        if (error) {
            return {error, status: 500};
        }
        return challenge[0].id;
    }