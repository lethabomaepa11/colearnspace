import { editUserData } from '$lib/server/user/main.js'

export const actions = {
    default: async({locals: {supabase}, request}) => {
        //edit user data
        const formData = await request.formData();
        const user = {
            name: formData.get('name'),
            username: formData.get('username'),
        }
        const data = await editUserData(supabase,user);
        if(!data.error)
            return {success: true}
        else 
            return {success: false};
    }
}