export let load = async ({locals: {supabase}}) => {
    const {data: courses, error} = await supabase.from("course").select("*,module(*,module_videos(*)),user(name,username)").order('created_at', { ascending: false });

    if (error) {
        console.log(error);
    }
    return {courses};
}