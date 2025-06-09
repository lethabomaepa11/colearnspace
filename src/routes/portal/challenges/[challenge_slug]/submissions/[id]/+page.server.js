import { getSubmission } from '$lib/server/challenges/submissions.js'

export const load = async({params, locals:{supabase}}) => {
    const data = await getSubmission(params.id, supabase);
    return {submission: data.submission};
}