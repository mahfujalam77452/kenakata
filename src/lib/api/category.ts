import { Category } from "../types/Category";

//Get Products + query[optional]

const base = process.env.NEXT_PUBLIC_BASE_API

export async function getCategory(): Promise<Category[]> {


    

    const url = `${base}/categories`

    try{

        const res = await fetch(url)

        if(!res.ok) {

                 const errorData = await res.json();
                 
                 throw new Error(errorData.message || "Something went wrong !")
        }


        return await res.json();

    }catch(error){
        throw error;
    }

}


