import { getCommentsForFeature } from '$lib/server/comments/main.js';
import { getProject } from '$lib/server/projects/main.js'

export const load = async({params, locals: {supabase}}) => {
    const project = await getProject(params.project_id, supabase);
    const feature = {
            id: project.project.id,
            name: 'project'
        };
    //fetch comments for this project from the client side, use lazy loading there
    
    return {project: project.project,feature};
}