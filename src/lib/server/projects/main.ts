import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserIdOrGhost, getUserIdOrNull } from "../user";




//get all projects
export const getProjects = async(supabase: SupabaseClient) => {
    const {data: projects, error} = await supabase.from("project").select("id,title, content, image, technologies, description,links, created_at").order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    }
    //returns an array
    return {projects}
}
//get all projects by by a user_id
export const getProjectsByUserId = async(user_id: string,supabase: SupabaseClient) => {
    const {data: projects, error} = await supabase.from("project").select("*").eq('user_id', user_id).order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    }
    //returns an array
    return {projects}
}

//get a project by its ID
export const getProject = async(id:string,supabase: SupabaseClient) => {
    const {data: project, error} = await supabase.from("project").select("id,title, content, image, technologies, description,links,user(name,username),created_at").eq('id', id);
    if (error) {
        console.log(error);
    }
    //returns a single object
    return {project: project[0]}
}

export const uploadImage = async (file: File,folder: string, supabase: SupabaseClient) => {
		try {
			const fileName = `images/${folder}/${Date.now()}-${file.name}`;
			const { error } = await supabase.storage.from('files').upload(fileName, file);

			if (error) throw error;

			const {
				data: { publicUrl }
			} = supabase.storage.from('files').getPublicUrl(fileName);

			return publicUrl;
		} catch (error) {
			console.error('Upload error:', error);
			return null;
		}
	};

export type projectData = {
    title: string;
    description: string;
    content: string;
    image: File;
    technologies: string[];
    links: string[];
}
//create a project

export const createproject = async(supabase: SupabaseClient, projectData: projectData) => {

    const user_id = await getUserIdOrNull(supabase);
    console.log(user_id)
    if(!user_id){//sometimes it is not null but might be invalid
        return {error: "User not logged in"};
    }
    //upload the image first then proceed with the rest
    const image_url = await uploadImage(projectData.image,"user_project_logo",supabase);
    if(!image_url){
        return {error: "Failed to upload image"};
    }
    const {data: project, error} = await supabase.from("project").insert({
        title: projectData.title,
        content: projectData.content,
        description: projectData.description,
        technologies: projectData.technologies,
        links: projectData.links,
        image: image_url,
        user_id: user_id,
    })
    .select("*,user(name,username)").single();
    if (error) {
        return {error};
    }

    //returns a single object
    return {project}
}