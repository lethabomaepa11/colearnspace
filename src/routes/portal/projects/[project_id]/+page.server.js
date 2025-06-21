import { getProject } from '$lib/server/projects/main.js'

export const load = async({params, locals: {supabase}}) => {
    const project = await getProject(params.project_id, supabase);
    return project;
}