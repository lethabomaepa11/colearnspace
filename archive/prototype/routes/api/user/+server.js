import { json } from '@sveltejs/kit';

export const GET = async({locals: {supabase}}) => {
    const { data: { user } } = await supabase.auth.getUser()
    return json({user});
}