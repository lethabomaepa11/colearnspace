//when the user's id is needed, if user not logged in, then retuen null
export const getUserIdOrNull = async(supabase) => {
    const {user} = await supabase.auth.getUser();
    if(user) return user.id
    return null;
}

//return the user id or the ghost id if the user is not logged in.
export const getUserIdOrGhost = async(supabase) => {
    const {user} = await supabase.auth.getUser();
    if(user) return user.id
    const {data: ghostUser} = await supabase.from("user").select("id").eq("username", "ghost").limit(1);
    return ghostUser[0].id
}