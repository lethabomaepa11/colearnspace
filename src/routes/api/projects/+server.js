import { createproject } from '$lib/server/projects/main.js';
import { json } from '@sveltejs/kit';

export const POST = async ({locals: {supabase}, request}) => {
    //create project
    const {project} = await request.json();
    const data = await createproject(supabase, project);
    return json({success: true, data: data.project})
}
export type UserProjects = {
    api_key: string;
    num_projects: number;
}
export const GET = async({locals: {supabase}, url}) => {
    //get a number of projects
}