"use client"
import Link from "next/link";

import { useProduct } from "@/context/ProductContext";
import { useEffect, useState } from "react";
import { type ProductCardData } from "@/components/products/ProductCard";
import { Query } from "@/lib/types/Product";
import  {getProduct} from "@/lib/api/product"
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";




const SORT_OPTIONS = [
  { value: 0, label: "Featured" },
  { value: 1, label: "Price: Low to High" },
  { value: 2, label: "Price: High to Low" },
];


const ACTIVE_CATEGORY_SLUG_PLACEHOLDER: string | null = null;

type ProductProps = {
  pageNumber:number
  searchcategory?:number|0
  setPageNumber:React.Dispatch<React.SetStateAction<number>>
  products: ProductCardData[];
  setProducts: React.Dispatch<React.SetStateAction<ProductCardData[]>>;
};
export default function ProductFilters({pageNumber,searchcategory,setPageNumber,products,setProducts}:ProductProps) {
    
    const [activeId,setActiveId] = useState<number>(searchcategory?searchcategory:0);
    const [minValue,setMinValue] = useState<number>(0);
    const [maxValue,setMAXvalue] = useState<number>(minValue);
    //0-for no sorting , 1-for sort by assending order , 2 - for sort by decending order
    const [sortValue,setSortValue] = useState<number>(0);
    const [duplicateProducts,setDuplicateProducts] = useState<ProductCardData[]>(products)
    const {categories} = useProduct();


     if( !(searchcategory) && searchcategory !== 0 ){
              setActiveId(searchcategory);
              searchcategory=0;
            }

    function makeSort(sortValue:number) {

        console.log("hey I am here :",sortValue)
        if(sortValue === 0) {
            setProducts(duplicateProducts)
        }
        else if(sortValue === 1) {
            setProducts([...duplicateProducts].sort((a,b)=> a.price - b.price))
        }
        else if(sortValue === 2) {
            setProducts([...duplicateProducts].sort((a,b)=> b.price - a.price))
        }
    }

  

    useEffect(
        () => {
            
            async function getProducts() {
                
                const query:Query = {}
                if(minValue > 0)query.price_min = minValue;
                if(maxValue >0)query.price_max=maxValue;
                if(activeId > 0)query.categoryId =activeId;
                query.offset = pageNumber-1;
                query.limit = 12;
                const allProducts = await getProduct(query)
                setDuplicateProducts(allProducts);
                setProducts(allProducts)
                console.log("duplicate Products ..",duplicateProducts)
            }

            getProducts();
        },[activeId,minValue,maxValue,pageNumber]
    )

  return (
    <div className="space-y-6">
      {/* Category list */}
      <div>
        <h3 className="mb-3 font-heading text-sm font-semibold text-ink">Category</h3>
        <ul className="space-y-1 text-sm">
          <li>
            
            <Link
              href="#"
              className={`block rounded-md px-2 py-1.5 transition-colors ${
                activeId === 0
                  ? "bg-brand-teal/10 font-semibold text-brand-teal"
                  : "text-ink/70 hover:bg-mist"
              }`}
              onClick={()=>{setActiveId(0);setPageNumber(1)}}
            >
              All
            </Link>
          </li>
          {categories.map((category) => {
            const isActive = activeId === category.id;
            return (
              <li key={category.id}>
                {/* TODO: real href/onClick for selecting this category */}
                <Link
                  href="#"
                  onClick={()=>{setActiveId(category.id); setPageNumber(1)}}
                  className={`block rounded-md px-2 py-1.5 transition-colors ${
                    isActive
                      ? "bg-brand-teal/10 font-semibold text-brand-teal"
                      : "text-ink/70 hover:bg-mist"
                  }`}
                >
                  {category.name.length < 20 ? category.name:"Kid's Toy"}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      
      <div className="space-y-4 border-t border-mist pt-5">
        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold text-ink">Price (Min-Max)</h3>
          <div className="flex items-center gap-2">
            
            <input
              type="number"
             
              placeholder="Min"
              onChange={(e)=>{
                if(Number(e.target.value )>=0){
                      setMinValue(Number(e.target.value))
                      setPageNumber(1)
                }
              }}
              className="w-full rounded-md border border-mist px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent-marigold"
            />
            <span className="text-ink/40">–</span>
            <input
              type="number"
              
              onChange={(e) => {
                if(Number(e.target.value)>=minValue){
                    setMAXvalue(Number(e.target.value))
                    setPageNumber(1)
                }
              }}
              placeholder='Max'
              className="w-full rounded-md border border-mist px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent-marigold"
            />
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-heading text-sm font-semibold text-ink">Sort by</h3>
          
          <select
            defaultValue=""
            onChange={(e)=>makeSort(Number(e.target.value))}
            className="w-full rounded-md border border-mist px-2 py-1.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-accent-marigold"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value} onChange={(e)=>makeSort(Number(e.target.value))}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

       
      </div>
    </div>
  );
}