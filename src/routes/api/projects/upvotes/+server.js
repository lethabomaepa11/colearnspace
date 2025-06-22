import { getFeature } from '$lib';
import { getUpvotesForFeature, toggleUpVote } from '$lib/server/upvotes/main.js';
import { json } from '@sveltejs/kit';

export const POST = async ({locals: {supabase}, url}) => {
    const feature  = getFeature(url);
    if(feature.name === null || feature.id === null){
        return json({success: false, message: "Name and id are required"});
    }
    const data = await toggleUpVote(feature, supabase);
    if(data.success){
        return json({success: true});
    }
    return json({success: false});

}
export const GET = async ({locals: {supabase},url}) => {
    const feature  = getFeature(url);
    if(feature.name === null || feature.id === null){
        return json({success: false, message: "Name and id are required"});
    }
    const data = await getUpvotesForFeature(feature, supabase);
    if(data.data){
        return json({success: true, data: data.data});
    }
    return json({success: false,});

}