import { Category } from "./Category";

export interface Product{
    id:number;
    title:string;
    price:number;
    description:string;
    categoryId:number;
    category:Category;
    images:string[];
    slug:string;
    createAt?:string;
    updateAt?:string;
}



export interface CartItem extends Product {
    product_count:number;
}

export interface Query{
    title?:string;
    price?:string;
    price_min?:number;
    price_max?:number;
    categoryId?:number;
    limit?:number;
    offset?:number;
}