import { json } from '@sveltejs/kit';

export const GET = async ({locals: {supabase}, url}) => {
    const username = url.searchParams.get('username');
    const {data: existingData} = await supabase.from("user").select("username").eq("username", username).limit(1);
    if(existingData.length > 0){
        return json({username: username, available: false})
    }
    return json({username: username, available: true})
}