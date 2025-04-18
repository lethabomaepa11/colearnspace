import { json } from '@sveltejs/kit';

export const POST = async ({ request,locals:{supabase} }) => {
    const user = await request.json();
        const { data, error } = await supabase.auth.signUp({
            email: user.email,
            password: user.password,
            options: {
                data: {
                  first_name: user.name,
                },
              },
          })
          if (error) {
            return json({success:false, error: error.message });
          }
          return json({success:true});
}