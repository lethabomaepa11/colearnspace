import { createSubmission } from '$lib/server/challenges/submissions.js';
import { json } from '@sveltejs/kit';

export const POST = async ({locals: {supabase}, request, params}) => {
    const {submission} = await request.json();
    const data = await createSubmission(params.slug, supabase, submission);
    console.log(data);
    return json({success: true, data: data.submission})
}