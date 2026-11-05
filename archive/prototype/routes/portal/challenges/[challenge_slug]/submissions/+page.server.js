import { getSubmissions } from "$lib/server/challenges/submissions"

export const load = async ({params, locals:{supabase}}) => {
    const challenge_slug = params.challenge_slug;
    const submissions = await getSubmissions(challenge_slug, supabase);
    return {submissions};
}
