import { json } from '@sveltejs/kit';

export const POST = async ({ request,locals:{supabase} }) => {
    const user = await request.json();
        const { data, error } = await supabase.auth.signInWithPassword({
            email: user.email,
            password: user.password,
          })
          if (error) {
            return json({success:false, error: error.code });
          }
          return json({success:true});
}