//shared functions across the /challenges folder
//the getChallengeId is used in submissions.ts and community.ts


export const getChallengeId = async(challengeSlug:string, supabase: unknown) => {
        const {data: challenge, error} = await supabase.from("challenges").select("id").eq('slug', challengeSlug);
        if (error) {
            console.log(error);
        }
        return challenge[0].id;
    }