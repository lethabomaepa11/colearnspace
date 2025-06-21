import { getProjects } from "$lib/server/projects/main"

export const load = async ({locals: {supabase}}) => {
    const projects = await getProjects(supabase);
    return projects;
}