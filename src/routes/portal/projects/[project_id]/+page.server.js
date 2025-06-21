import { getCommentsForFeature } from '$lib/server/comments/main.js';
import { getProject } from '$lib/server/projects/main.js'

export const load = async({params, locals: {supabase}}) => {
    const project = await getProject(params.project_id, supabase);
    const feature = {
            id: project.project.id,
            name: 'project'
        };
    //fetch comments for this project
    const comments = await getCommentsForFeature(feature, supabase);
    console.log(comments)
    
    return {project: project.project,feature, comments: comments.comments};
}