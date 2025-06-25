import { redirect } from '@sveltejs/kit';

export const GET = async({locals: {supabase}}) => {
        const {data, error} = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
            redirectTo: 'http://colearnspace.netlify.app/auth/callback'
          }
        });
        if(data.url) throw redirect(303,data.url);
}