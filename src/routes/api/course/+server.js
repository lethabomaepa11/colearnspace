import { json } from '@sveltejs/kit';

//Create a course
export const POST = async ({ request,locals:{supabase} }) => {
    const {course} = await request.json();
        const { data, error } = await supabase.from('course').insert({

        })
          if (error) {
            return json({success:false, error: error.message });
          }
          return json({success:true});
}
//get all courses
export const GET = async ({locals:{supabase}}) => {
    const {data, error} = await supabase.from('course').select('*')
    if(error){
        return json({success:false, error: error.message})
    }
    return json({success:true, data: data})
}
