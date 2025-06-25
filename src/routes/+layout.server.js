export const load = async ({locals: {supabase, user}}) => {
    //const {data: {user}} = await supabase.auth.getUser();
    if(user){
        let { data: userData } = await supabase.from('user').select().eq('id', user.id).single();
        //The user has recently created an account, we want to store some information about them in the user table in the db
        if (!userData) {
            userData = await supabase.from('user').insert({
                id: user.id,
                name: user.name,
                username: user.email.split('@')[0],
                email: user.email,
                avatar: user.avatar_url
            }).select();
        }

        delete userData.id;//get rid of the user id

        return {isLoggedIn: true, user: userData};
    }
    else{
        return {isLoggedIn: false};
    }
}