import { Product,Query } from "../types/Product";

//Get Products + query[optional]

const base = process.env.NEXT_PUBLIC_BASE_API

console.log("dekhoto aci kina ",base)

export async function getProduct(query:Query): Promise<Product[]> {


    const param = new URLSearchParams();

    Object.entries(query).forEach(
        ([key,value]) => {
           if(value !== undefined) param.append(key,String(value))
        }
    )

    const url = `${base}/products/?${param.toString()}`

    console.log("hello I am calling : ",url)

    try{

        const res = await fetch(url)

        if(!res.ok) {

                const errorData = await res.json();
                 
                 throw new Error(errorData.message || "Something went wrong !")
        }


        const result =  await res.json();

        return result;

    }catch(error){
        throw error;
    }

}

export async function getProductByCategory(id:number) : Promise<Product[]> {
       

    const url = `${base}/categories/{id}/products}`

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


