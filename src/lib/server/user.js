//when the user's id is needed, if user not logged in, then retuen null
export const getUserIdOrNull = async(supabase) => {
    const {data: {user}} = await supabase.auth.getUser();
    if(user) return user.id
    return null;
}

//return the logged in user id or the ghost user id if the user is not logged in.
export const getUserIdOrGhost = async(supabase) => {
    const id = await getUserIdOrNull(supabase);
    if(id) return id;
    //if the user id is null meaning the user is not logged in, then return the id of the ghost account.
    const {data: ghostUser} = await supabase.from("user").select("id").eq("username", "ghost").limit(1);
    return ghostUser[0].id
}