import { getTopic } from '$lib/server/challenges/community.js'

export const load = async ({params, locals:{supabase}}) => {
    const data = await getTopic(params.topic_id, supabase);
    return {topic: data.topic};
}