import { json } from '@sveltejs/kit';

export const POST = async ({ request,locals:{supabase} }) => {
    const {course} = await request.json();
        const { data, error } = await supabase.from('courses').insert({

        })
          if (error) {
            return json({success:false, error: error.message });
          }
          return json({success:true});
}