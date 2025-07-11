export let load = async ({locals: {supabase}, params}) => {
    const slug = params.slug;

    if(slug != 'preview') {
        const {data: course, error} = await supabase.from("course").select("*,module(*,module_videos(*)),user(name,username)").order('created_at', { ascending: false }).eq('slug', slug);

        if (error) {
            return {error, status: 500};
        };
        return {course: course[0]};
    }
    
}