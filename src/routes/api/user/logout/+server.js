import { json } from '@sveltejs/kit';

export const GET = async ({locals:{supabase}}) => {
    const {error} = await supabase.auth.signOut();
    if(error){
        return json({success:false, error: error.message})
    }
    return json({success:true})
}