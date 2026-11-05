import { getFeature } from '$lib';
import { getCommentsForFeature,  getCountCommentsForFeature,  submitComment } from '$lib/server/comments/main';
import { json } from '@sveltejs/kit';

export const POST = async ({locals: {supabase}, url, request}) => {
    const {comment, parentId } = await request.json();
    const feature  = getFeature(url);
    if(feature.name === null || feature.id === null){
        return json({success: false, message: "Name and id are required"});
    }
    const data = await submitComment(comment, parentId, feature, supabase);
    if(data.success){
        return json({success: true});
    }
    return json({success: false});

}
export const GET = async ({locals: {supabase},url}) => {
    //get all comments by feature
    const feature  = getFeature(url);
    const offset = Number(url.searchParams.get('offset')) || 0;
    const limit = Number(url.searchParams.get('limit')) || 15;
    const getCountOnly = url.searchParams.get("count") || false;
    if(feature.name === null || feature.id === null){
        return json({success: false, message: "Name and id are required"});
    }
    if(getCountOnly === "true") {
        const data = await getCountCommentsForFeature(feature, supabase);
        return json({success: true, count: data.count});
    }
    const data = await getCommentsForFeature(feature, supabase, {offset, limit});
    if(data.comments){
        return json({success: true, comments: data.comments});
    }
    return json({success: false});

}