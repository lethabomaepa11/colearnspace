import { getProjects } from "$lib/server/projects/main"

export const load = async ({locals: {supabase}}) => {
    const projects = await getProjects(supabase);
    console.log(projects)
    return projects;
}