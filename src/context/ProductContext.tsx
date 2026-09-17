"use client";

import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

import { CartItem } from "@/lib/types/Product";
import { Category } from "@/lib/types/Category";
import { getCategory } from "@/lib/api/category";
type ProductContextType = {
  categories: Category[];
  cartItems: CartItem[];
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
     
    
 
// For add/remove/purches cart data globally
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

    //For setting all cartItems in 

  return (
    <ProductContext.Provider value={{ cartItems, setCartItems,categories }}>
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