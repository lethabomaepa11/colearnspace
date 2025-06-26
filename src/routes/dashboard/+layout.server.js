import { getUserData } from '$lib/server/user/main.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({locals: {supabase}}) => {
    const {data: {user}} = await supabase.auth.getUser();
    //redirect user if not logged in
    if(!user){
        redirect(307,"/portal")
    }

    const {userData} = await getUserData(supabase);
    return {userData};
}