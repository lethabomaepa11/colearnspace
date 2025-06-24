export const load = async ({locals: {supabase}}) => {
    const {data: {user}} = await supabase.auth.getUser();
    if(user){
        return {isLoggedIn: true, user};
    }
    else{
        return {isLoggedIn: false, user: null};
    }
}