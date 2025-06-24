export const load = async ({locals: {supabase}, params}) => {
    const challenge_slug = params.challenge_slug;
    const {data: challenge, error} = await supabase.from("challenges").select("*,user(name,username)").order('created_at', { ascending: false }).eq('slug', challenge_slug);
    if (error) {
        return {error, status: 500};
    }
    return {challenge: challenge[0]};
}