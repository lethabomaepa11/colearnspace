import { getTopics } from '$lib/server/challenges/community.js'

export const load = async ({params, locals:{supabase}}) => {
    const data = await getTopics(params.challenge_slug, supabase);
    return {topics: data.topics};
}