"use client";

import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import { Product } from "@/lib/types/Product";
import { Category } from "@/lib/types/Category";
import { getCategory } from "@/lib/api/category";
type ProductContextType = {
  categories: Category[];
  cardItems: Product[];
  setCardItems: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
     
    
 
// For add/remove/purches cart data globally
  
  const [cardItems, setCardItems] = useState<Product[]>([]);
//For storing all categories early
  const [categories,setCategories] = useState<Category[]>([])


  useEffect(
        ()=>{
            
            async function getCategories(){
               const categories = await getCategory()

               setCategories(categories)
            
            }
            getCategories()
        },[]
    )

  return (
    <ProductContext.Provider value={{ cardItems, setCardItems,categories }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("useProduct must be used inside ProductProvider");
  }

  return context;
}