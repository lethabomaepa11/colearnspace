import type { SupabaseClient } from "@supabase/supabase-js";
import { getUserIdOrNull } from "../user";
import {  getCountCommentsForFeature } from "../comments/main";
import { getUpvotesForFeature } from "../upvotes/main";
import type { QueryOptions } from "$lib";
import { recalculateRanks } from "./reCalculateRanks";



//get all projects
export const getProjects = async(supabase: SupabaseClient, options:QueryOptions = {limit: 5, offset: 0}) => {
    options.limit = options.limit ? options.limit : 5;
    const {data: projects, error} = await supabase.from("project")
    .select("id,title, image, technologies, description,links, created_at, rank, score")
    .order('created_at', { ascending: false })
    .range(options.offset, options.offset + options.limit -1 );
    if (error) {
        return {error, status: 500};
    }
    //get comment count and upvote count for each project and return an array of projects with comment count
    let comments, upvotes, upvoteUserIds;
    for(let i = 0; i < projects.length; i++){
        comments = await getCountCommentsForFeature({ id: projects[i].id, name: "project" }, supabase);
        upvotes = await getUpvotesForFeature({ id: projects[i].id, name: "project" }, supabase);

        upvoteUserIds = new Set(upvotes.data?.map((upvote) => upvote.user.id));
        const user_id = await getUserIdOrNull(supabase);
        if(user_id){
            projects[i].userHasVoted = upvoteUserIds.has(user_id);
        }
        else{
            projects[i].userHasVoted = false
        }
        projects[i].upvote_count = upvotes.data?.length;
        projects[i].comment_count = comments.count;

    }
    
    return {projects}
}
//get all projects by by a user_id
export const getProjectsByUserId = async(user_id: string,supabase: SupabaseClient, options:QueryOptions) => {
    let query = supabase.from("project").select("id,title,image,links,technologies,description,created_at, rank, score").eq('user_id', user_id).order('created_at', { ascending: false });
    query = options.limit ? query.range(options.offset, options.offset + options.limit -1 ) : query;
    const {data: projects, error} = await query;
    
    if (error) {
        return {error, status: 500};
    }
    //returns an array
    return {projects}
}

//get a project by its ID
export const getProject = async(id:string,supabase: SupabaseClient) => {
    const {data: project, error} = await supabase.from("project").select("id,title, content, image, technologies, description,links,user(name,username),created_at, rank,score").eq('id', id);
    if (error) {
        return {error: error.message, status: 500};
    }
    const comments = await getCountCommentsForFeature({ id: project[0].id, name: "project" }, supabase);
    const upvotes = await getUpvotesForFeature({ id: project[0].id, name: "project" }, supabase);
    
    let upvoteUserIds = new Set(upvotes.data?.map((upvote) => upvote.user.id));

    project[0].userHasVoted = upvoteUserIds.has(await getUserIdOrNull(supabase));
    project[0].upvote_count = upvotes.data?.length
    project[0].comment_count = comments.count;
    //returns a single object
    return {project: project[0], status: 200}
}



export type projectData = {
    title: string;
    description: string;
    content: string;
    image: string;
    technologies: string[];
    links: string[];
}
//create a project

export const createproject = async(supabase: SupabaseClient, projectData: projectData) => {

    const user_id = await getUserIdOrNull(supabase);
    if(!user_id){//sometimes it is not null but might be invalid
        return {error: "User not logged in"};
    }

    const {data: project, error} = await supabase.from("project").insert({
        title: projectData.title,
        content: projectData.content,
        description: projectData.description,
        technologies: projectData.technologies,
        links: projectData.links,
        image: projectData.image,
        user_id: user_id,
    })
    .select("*,user(name,username)").single();
    if (error) {
        return {error, success: false};
    }

    //recalculate the project ranks
    await recalculateRanks(supabase);
    //returns a single object
    return {project, success: true}
}