import { createTopic } from '$lib/server/challenges/community';
import { json } from '@sveltejs/kit';

export const POST = async({locals: {supabase}, request, params}) => {
    const {topic} = await request.json();
    const data = await createTopic(params.slug, supabase, topic);
    if(data){
        return json({success:true,data:data.topic,status:200})
    }
}