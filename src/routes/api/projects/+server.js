import { createproject, getProjects } from '$lib/server/projects/main.js';
import { json } from '@sveltejs/kit';

export const POST = async ({locals: {supabase}, request}) => {
    //create project
    const {project} = await request.json();
    const data = await createproject(supabase, project);
    return json({success: true, data: data.project})
}

export const GET = async({locals: {supabase}, url}) => {
    //get a number of projects
    const limit = Number(url.searchParams.get('limit')) || 10;
    const offset = Number(url.searchParams.get('offset')) || 0;
    const data = await getProjects(supabase, {limit, offset});
    return json({success: true, data: data.projects})
}