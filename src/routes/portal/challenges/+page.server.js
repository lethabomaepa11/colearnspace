export const load = async ({locals: {supabase}}) => {
    const {data: challenges, error} = await supabase.from("challenges").select("*,user(name,username)").order('created_at', { ascending: false });
    if (error) {
        console.log(error);
    }
    return {challenges};
}