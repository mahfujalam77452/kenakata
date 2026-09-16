"use client";

import { createContext, useContext, useState } from "react";

import { Product } from "@/lib/types/Product";

type ProductContextType = {
  cardItems: Product[];
  setCardItems: React.Dispatch<React.SetStateAction<Product[]>>;
};

const ProductContext = createContext<ProductContextType | null>(null);

export function ProductProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cardItems, setCardItems] = useState<Product[]>([]);

  return (
    <ProductContext.Provider value={{ cardItems, setCardItems }}>
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