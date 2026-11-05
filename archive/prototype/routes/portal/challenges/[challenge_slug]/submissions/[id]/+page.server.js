import { getSubmission } from '$lib/server/challenges/submissions.js'
import { getCommentsForFeature } from '$lib/server/comments/main';

export const load = async({params, locals:{supabase}}) => {
    const data = await getSubmission(params.id,supabase);
    const feature = {
                id: data.submission.id,
                name: 'challenge_submission'
            };
        //fetch comments for this project
    const comments = await getCommentsForFeature(feature, supabase);

    return {submission: data.submission, comments: comments.comments, feature};
}