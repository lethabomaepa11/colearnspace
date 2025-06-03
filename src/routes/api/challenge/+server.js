import { json } from "@sveltejs/kit";

export const POST = async ({locals: {supabase}, request}) => {
    let {data: {user}} = await supabase.auth.getUser();
    const {challenge} = await request.json();

    if(!user){
        //create the challenge as ghost, limited time only
        const {data: ghostUser, error} = await supabase.from("user").select("id").eq("username", "ghost").limit(1);
        user = ghostUser[0];

        //if an error occured, we cannot proceed
        if(error){
            return json({status: 500, error: error.message});
        }
    }
    //now we have a user to make the challenge under...
    //the image is not null, then proceed
    //first, check if the slug is unique
    const {data: existingData} = await supabase.from("challenges").select("slug").eq("slug", challenge.slug).limit(1);
    if(existingData.length > 0){
        //try to make the slug unique by adding a number at the end
        challenge.slug = challenge.slug + Date.now().toString().substring(0, 4);
    }
    const {data: challengeData, error: challengeInsertError} = await supabase.from("challenges").insert({
        title: challenge.title,
        slug: challenge.slug,
        content: challenge.content,
        start_date: challenge.startDate,
        end_date: challenge.endDate,
        user_id: user.id,
        image: challenge.image
    }).select()

    if(!challengeInsertError){
            return json({status: 200, data: challengeData[0]});

    }
    

}

