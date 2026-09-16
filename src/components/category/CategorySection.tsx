import Image from "next/image";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { getCategory } from "@/lib/api/category";


export default async function CategorySection() {
  
    const CATEGORIES_PLACEHOLDER = await getCategory();

    console.log(CATEGORIES_PLACEHOLDER)
  
    return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h2 className="mb-5 font-heading text-xl font-bold text-ink sm:text-2xl">
        Shop by category
      </h2>

      <div className="flex gap-5 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible lg:grid-cols-8">
        {CATEGORIES_PLACEHOLDER.map((category) => (
          <CategoryCard category = {category}/>
        ))}
      </div>
    </section>
  );
}